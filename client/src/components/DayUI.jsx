import { useState, useEffect } from "react"
import EventsUI from './EventsUI'
import Event from "./Event"
import DateTime from "./DateTime"

function DayUI({user, selDate, setSelEvent, selEvent, calEvents, setCalEvents}){

    const times = []
    const interval = 15
    const [toggle, setToggle] = useState(false)
    const [renderEvent, setRenderEvent] = useState({})

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
        <div className="flex w-[100%] h-[50%] border-2 border-orange-600">
            {toggle?
            <EventsUI toggle={toggle} setToggle={setToggle} times={times} selDate={selDate.toDateString()} calEvents={calEvents} setCalEvents={setCalEvents} setSelEvent={setSelEvent}/> : 
            <div className="border-2 border-white w-[50%] h-[99%]">
                <DateTime selDate={selDate} times={times} calEvents={calEvents} setSelEvent={setSelEvent} selEvent={selEvent} setRenderEvent={setRenderEvent}/>
                <button className='bg-gray-200' onClick={() => setToggle(!toggle)}>Add event</button>
            </div>}
            <Event user={user} selEvent={selEvent} setSelEvent={setSelEvent} selDate={selDate} times={times} calEvents={calEvents} setCalEvents={setCalEvents} setRenderEvent={setRenderEvent} renderEvent={renderEvent}/>
        </div>
    )
}

export default DayUI