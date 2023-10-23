import React, { useEffect, useState } from 'react';

// 커스텀 컴포넌트
import Card from '../components/ui/Card';
import Inner from '../components/layout/Inner';
import Tab from '../components/ui/Tab';
import InputSearch from '../components/ui/InputSearch';
import { Horizontal_4 } from '../components/layout/Horizontal';
import Paging from '../components/layout/Paging';

// 컨텍스트 및 상태 관리
import { useModal } from '../contexts/ModalContext';
import { useSelector, useDispatch } from 'react-redux';

// API 및 데이터 처리
import { LoginInfoRequest } from '../api/oauth';
import axios from 'axios';
import { setsessionUserInfo } from '../session';
import { useNavigate } from 'react-router-dom';

// 데이터 인터페이스 및 유틸리티
import { listData } from '../interface';
import { escapeRegExp } from '../utils';

// Redux 액션 및 상태
import { setTab, setCurrentPage, setSearchInputValue, } from '../redux/store/mainSlice';
import { setUserInfo } from '../redux/store/userSlice';
import { RootState } from '../redux/rootReducer';

const Main = () => {
  // Redux 상태 및 dispatch
  const dispatch = useDispatch();
  const selectedTab = useSelector((state: RootState) => state.main.selectedTab); // 선택한 탭 (기본값: ALL)
  const currentPage = useSelector((state: RootState) => state.main.currentPage); // 현재 페이지
  const searchInputValue = useSelector((state: RootState) => state.main.searchInputValue); // 검색 value

  // 데이터 저장
  const { openModal, setModalData } = useModal();
  const [getData, setGetData] = useState<listData[]>([]); // 데이터를 전부 저장
  const [searchData, setSearchData] = useState<listData[]>([]); // 검색된 DATA가 들어가는 STATE

  // 페이징
  const [totalPages, setTotalPages] = useState(0);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]); // 사용자에게 보여줘야하는 페이지들

  const itemsPerPage = 12; // 한 페이지에 보여질 아이템 수
  const pagesPerDisplay = 5; // 페이지당 표시할 페이지 수

  const navigate = useNavigate();

  // URL에 토큰 정보 있는지 확인
  const tokenRequest = async () => {
    LoginInfoRequest(LoginInfoRequestCallBack);
  };

  // 콜백이 되는 함수
  const LoginInfoRequestCallBack = (data: object) => {
    // 회원정보 검색
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, data)
      .then((response) => {
        switch (response.data.status) {
          case 'register':
            openModal('register');
            setModalData(data);
            break;
          case 'login':
            dispatch(setUserInfo(response.data.userInfo)) //redux에 로그인정보 저장
            setsessionUserInfo(response.data.userInfo); //session에 로그인정보 저장
            navigate('/');
            break;
          default:
            break;
        }
      });
  };

  // 데이터 로드 함수
  const fetchAll = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/main`);
      setGetData(response.data);
    } catch (error) {
      console.log('데이터를 가져오는 중 오류 발생:', error);
    }
  };

  // 데이터 필터링 함수
const filterData = (data: listData[], searchInputValue: string, selectedTab: string) => {
  if (selectedTab !== 'ALL') {
    data = data.filter((param) => param.genre === selectedTab);
  }

  if (searchInputValue !== '') {
    const escapedValue = escapeRegExp(searchInputValue);
    const regex = new RegExp(escapedValue, 'i');
    data = data.filter((param) => regex.test(param.title) || regex.test(param.content));
  }

  return data;
};

  useEffect(() => {
    tokenRequest();
    fetchAll();
  }, []);

  useEffect(() => {
    const filteredData = filterData(getData, searchInputValue, selectedTab);
    setSearchData(filteredData);
  }, [getData, searchInputValue, selectedTab]);

  useEffect(() => {
    const totalData = searchInputValue !== ''
      ? searchData
      : selectedTab !== 'ALL'
      ? filterData(getData, '', selectedTab)
      : getData;
    const totalItems = totalData.length; // 전체 아이템 수
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [searchInputValue, selectedTab, getData, searchData]);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const blockSize = pagesPerDisplay;
    const blockIndex = Math.ceil(currentPage / blockSize);
    const startPage = (blockIndex - 1) * blockSize + 1;
    let endPage = startPage + blockSize - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
    }

    const displayedPages = pageNumbers.slice(startPage - 1, endPage);
    setDisplayedPages(displayedPages);
  }, [currentPage, totalPages, pagesPerDisplay]);

  //----------------------------- 탭 및 검색 -----------------------------

  const tabClickHandler = (option : string) => {
    dispatch(setCurrentPage(1));
    dispatch(setTab(option));
  }

  const searchOnChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    dispatch(setSearchInputValue(value)); //value값 저장
  }

  //----------------------------- 페이징 이벤트 처리 -----------------------------
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const userSelectedCurrentPage = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  //----------------------------- renderCards -----------------------------

  const renderCards = (dataList: Array<listData>) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = dataList.slice(startIndex, endIndex);

    return currentData.map((data) => (
      <Card key={data.num} onClick={() => navigate(`/view/${data.num}`)} data={data} />
    ));
  };

   //----------------------------- //renderCards -----------------------------
  

  return (
    <>
      <div className="visual-wrap">
        <div className="inner">
          <p className="visual-txt">
            같이 게임할 사람을 찾으신다구요?<br />그럼 <b>'같겜'</b>과 함께해요!
          </p>
        </div>
      </div>
      <Inner>
        <Tab onClick={tabClickHandler} selected={selectedTab} />
        <InputSearch onChange={searchOnChange} value={searchInputValue} />
        <Horizontal_4>
          {searchInputValue !== '' ? (
            searchData.length > 0 ? (
              renderCards(searchData)
            ) : (
              <p>데이터가 없소용</p>
            )
          ) : selectedTab !== 'ALL' ? (
            renderCards(filterData(getData, '', selectedTab))
          ) : (
            renderCards(getData)
          )}
        </Horizontal_4>
      </Inner>
      <Paging
        totalPages={totalPages} //전체 페이지
        currentPage={currentPage} //현재 페이지
        goToPreviousPage={goToPreviousPage} //이전페이지 가는 함수
        goToNextPage={goToNextPage} //다음페이지 가는 함수
        displayedPages={displayedPages} //사용자에게 표시해야하는 페이지 번호
        setCurrentPage={userSelectedCurrentPage} //블럭클릭 함수
      />
    </>
  );
};

export default Main;