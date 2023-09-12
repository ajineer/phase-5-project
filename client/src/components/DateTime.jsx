import { useState } from "react"
import TimeSlot from "./TimeSlot"
import Event from "./Event"

function DateTime({times, selDate, calEvents, setSelEvent, setRenderEvent}){

    return (

        <div className="flex flex-col h-[90%]">
            <h3>{selDate.toDateString()}</h3>
            <ul className="max-h-[80%] overflow-y-auto bg-gray-500 border-2 border-yellow-300">
                {times.map((time, index) => 
                <TimeSlot key={index} time={time} calEvents={calEvents} selDate={selDate} setSelEvent={setSelEvent} setRenderEvent={setRenderEvent}/>)}
            </ul>
        </div>

    )
}

export default DateTime