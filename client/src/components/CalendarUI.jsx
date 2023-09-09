import Calendar from 'react-calendar'
import { useState, useEffect } from 'react'
import DayUI from './DayUI'
import 'react-calendar/dist/Calendar.css'


function CalendarUI({user}){

    const [selDate, setSelDate] = useState(new Date().toDateString())

    return(
        <div className='flex flex-col'>
            <Calendar 
                onClickDay={(e) => {
                    setSelDate(e.toDateString())}}
                />
                <DayUI selDate={selDate} user={user}/>
        </div>
    )
}

export default CalendarUI