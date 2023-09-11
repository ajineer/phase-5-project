import { useState } from "react"


function EventsUI({selDate, times, toggle, setToggle}){

    const[formData, setFormData] = useState({
        name:"",
        date: selDate,
        start: "",
        end: ""
    })

    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        console.log(formData)
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify(formData)
        })
        setFormData({
            name:"",
            date: selDate,
            start: "",
            end: ""
        })
        setToggle(!toggle)
    }

    return(
        <div>
            <h2>{selDate}</h2>
            <form className='flex flex-col' onSubmit={handleSubmit}>
                <label>Enter event name</label>
                <input
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
                        <option>Select start</option>
                        {times.map((time, index) => <option key={index}>{time}</option>)}
                </select>
                <label>Enter end time</label>
                <select 
                    type='text'
                    name='end'
                    value={formData.end}
                    onChange={(e) => handleChange(e)}>
                        <option>Select start</option>
                        {times.map((time, index) => <option key={index}>{time}</option>)}
                </select>
            </form>
            <button onClick={() => setToggle(!toggle)}>back</button>
        </div>
    )
}

export default EventsUI