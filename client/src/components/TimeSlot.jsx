import { useState, useEffect } from "react"

function TimeSlot({time, userEvents, selDate, viewEvent}){

    const [event, setEvent] = useState({})

    useEffect(() => {
        const foundEvent = userEvents.find((userEvent) => userEvent.start === time && userEvent.date === selDate.toDateString())
        setEvent(foundEvent)
    },[selDate, time, userEvents])

    return(

        <div>
            {time}
            {event?
            <div className="bg-red-500">
                {event.name}
                <button onClick={() => viewEvent(event)}>View</button>
            </div>:
            null}
        </div>
    )
}

export default TimeSlot