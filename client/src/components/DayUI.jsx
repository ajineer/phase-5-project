import { useState, useEffect } from "react"
import EventsUI from './EventsUI'
import Event from "./Event"
import DateTime from "./DateTime"

function DayUI({selDate, user}){

    const times = []
    const interval = 15
    const [toggle, setToggle] = useState(false)
    const [userEvents, setUserEvents] = useState([])


    for(let hour = 0; hour <=23; hour++){
        for (let minute = 0; minute < 60; minute += interval){
            const formattedHour = hour % 12 || 12
            const amPm = hour < 12 ? 'a.m.' : 'p.m.'
            const formattedMinute = minute.toString().padStart(2, '0')
            const timeString = `${formattedHour}:${formattedMinute} ${amPm}`
            times.push(timeString)
        }
    }

    useEffect(()=>{
        setUserEvents(user.events)
    },[])

    return(
        <div>
            {toggle?
            <EventsUI toggle={toggle} setToggle={setToggle} times={times} selDate={selDate.toDateString()}/> : 
            <>
                <DateTime selDate={selDate} times={times} userEvents={userEvents}/>
                <button onClick={() => setToggle(!toggle)}>Add event</button>
            </>}
    </div>
    )
}

export default DayUI