import { useState } from "react"


function EventsUI({selDate, times, toggle, setToggle, setCalEvents, setRenderEvent}){

    const[formData, setFormData] = useState({
        name:"",
        date: selDate,
        start: "",
        end: ""
    })

    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(formData)
        }).then(r => r.json())
        .then(event => (
            setCalEvents(prevCalEvents => [...prevCalEvents, event]),
            setRenderEvent(event)))
        setFormData({
            name:"",
            date: selDate,
            start: "",
            end: ""
        })
        setToggle(!toggle)
    }

    return(
        <div className='flex flex-col w-[50%] items-center justify-center'>
            <h2>{selDate}</h2>
            <form className='flex flex-col bg-white bg-opacity-50 w-[60%] p-5' onSubmit={handleSubmit}>
                <label>Enter event name</label>
                <input
                    placeholder="event name"
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={formData.name}
                ></input>
                <label>Enter start time</label>
                <select
                    type='text'
                    name='start'
                    value={formData.start}
                    onChange={(e) => handleChange(e)}>
                        {times.map((time, index) => <option key={index}>{time}</option>)}
                </select>
                <label>Enter end time</label>
                <select 
                    type='text'
                    name='end'
                    value={formData.end}
                    onChange={(e) => handleChange(e)}>
                        {times.map((time, index) => <option key={index}>{time}</option>)}
                </select>
                <input className='bg-white hover:bg-slate-300 w-fit ml-auto mr-auto mt-5 pl-2 pr-2' type='submit' onSubmit={handleSubmit} value="Add"></input>
            </form>
            <button className='bg-gray-200 w-fit mt-4 pt-1 pb-1 pr-3 pl-3 border-2 border-black rounded' onClick={() => setToggle(!toggle)}>back</button>
        </div>
    )
}

export default EventsUI