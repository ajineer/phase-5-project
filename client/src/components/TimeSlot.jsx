import { useState, useEffect } from "react"

function TimeSlot({time, calEvents, selDate, renderEvent, setRenderEvent}){

    const [event, setEvent] = useState({})

    useEffect(() => {
        const foundEvent = calEvents.find((userEvent) => userEvent.start === time && userEvent.date === selDate.toDateString())
        setEvent(foundEvent)
    },[selDate, time, calEvents])

    return(

        <li className="bg-light_navy flex p-1 h-[20%] w-[100%] mt-1">
            {time}
            {event?
            <div className="flex ml-auto justify-center overflow-hidden">
                <span className="mt-auto mb-auto text-sm text-left pl-1 pr-5">{event.name}, {event.start}-{event.end}</span>
                <button className='bg-gray-200 text-xs p-1 m-auto hover:bg-white' onClick={() => (setRenderEvent(event))}>View</button>
            </div>:
            null}
        </li>
    )
}

export default TimeSlot