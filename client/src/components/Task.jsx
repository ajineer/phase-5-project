import { useEffect, useState } from "react"

function Task({task, list, setLists, lists}){



    const [toggle, setToggle] = useState(false)
    const [formData, setFormData] = useState({
        description: "",
        status: 0
    })

    useEffect(()=>{
        setFormData({...task})
    },[task])


    function handleCheck(e){
        fetch(`/api/tasks/${task.id}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                description: formData.description,
                status: e.target.checked?1:0})
        }).then(r => (r.json()))
        .then((rTask) => {
                const updatedList = { ...list, tasks: list.tasks.map(t => t.id === task.id ? rTask : t)}
                const updatedLists = lists.map(l => l.id === list.id ? updatedList : l)
                setLists(updatedLists)
            })
    }

    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/tasks/${task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(formData)
        }).then(r => r.json())
        .then((t) => {
            const updatedList = { ...list, tasks: list.tasks.map(task => task.id === task.id ? t : task)}
            const updatedLists = lists.map(l => l.id === list.id ? updatedList : l)
            setLists(updatedLists)
        })
        setToggle(false)    
    }
        

    function handleDelete(task){
        fetch(`/api/tasks/${task.id}`, {
            method: 'Delete'
        }).then(r => {
            const updatedTasks = list.tasks.filter(t => t.id !== task.id)
            const updatedList = {...list, tasks: updatedTasks}
            const listIndex = lists.findIndex(l => l.id === list.id)
            if(listIndex !== -1){
                const updatedLists = [...lists]
                updatedLists[listIndex] = updatedList
                setLists(updatedLists)
            }
        })
    }

    return (
        <>
            {task?
            <li className='flex mt-5 bg-light_navy bg-opacity-50 ml-[10%] w-[80%] text-xl'>
                
                <h3 className={`mt-auto mb-auto pr-1 w-[15%] ${toggle?"hidden":""}`}>{formData.description}</h3>
                <h3 className={`mt-auto mb-auto ml-[25%] ${toggle?"hidden":""}`}>Updated: {task.updated}</h3>
                <div className={`flex ml-auto ${toggle?"hidden":""}`}>
                    <button onClick={() => handleDelete(task)} className="hover:bg-blue-200 pr-3 pl-3">X</button>
                    <button onClick={() => setToggle(!toggle)} className="hover:bg-blue-200 pr-3 pl-3">{`\u270E`}</button>
                    <input
                        className="mr-3 ml-3 hover:bg-blue-200"
                        type="checkbox"
                        checked={formData.status===0?false:true}
                        onChange={(e) => (handleCheck(e))}
                        name="status">
                    </input>
                </div>
                <form className={`flex flex-col items-center mt-5 mb-auto mt-auto ${toggle ? "" : "hidden"}`} onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        className="mr-auto w-[100%]"
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={(e) => handleChange(e)}>
                    </input>   
                </form>
                <button className={`pl-2 pr-2 ml-auto ${toggle?"":"hidden"}`}onClick={() => setToggle(!toggle)}>Back</button> 
            </li>:
            <li className='flex bg-blue-600 mt-5 mr-auto w-[100%]'>
                <h3 className={`mt-auto mb-auto mr-auto`}>________</h3>
                <div className={`ml-auto`}>
                    <button className="bg-blue-400 hover:bg-blue-200 p-[1px]">X</button>
                    <button className="bg-blue-400 hover:bg-blue-200 p-[1px]">{`\u270E`}</button>
                    <input
                        type="checkbox"
                        className="bg-blue-400 m-1 hover:bg-blue-200">
                    </input>
                </div>    
            </li>}
        </>
    )
}

export default Task