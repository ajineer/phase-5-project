import { useState, useEffect } from "react"

function Event({user, selEvent, setSelEvent, selDate, times, setCalEvents, calEvents, renderEvent, setRenderEvent}){

    const [toggle, setToggle] = useState(false)
    const [formData, setFormData] = useState({
        name: selEvent.name, 
        start: selEvent.start,
        end: selEvent.end})

    function handleChange(e){
        const { name, value } = e.target
        setFormData({...formData, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/events/${selEvent.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(r => r.json())
        .then(event => (
            setSelEvent(event),
            setCalEvents([...user.events, event])))
        setToggle(false)
    }

    function handleDelete(){
        fetch(`/api/events/${selEvent.id}`,{
            method: 'DELETE'
        })
        setRenderEvent({})
        setCalEvents(calEvents.filter(event => event.id !== selEvent.id))
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
                list_id: list.id
            })
        }).then(r => r.json())
        .then(eventData => (console.log(eventData)))
    }

    useEffect(()=>{
        setToggle(false)
        setRenderEvent({})
    },[selDate])

    return (
        <div className="bg-gray-400 h-[85%] w-[49%] mt-[3%] ml-auto mr-auto border-2 border-pink-500">
            <div className={`${toggle?'hidden':''} text-sm`}>
                {Object.keys(renderEvent).length===0?
                <h3>No event selected</h3>:
                <section>
                    <h3>Date</h3>
                    <h3>{renderEvent.date}</h3>
                    <h3>Name</h3>
                    <h3>{renderEvent.name}</h3>
                    <h3>Start</h3>
                    <h3>{renderEvent.start}</h3>
                    <h3>End</h3>
                    <h3>{renderEvent.end}</h3>
                    <h3>Lists</h3>
                    {renderEvent.lists && renderEvent.lists.length > 0?
                    <div>
                        {renderEvent.lists.map(list => <h3 key={list.id}>
                            {list.name}
                        </h3>)}
                    </div>:
                    <div>
                        <h3>No Lists</h3>
                        <ul>
                            {user.lists.length > 0 ? user.lists.map(list => 
                                <li key={list.id}>{list.name} 
                                    <button className='bg-gray-500' onClick={()=>(addList(list))}>Add list</button></li>):
                                <h3>No lists to add</h3>}
                        </ul>
                    </div>}
                    <div className="mt-3">
                        <button className='bg-gray-200 text-lg mr-1 p-1 border-2 border-black rounded' onClick={() => setToggle(true)}>{'\u270E'}</button>
                        <button className='bg-gray-200 text-lg ml-1 p-1 border-2 border-black rounded' onClick={() => handleDelete()}>X</button>
                    </div>
                </section>}
            </div>
            <div className={`${toggle?'':'hidden'}`}>
                <form className='flex flex-col' onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type='text'
                        name='name'
                        onChange={(e) => handleChange(e)}
                        value={formData.name}
                    ></input>
                    <select
                        type='text'
                        name='start'
                        onChange={(e) => handleChange(e)}
                        value={formData.start}>

                            {times.map((time, index) => 
                                <option key={index} value={time}>
                                    {time}
                                </option>)}
                    </select>
                    <select 
                        type='text'
                        name='end'
                        onChange={(e) => handleChange(e)}
                        value={formData.end}>

                            {times.map((time, index) => 
                            <option key={index} value={time}>
                                {time}
                            </option>)}
                    </select>
                </form>
                <button onClick={() => setToggle(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default Event