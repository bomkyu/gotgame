import React, {useState, useEffect, useRef} from 'react'
import style from './calendar.module.css'
import Calendar from 'react-calendar'
import moment from "moment";
import "./calendarStyle.css";
import { CalendarCustomProps } from '../../interface';


const CalendarCustom = ({ onchange , title, value } : CalendarCustomProps) => {
    const [click, setClick] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            if (calendarRef.current && !(calendarRef.current as any).contains(event.target)) {
                setClick(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(()=> {
      console.log(click);
    }, [click])
    return (
    
    <div className={style['calendar-wrap']} ref={calendarRef} >
      <div className={style['calendar-info']} onClick={()=>setClick(!click)}>
        <span>{title}</span>
        <p>{value}</p>
        <img src='../images/ic_calendar.png' alt='캘린더 아이콘'/>
      </div>
        {
        click &&
          <div>
          <Calendar
            minDate={moment().toDate()}
            onChange={onchange}
            formatDay={(locale, date) => moment(date).format("DD")}
            value={value}
          />
          </div>
        }
    </div>
  )
}

export default CalendarCustom