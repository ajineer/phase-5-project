import Calendar from 'react-calendar'
import { useState, useEffect } from 'react'
import DayUI from './DayUI'
import 'react-calendar/dist/Calendar.css'


function CalendarUI({user}){

    const [selDate, setSelDate] = useState(new Date())
    const [calEvents, setCalEvents] = useState([])
    const [selEvent, setSelEvent] = useState(()=>{
        const storedSelEvent = localStorage.getItem('selEvent')
        return storedSelEvent ? JSON.parse(storedSelEvent) : {}
    })
    
    useEffect(()=>{
        localStorage.setItem('selEvent', JSON.stringify(selEvent))
    },[selEvent])
    
    useEffect(()=>{
        setCalEvents(user?.events.length>0 ? user.events: [])
    },[user?.events])

    const renderTile = (date) => {
        if(calEvents.some(userEvent => userEvent.date === date.toDateString())){
            return <h5 className='bg-pink-500 text-xs'>Event</h5>
        }
        return null
    }


    return(
        <div className='flex flex-col mb-10 bg-white w-[99%] h-[99%] items-center border-2 border-black'>
            <Calendar 
                tileContent={({ date }) => renderTile(date)}
                onClickDay={(e) => {
                    setSelDate(e)}}
                />
            <DayUI 
                selDate={selDate} 
                selEvent={selEvent} 
                setSelEvent={setSelEvent} 
                setCalEvents={setCalEvents} 
                calEvents={calEvents}
                user={user}/>
        </div>
    )
}

export default CalendarUI