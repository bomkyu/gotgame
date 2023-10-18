import React, {useEffect, useState} from 'react'
import Card from '../components/ui/Card'
import Inner from '../components/layout/Inner'
import Tab from '../components/ui/Tab'
import InputSearch from '../components/ui/InputSearch'
import { Horizontal_4 } from '../components/layout/Horizontal'
import { useModal } from '../contexts/ModalContext'
import { LoginInfoRequest } from '../api/oauth'
import { setUserInfo } from '../session'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {listData} from '../interface'
import { escapeRegExp } from '../utils'
import Paging from '../components/layout/Paging'
import { useSelector, useDispatch } from 'react-redux'
import { setTab, setCurrentPage, setSearchInputValue } from '../redux/store/mainSlice'; // Redux 액션 추가
import { RootState } from '../redux/rootReducer'; // Redux 액션 추가

const Main = () => {
  //redux 상태 및 dispatch
  const dispatch = useDispatch();
  const selectedTab = useSelector((state: RootState) => state.main.selectedTab); //선택한 탭(기본값 : ALL)
  const currentPage = useSelector((state: RootState) => state.main.currentPage); // 현재 페이지
  const searchInputValue = useSelector((state: RootState) => state.main.searchInputValue); //검색 value


  //데이터 저장
  const { openModal, setModalData } = useModal();
  const [getData, setGetData] = useState<listData[]>([]); //데이터를 전부 저장
  const [filterData, setFilterData] = useState<listData[]>([]); //필터 데이터 저장
  const [searchData, setSearachData] = useState<listData[]>([]); //검색된 DATA가 들어가는 STATE

  //페이징
  const [totalPages, setTotalPages] = useState(0);
  const [displayedPages, setdisplayedPages] = useState<number[]>([]); //사용자에게 보여줘야하는 페이지들

  const itemsPerPage = 12; // 한 페이지에 보여질 아이템 수
  const pagesPerDisplay = 5; // 페이지당 표시할 페이지 수
  
  const navigate = useNavigate();

  //url에 토큰정보 있는지 확인
  const tokenRequest = async () => {
    LoginInfoRequest(LoginInfoRequestCallBack);
  }

  //콜백이 되는 함수
  const LoginInfoRequestCallBack = (data : object) => {
    //회원정보 검색
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`,data)
    .then((respone)=>{
      switch (respone.data.status) {
        case 'register':
            openModal('register');
            setModalData(data)
          break;
        case 'login' :
          setUserInfo(respone.data.userInfo);
          navigate('/');
          break;
      
        default:
          break;
      }
    })
  }
  //--------------- //로그인 ---------------

  useEffect(() => {
    tokenRequest();
    fetchAll();
    console.log('asdasdasd');
  },[])

  const fetchAll = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`);
      setGetData(response.data);
    } catch (error) {
      console.log('데이터를 가져오는 중 오류 발생:', error);
    }
  }

  useEffect(()=>{
    if(selectedTab !== 'ALL'){
      tabClickHandler(selectedTab);
    }
  },[selectedTab, getData])

  //탭 했을때 필터링 될 데이터들
  const tabClickHandler = (option : string) => {
    dispatch(setTab(option)); // Redux 액션을 통해 탭 업데이트
    dispatch(setCurrentPage(1));
    
    if (option === 'ALL') {
      setFilterData([]);
      
    } else {
      const dataFilter = getData.filter((param) => param.genre === option);
      // 만약 검색어가 있으면 검색어 필터를 먼저 적용하고 탭 필터를 적용
      if (searchInputValue !== '') {
        
        const escapedValue = escapeRegExp(searchInputValue);
        const regex = new RegExp(escapedValue, 'i');
        const readyInputValueFilter = dataFilter.filter((param) => regex.test(param.title) || regex.test(param.content));
        setSearachData(readyInputValueFilter); //검색데이터
        setFilterData(dataFilter); //필터데이터
      } else {
        setFilterData(dataFilter);
      }
    }
  }

  //검색 했을때 필터링 될 데이터
  const searchOnChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const { value } = e.target;
    const escapedValue = escapeRegExp(value);
    const regex = new RegExp(escapedValue, 'i');
    dispatch(setCurrentPage(1));
    dispatch(setSearchInputValue(value)); //value값 저장

    if (value === '') {
      setSearachData([]);
    } else {

      //탭에 따라 필터링 된 데이터를 검색할 조건문
      if(selectedTab === 'ALL'){
        const searchData = getData.filter((param) => regex.test(param.title) || regex.test(param.content));
        setSearachData(searchData)
      }else{
        const searchData = filterData.filter((param) => regex.test(param.title) || regex.test(param.content));
        console.log(searchData);
        setSearachData(searchData);
      }
    }
  }

  const renderCards = (dataList : Array<listData>) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = dataList.slice(startIndex, endIndex);
  
    return currentData.map((data) => (
      <Card key={data.num} onClick={() => navigate(`/view/${data.num}`)} data={data} />
    ));
  };

  //페이징
  useEffect(()=> {
    const totalData = searchInputValue !== ''
    ? searchData
    : selectedTab !== 'ALL'
    ? filterData
    : getData;
    const totalItems = totalData.length; // 전체 아이템 수
    setTotalPages(Math.ceil(totalItems / itemsPerPage))
  })
  
  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    // 계산할 페이지 범위의 시작과 끝을 계산
    const blockSize = pagesPerDisplay;
    //const blockCount = Math.ceil(totalPages / blockSize);
    const blockIndex = Math.ceil(currentPage / blockSize);
    const startPage = (blockIndex - 1) * blockSize + 1;
    let endPage = startPage + blockSize - 1;
  
    // 마지막 페이지 블록에서 블록이 꽉 차지 않으면 조정
    if (endPage > totalPages) {
      endPage = totalPages;
    }
  
    // 페이지 범위를 계산
    const displayedPages = pageNumbers.slice(startPage - 1, endPage);
    setdisplayedPages(displayedPages);
  }, [currentPage, totalPages, pagesPerDisplay]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  //유저가 선택한 페이지
  const userSelectedCurrentPage = (pageNumber:number) => {
    dispatch(setCurrentPage(pageNumber))
  }
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <>
      <div className='visual-wrap'>
        <div className='inner'>
          <p className='visual-txt'>
            같이 게임할 사람을 찾으신다구요?<br/>그럼 <b>'같겜'</b>과 함께해요!
          </p>
        </div>
      </div>
      <Inner>
        <Tab onClick={tabClickHandler} selected={selectedTab}/>
        <InputSearch onChange={searchOnChange} value={searchInputValue}/>
        <Horizontal_4>
        {
          searchInputValue !== '' ? (
            searchData.length > 0 ? (
              renderCards(searchData)
            ) : (
              <p>데이터가 없소용</p>
            )
            ) : selectedTab !== 'ALL' ? (
              renderCards(filterData)
            ) : (
              renderCards(getData)
            )
          }
        </Horizontal_4>
      </Inner>
      {<Paging
        totalPages={totalPages} //전체 페이지
        currentPage={currentPage} //현재 페이지
        goToPreviousPage={goToPreviousPage} //이전페이지 가는 함수
        goToNextPage={goToNextPage}//다음페이지 가는 함수
        displayedPages={displayedPages}//사용자에게 표시해야하는 페이지 번호
        setCurrentPage={userSelectedCurrentPage}
        />}
    </>
  )
}

export default Main