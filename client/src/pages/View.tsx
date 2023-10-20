import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listData } from '../interface'
import { Horizontal_2 } from '../components/layout/Horizontal';
import {formatDateToYYYYMMDD} from '../utils'
import style from './view.module.css'
import { ButtonSt1 } from '../components/ui/Buttons';
import DropDown from '../components/ui/DropDown';
import { getUserInfo } from '../session';

const View = () => {
    const { num } = useParams();
    const [getData, setGetData] = useState<listData[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/view/${num}`);
            setGetData(response.data);
          } catch (error) {
            // API 요청 중 발생하는 오류를 처리합니다.
            console.log('데이터를 가져오는 중 오류 발생:', error);
          }
        };
    
        fetchData();
    }, [num]);

    if (getData.length === 0) {
        return <div className='inner'>데이터가 없음</div>;
    }

    const { writer, title, content, gameName, genre, detailGenre, url, personnel, deadLine, date } = getData[0];
    const sessionUser = getUserInfo();

    const onSelectOption = async (option : any) => {
      switch (option) {
        case '수정':
          navigate(`/modify/${num}`, {state : { nickName : writer}})
          break;
        
        case '삭제':
          try {
            const respones = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${num}`)
            if(respones.status === 204){
              navigate('/')
            } else if (respones.status === 404){
              alert('리소스를 찾을수 없습니다.');
            }else {
              console.log('삭제 실패  관리자에게 문의하세요.')
            }

          } catch (error) {
            alert(`삭제실패 오류코드 : ${error} 관리자에게 문의하세요.`)
          }
          break;
        default:
          break;
      }
    }

    const buttonClickHandler = () => {
      navigate('/');
    }
    return (
        <div className='inner'>
          <div className={style['view-top']}>
              <h2 className={style.title}>
                {title}
                {
                  sessionUser && sessionUser.nickName === writer ?
                  <DropDown options={['수정', '삭제']} onSelectOption={onSelectOption}>
                    <img src='../images/ic_setting.png' alt='수정버튼 이미지'/>
                  </DropDown>
                  :
                  ''
                }
                
              </h2>
              <ul className={style['write-info']}>
                <li>{writer}</li>
                <li>{formatDateToYYYYMMDD(date)}</li>
              </ul>
              
          </div>
          <Horizontal_2>
              <li>
                <dl>
                  <dt>게임 이름</dt>
                  <dd>{gameName}</dd>
                </dl>
                
              </li>
              <li>
                <dl>
                  <dt>게임 장르</dt>
                  <dd>{genre}</dd>
                </dl>
                
              </li>
              <li>
                <dl>
                  <dt>세부 장르</dt>
                    <dd>
                      {
                        //detailGenre
                        <ul className={`tag-wrap ${style['tag-st']}`}>
                          {detailGenre.split(',').map((params)=>(
                            <li>{params}</li>
                          ))}
                        </ul>
                      }
                    </dd>
                </dl>
                
              </li>
              <li>
                <dl>
                  <dt>마감 날짜</dt>
                  <dd>{formatDateToYYYYMMDD(deadLine)}</dd>
                </dl>
              </li>
              <li>
               <dl>
                  <dt>모집 인원</dt>
                  <dd>{personnel}</dd>
                </dl>
                
              </li>
              <li>
                <dl>
                  <dt>디스코드</dt>
                  <dd><a href={url} target='_blank'>{url}</a></dd>
                </dl>
              </li>
          </Horizontal_2>
          <div className={style.content}>
            {content}
          </div>
          <div className='flx jsc'>
            <ButtonSt1 txt="목록" onClick={buttonClickHandler}/>
          </div>
        </div>
    )
}

export default View