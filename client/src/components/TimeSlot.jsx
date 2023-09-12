import { useState, useEffect } from "react"

function TimeSlot({time, calEvents, selDate, setSelEvent, setRenderEvent}){

    const [event, setEvent] = useState({})

    useEffect(() => {
        const foundEvent = calEvents.find((userEvent) => userEvent.start === time && userEvent.date === selDate.toDateString())
        setEvent(foundEvent)
    },[selDate, time, calEvents])

    return(

        <li className="flex border-2 border-blue-800 p-1">
            {time}
            {event?
            <div className="flex bg-blue-200 ml-auto justify-center">
                <span className="mt-auto mb-auto text-sm text-left pl-1 pr-5">{event.name}, {event.start}-{event.end}</span>
                <button className='bg-gray-200 text-xs p-1 m-auto border-2 border-gray-600 rounded' onClick={() => (setRenderEvent(event))}>View</button>
            </div>:
            null}
        </li>
    )
}

export default TimeSlot