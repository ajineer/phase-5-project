import { useState } from "react"

function Task({task, setSelList, selList, currentTasks, setCurrentTasks}){

    const [toggle, setToggle] = useState(false)
    const [formData, setFormData] = useState({...task})
    const [statusState, setStatusState] = useState(task.status)

    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
        if(name==='status'){
            const newStatus = statusState === 0? 1:0
            setStatusState(newStatus)
            setFormData({...formData, [name]: newStatus})
            fetch(`/api/tasks/${task.id}`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json"
                }, body: JSON.stringify(formData)
            }).then(r => r.json())
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(formData)
        }).then(r => r.json())
        .then((t) => setFormData({...t}))
        setToggle(false)    
    }
        

    function handleDelete(e){
        e.preventDefault()
        fetch(`/api/tasks/${task.id}`, {
            method: 'Delete'
        })
        setCurrentTasks((prevTasks) => prevTasks.filter(t => t.id !== formData.id))
    }

    return (
        <>
            <div className="flex flex-col items-center mt-5"> 
                <li className='flex text-xl bg-blue-600'>
                    <>
                        <h3 className={`mt-auto mb-auto ml-2 bg-pink-500 ${toggle?"hidden":""}`}>{formData.description}</h3>
                        <div className={`inline-block ml-10 ext-2xl ${toggle?"hidden":""}`}>
                            <button onClick={(e) => handleDelete(e)} className="bg-blue-400 m-1 hover:bg-blue-200 w-10">X</button>
                            <button onClick={() => setToggle(!toggle)} className="bg-blue-400 m-1 hover:bg-blue-200 w-10">{`\u270E`}</button>
                            <button
                                onClick={(e) => (handleChange(e))}
                                name="status"
                                value={statusState}
                                className="bg-blue-400 m-1 hover:bg-blue-200 w-10">{statusState===1?`\u2610`:`\u2611`}
                            </button>
                        </div>
                    </>
                    <form className={`flex flex-col items-center mt-5 ${toggle ? "" : "hidden"}`} onSubmit={(e) => handleSubmit(e)}>
                        <input 
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={(e) => handleChange(e)}>
                        </input>   
                    </form>
                    <button className={`${toggle?"":"hidden"}`}onClick={() => setToggle(!toggle)}>X</button> 
                </li>               
            </div>
        </>
    )
}

export default Task