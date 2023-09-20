import { useState, useEffect } from "react"


function TimeSlot({time, times, calEvents, setCalEvents, selDate, renderEvent, setRenderEvent, user}){

    const [event, setEvent] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [toggle, setToggle] = useState(true)
    const [formData, setFormData] = useState({
        name: renderEvent ? renderEvent.name : '',
        start: renderEvent? renderEvent.start : '',
        end: renderEvent? renderEvent.end : '',
        action: ''
    })

    function handleChange(e){
        const { name, value } = e.target
        setFormData({...formData, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/events/${renderEvent.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(r => r.json())
        .then(event => (
            setRenderEvent(event),
            setCalEvents([...user.events, event]),
            setToggle(!toggle)
        ))
    }

    function handleDelete(){
        fetch(`/api/events/${renderEvent.id}`,{
            method: 'DELETE'
        })
        setCalEvents(calEvents.filter(event => event.id !== renderEvent.id))
        setRenderEvent(null)
    }

    function addList(list){
        fetch(`/api/events/${renderEvent.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: renderEvent.name,
                start: renderEvent.start,
                end: renderEvent.end,
                list_id: list.id,
                action:'add'
            })
        }).then(r => r.json())
        .then(eventData => (
            setCalEvents([...calEvents, eventData]), 
            setRenderEvent(eventData)))
    }

    function removeList(list){
        fetch(`/api/events/${renderEvent.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: renderEvent.name,
                start: renderEvent.start,
                end: renderEvent.end,
                list_id: list.id,
                action: 'remove',
            })
        }).then(r => r.json())
        .then(eventData => (
            setCalEvents([...calEvents, eventData]), 
            setRenderEvent({...eventData})
        ))
    }

    useEffect(()=>{
        setFormData({ ...formData, ...renderEvent})
    },[renderEvent])

    useEffect(()=>{
        setIsOpen(false)
    },[selDate])

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
                    <button className='ml-auto bg-gray-200 text-xs hover:bg-white' onClick={() => (setRenderEvent(event), setIsOpen(!isOpen), setToggle(true))}>{isOpen?'close':'view'}</button>
                </div>}
            </li>
            {isOpen && renderEvent &&

            <div className="w-[100%]">

                <div className={`grid grid-row-[1fr, 1fr, 1fr, 1fr] grid-col-[1fr, 1fr, 1fr] w-[100%] bg-mirky_water mt-1`}>
                    <div className="col-start-1 col-end-1 row-start-1 row-end-3 w-[90%]">
                        {toggle ? 
                        <div>
                            <h3 className="ml-2">{renderEvent?.name} </h3>
                            <h3 className="ml-2">{renderEvent?.start}</h3>
                            <h3 className="ml-2">{renderEvent?.end}</h3>
                        </div>:
                        <div className={`flex flex-col w-[50%] justify-center ml-5`}>
                            <h2>{renderEvent.date}</h2>
                            <form className='flex flex-col bg-white bg-opacity-50 p-1' onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    name='name'
                                    onChange={(e) => handleChange(e)}
                                    value={formData.name}>
                                </input>
                                <select
                                    type='text'
                                    name='start'
                                    onChange={(e) => handleChange(e)}
                                    value={formData.start}>
                                        {times.map((time, index) => 
                                            <option value={time} key={index}>{time}</option>)}
                                </select>
                                <select 
                                    type='text'
                                    name='end'
                                    onChange={(e) => handleChange(e)}
                                    value={formData.end}>
                                        {times.map((time, index) => 
                                            <option value={time} key={index}>{time}</option>)}
                                </select>
                                <input className='border-2 border-black rounded bg-gray-200 mt-1' type='submit' onSubmit={() => handleSubmit()} value="Submit"></input>
                            </form>
                        </div>
                        }
                        <div className="mt-3">
                            <button 
                                className='bg-gray-200 text-lg mr-1 pl-1 pr-1 border-2 border-black rounded hover:bg-white' 
                                onClick={() => setToggle(!toggle)}>{toggle?'\u270E':'back'}</button>
                            <button 
                                className={`${toggle?'':'hidden'} bg-gray-200 text-lg ml-1 pl-1 pr-1 border-2 border-black rounded hover:bg-white`} 
                                onClick={() => handleDelete()}>X</button>
                        </div>
                    </div>   
                    <ul className="col-start-2 col-end-2 row-start-1 row-end-4 w-[90%]">
                        Lists to complete:
                        {renderEvent.lists.length>0 &&
                            renderEvent.lists.map((list) => (
                            <li className='ml-2 w-[90%]' key={list.id}>
                                {list.name}
                                <button className="bg-gray-200 pl-1 pr-1 rounded ml-auto hover: bg-white" onClick={() => removeList(list)}>X</button>
                            </li>
                        ))}
                    </ul>
                    <ul className="col-start-3 col-end-3 row-start-1 row-end-4 ml-2 w-[90%]">
                        Lists you can add:
                        {user && user.lists?.length>0 &&
                            user.lists.filter((list)=> !renderEvent.lists.some((eventList)=>eventList.id === list.id)).map(list => (
                            <li className='flex flex-row' key={list.id}>
                                {list.name}
                                <button className='ml-auto bg-gray-200 hover:bg-white' onClick={()=>(addList(list))}>Add list</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default TimeSlot