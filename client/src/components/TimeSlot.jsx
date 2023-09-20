import { useState, useEffect } from "react"

function TimeSlot({time, calEvents, selDate, renderEvent, setRenderEvent, setToggleEvent}){

    const [event, setEvent] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const foundEvent = calEvents.find((userEvent) => userEvent.start === time && userEvent.date === selDate.toDateString())
        setEvent(foundEvent)
    },[selDate, time, calEvents])

    return(

        <div>

        <li className="flex bg-light_navy flex p-1 w-[100%] mt-1">
            {time}
            {event &&
            <div className="flex text-sm ml-auto pl-1 w-[20%] mr-0 p-0">
                <h3>{event.name}</h3>
                <button className='ml-auto bg-gray-200 text-xs hover:bg-white' onClick={() => (setRenderEvent(event), setIsOpen(!isOpen))}>{isOpen?'close':'view'}</button>
            </div>}
        </li>
            {isOpen &&
                <ul className="bg-mirky_water mt-1">
                    <li className="ml-2">{renderEvent.name}</li>
                    <li className="ml-2">{renderEvent.start}</li>
                    <li className="ml-2">{renderEvent.end}</li>
                    <ul>
                        {renderEvent.lists && renderEvent.lists.map(list =>{
                            <li>{list.name}</li>
                        })}
                    </ul>
                    
                </ul>}
        </div>
    )
}

export default TimeSlot