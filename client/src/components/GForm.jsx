import { useState } from "react"


function GForm ({user, setToggle}){

    const [formData, setFormData] = useState({
        name: "",
    })

    function handleSubmit(e){
        console.log('look here: ', formData)
        e.preventDefault()
        fetch('/api/grocery_lists', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(r => r.json())
        .then(data => user.grocery_lists.push(data))
        setToggle(false)
        
    }

    return (
        <div>
            <h2>New List Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter list name</label>
                <input 
                    name='name'
                    type="text"
                    onChange={(e) => setFormData({...formData, name:e.target.value})}
                ></input>
                <input type="submit"></input>
            </form>
        </div>
    )

}

export default GForm