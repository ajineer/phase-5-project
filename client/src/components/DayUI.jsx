import { useState, useEffect } from "react"
import EventsUI from './EventsUI'
import DateTime from "./DateTime"

function DayUI({user, selDate, calEvents, setCalEvents, lists}){

    const times = []
    const interval = 15
    const [toggle, setToggle] = useState(false)
    const [renderEvent, setRenderEvent] = useState(()=>{
        const storedEvent = localStorage.getItem('renderEvent')
        return storedEvent ? JSON.parse(storedEvent) : {}
    })
    
    useEffect(()=>{
        localStorage.setItem('renderEvent', JSON.stringify(renderEvent))
    },[renderEvent])

    for(let hour = 0; hour <=23; hour++){
        for (let minute = 0; minute < 60; minute += interval){
            const formattedHour = hour % 12 || 12
            const amPm = hour < 12 ? 'a.m.' : 'p.m.'
            const formattedMinute = minute.toString().padStart(2, '0')
            const timeString = `${formattedHour}:${formattedMinute} ${amPm}`
            times.push(timeString)
        }
    }

    return(
        <div className="flex flex-col w-[100%] h-[50%] justify-center mt-auto">
            {toggle?
            <EventsUI 
                toggle={toggle} 
                setToggle={setToggle} 
                times={times} 
                selDate={selDate.toDateString()} 
                calEvents={calEvents} 
                setCalEvents={setCalEvents} 
                setRenderEvent={setRenderEvent}/> : 
            <DateTime 
                selDate={selDate} 
                times={times} 
                calEvents={calEvents} 
                setCalEvents={setCalEvents}
                setRenderEvent={setRenderEvent} 
                renderEvent={renderEvent} 
                user={user}
                lists={lists}/>}
            <button className='ml-auto mr-auto w-fit mb-10 bg-white hover:bg-slate-300' onClick={() => setToggle(!toggle)}>{!toggle?'Add event':'Back'}</button>
        </div>
    )
}

export default DayUI