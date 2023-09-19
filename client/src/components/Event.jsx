import { useState, useEffect } from "react"

function Event({user, selDate, times, setCalEvents, calEvents, renderEvent, setRenderEvent}){

    const [toggle, setToggle] = useState(false)
    const [formData, setFormData] = useState({
        name: renderEvent? renderEvent.name:'', 
        start: renderEvent? renderEvent.start:'',
        end: renderEvent? renderEvent.end:'',
        action: ''})

    function handleChange(e){
        const { name, value } = e.target
        setFormData({...formData, [name]:value})
    }

    useEffect(()=>{
        setFormData({ ...formData, ...renderEvent})
    },[renderEvent])

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
            setCalEvents([...user.events, event])))
        setToggle(false)
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
                action:''
            })
        }).then(r => r.json())
        .then(eventData => (setCalEvents([...calEvents, eventData]), setRenderEvent(eventData)))
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
            setRenderEvent(eventData)))
    }
    
    useEffect(()=>{
        setToggle(false)
        setRenderEvent(null)
    },[selDate])

    return (
        <div className="flex justify-center h-[85%] w-[49%] mt-[2%] ml-auto mr-auto">
            <div className={`${toggle?'hidden':''} text-sm w-[100%] h-[100%] bg-light_navy`}>
                {renderEvent?
                <div className="flex flex-col">
                    <div className="flex">
                        <section className='flex flex-col mt-[5%] ml-[10%] w-[50%]'>
                            <h3>Name: {renderEvent.name}</h3>
                            <h3>Date: {renderEvent.date}</h3>
                            <h3>Start: {renderEvent.start}</h3>
                            <h3>End: {renderEvent.end}</h3>
                            <div className="mt-3">
                                    <button className='bg-gray-200 text-lg mr-1 pl-1 pr-1 border-2 border-black rounded hover:bg-white' onClick={() => setToggle(true)}>{'\u270E'}</button>
                                    <button className='bg-gray-200 text-lg ml-1 pl-1 pr-1 border-2 border-black rounded hover:bg-white' onClick={() => handleDelete()}>X</button>
                            </div>
                        </section>
                        <section className="flex flex-col mr-[10%] mt-[5%] w-[50%] h-[100%]">
                            <h3 className="mb-1">Lists:</h3>
                            {renderEvent.lists && renderEvent.lists.length > 0?
                                <div className="flex flex-col ml-[10%] h-[50%]">
                                    {renderEvent.lists.map(list => 
                                        <h3 className='flex' key={list.id}>
                                            {list.name}
                                            <button className="bg-gray-200 pl-1 pr-1 border-2 border-black rounded ml-auto hover: bg-white" onClick={() => removeList(list)}>X</button>
                                        </h3>)}
                                </div>:
                                <div className="flex m-auto h-[50%] w-[100%]">No Lists</div>}
                                <div>
                                    <ul className="w-[100%] ml-0">
                                        {user && user.lists.length > 0 ? 
                                            user.lists.filter((list) => !renderEvent.lists?.some((eventList) => eventList.id === list.id)).map((list) =>(
                                                <li className="flex mt-1" key={list.id}>
                                                    <span className="mr-auto">
                                                        {list.name}
                                                    </span>
                                                    <button className='ml-auto bg-gray-200 hover:bg-white' onClick={()=>(addList(list))}>Add list</button>
                                                </li>
                                            )):
                                        <h3>No lists to add</h3>}
                                    </ul>
                                </div>
                        </section>
                    </div>
                </div>:
                <h3 className="text-center mt-[5%]">No event selected</h3>}
            </div>
            <div className={`${toggle?'':'hidden'} flex flex-col w-[50%] h-[99%] items-center justify-center`}>
                <h2>{renderEvent? renderEvent.date: null}</h2>
                <form className='flex flex-col bg-white bg-opacity-50 p-1' onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        onChange={(e) => handleChange(e)}
                        value={formData.name}>
                    </input>
                    <label>Start</label>
                    <select
                        type='text'
                        name='start'
                        onChange={(e) => handleChange(e)}
                        value={formData.start}>
                            {times.map((time, index) => 
                                <option value={time} key={index}>{time}</option>)}
                    </select>
                    <label>End</label>
                    <select 
                        type='text'
                        name='end'
                        onChange={(e) => handleChange(e)}
                        value={formData.end}>
                            {times.map((time, index) => 
                                <option value={time} key={index}>{time}</option>)}
                    </select>
                    <input className='border-2 border-black rounded bg-gray-200 mt-1' type='submit' onSubmit={handleSubmit} value="Submit"></input>
                </form>
                <button className='bg-gray-200 w-fit mt-4 pr-3 pl-3 border-2 border-black rounded mb-1' onClick={() => setToggle(!toggle)}>back</button>
            </div>
        </div>
    )
}

export default Event