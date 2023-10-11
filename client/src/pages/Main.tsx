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
import { parsePath, useNavigate } from 'react-router-dom'
import {listData} from '../interface'

const Main = () => {
  const { openModal, setModalData } = useModal();
  const [getData, setGetData] = useState<listData[]>([]); //데이터를 전부 저장
  const [filterData, setFilterData] = useState<listData[]>([]); //필터 데이터 저장
  const [selectedTab, setSelectedTab] = useState('ALL'); //선택한 탭(기본값 : ALL)
  const [searchInputValue, setSearchInputValue] = useState(''); //검색 value
  const [searchData, setSearachData] = useState<listData[]>([]);
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

  useEffect( () => {
    tokenRequest();
    fetchAll();
  }, [])

  const fetchAll = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/main`)
    .then((respones)=>{
      setGetData(respones.data)
    })
  }
  //탭 했을때 필터링 될 데이터들
  const tabClickHandler = (option : string) => {
    setSelectedTab(option);
    const dataFilter = getData.filter(param => param.genre === option);
    setFilterData(dataFilter);
  }

  //검색 했을때 필터링 될 데이터
  const searchOnChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    const {value} = e.target
    setSearchInputValue(value); //value값 저장

    const searchFilter = filterData.filter(param=> param.title === value || param.content === value);
    console.log(searchFilter)
    setSearachData(searchFilter);
  }

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
          searchData.length > 0 ? (
            searchData.map((data) => (
              <Card onClick={() => navigate(`/view/${data.num}`)} data={data} />
            ))
          ) : (
          filterData.length > 0 ? (
            filterData.map((data) => (
              <Card onClick={() => navigate(`/view/${data.num}`)} data={data} />
            ))
          ) : (
            getData.map((data) => (
              <Card onClick={() => navigate(`/view/${data.num}`)} data={data} />
            ))
           ))
        }
        </Horizontal_4>
      </Inner>
      
    </>
  )
}

export default Main