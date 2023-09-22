import Calendar from 'react-calendar'
import { useState, useEffect } from 'react'
import DayUI from './DayUI'
import 'react-calendar/dist/Calendar.css'
//import { Calendar, dayjsLocalizer } from 'react-big-calendar'


function CalendarUI({user, lists}){

    const [selDate, setSelDate] = useState(new Date())
    const [calEvents, setCalEvents] = useState([])

    useEffect(()=>{
        setCalEvents(user?.events.length>0 ? user.events: [])
    },[user?.events])

    const renderTile = (date) => {
        if(calEvents.some(userEvent => userEvent.date === date.toDateString())){
            return <h5 className='bg-pink-500 text-xs'>event</h5>
        }
        return null
    }


    return(
        <div className='flex flex-col mb-10 w-[99%] h-[99%] items-center'>
            <Calendar 
                tileContent={({ date }) => renderTile(date)}
                onClickDay={(e) => {
                    setSelDate(e)}}
                />
            <DayUI 
                selDate={selDate} 
                setCalEvents={setCalEvents} 
                calEvents={calEvents}
                user={user}
                lists={lists}/>
        </div>
    )
}

export default CalendarUI