import { useState, useEffect } from "react"
import EventsUI from './EventsUI'
import Event from "./Event"
import DateTime from "./DateTime"

function DayUI({user, selDate, calEvents, setCalEvents}){

    const times = []
    const interval = 15
    const [toggle, setToggle] = useState(false)
    const [toggleEvent, setToggleEvent] = useState(true)
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
        <div className="flex w-[100%] h-[50%] justify-center">
            {toggle?
            <EventsUI toggle={toggle} setToggle={setToggle} times={times} selDate={selDate.toDateString()} calEvents={calEvents} setCalEvents={setCalEvents} setRenderEvent={setRenderEvent}/> : 
            <div className="w-[100%] h-[99%]">
                <div className={`w-[100%] h-[100%] mt-5 ${toggleEvent?"":"hidden"}`}>
                    <DateTime selDate={selDate} times={times} calEvents={calEvents} setRenderEvent={setRenderEvent} renderEvent={renderEvent} setToggleEvent={setToggleEvent}/>
                    <button className='ml-5 mb-10 bg-white hover:bg-slate-300' onClick={() => setToggle(!toggle)}>Add event</button>
                </div>
                <div className={`w-[100%] h-[100%] ${toggleEvent?"hidden":""}`}>
                    <Event user={user} selDate={selDate} times={times} calEvents={calEvents} setCalEvents={setCalEvents} setRenderEvent={setRenderEvent} renderEvent={renderEvent} setToggleEvent={setToggleEvent}/>
                </div>
            </div>}
        </div>
    )
}

export default DayUI