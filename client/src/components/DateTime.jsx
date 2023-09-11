import { useState } from "react"
import TimeSlot from "./TimeSlot"
import Event from "./Event"

function DateTime({times, selDate, userEvents}){

    const [selEvent, setSelEvent] = useState({})

    function viewEvent(event){
        setSelEvent(event)
    }

    return (

        <div className="flex">
            <div>
                <h3>{selDate.toDateString()}</h3>
                <ul className="max-h-65 h-[300px] overflow-y-auto bg-gray-500">
                    {times.map((time, index) => 
                    <TimeSlot key={index} time={time} userEvents={userEvents} selDate={selDate} viewEvent={viewEvent}/>)}
                </ul>
            </div>
            <Event selEvent={selEvent}/>
        </div>

    )
}

export default DateTime