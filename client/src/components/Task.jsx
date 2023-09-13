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
        .then((t) => setFormData({...t}))
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
            <div className="flex flex-col items-center mt-5"> 
                <li className='flex bg-blue-600 mr-auto w-[100%]'>
                    
                    <h3 className={`mt-auto mb-auto mr-auto bg-white pr-1 ${toggle?"hidden":""}`}>{formData.description}</h3>
                    <div className={`ml-auto ${toggle?"hidden":""}`}>
                        <button onClick={() => handleDelete(task)} className="bg-blue-400 hover:bg-blue-200 p-[1px]">X</button>
                        <button onClick={() => setToggle(!toggle)} className="bg-blue-400 hover:bg-blue-200 p-[1px]">{`\u270E`}</button>
                        <input
                            type="checkbox"
                            checked={formData.status===0?false:true}
                            onChange={(e) => (handleCheck(e))}
                            name="status"
                            className="bg-blue-400 m-[2px] hover:bg-blue-200">
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
                    <button className={`pl-2 pr-2 ml-1 ${toggle?"":"hidden"}`}onClick={() => setToggle(!toggle)}>X</button> 
                </li>               
            </div>:
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