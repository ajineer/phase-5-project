import { useEffect, useState } from "react"
import useStore from "../store"

function Task({task}){

    const { lists, current, setLists} = useStore()
    const [formData, setFormData] = useState({
        description: '',
        status: 0
    })
    const [toggleEdit, setToggleEdit] = useState(false)

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
                const updatedList = { ...lists[current], tasks: lists[current].tasks.map(t => t.id === task.id ? rTask : t)}
                const updatedLists = lists.map(l => l.id === lists[current].id ? updatedList : l)
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
            const updatedList = { ...lists[current], tasks: lists[current].tasks.map(currentTask => currentTask.id === t.id ? t : currentTask)}
            const updatedLists = lists.map(l => l.id === lists[current].id ? updatedList : l)
            setLists(updatedLists)
        })
        setToggleEdit(false)    
    }
        

    function handleDelete(task){
        fetch(`/api/tasks/${task.id}`, {
            method: 'Delete'
        })
        const updatedTasks = lists[current].tasks.filter(t => t.id !== task.id)
        const updatedList = {...lists[current], tasks: updatedTasks}
        const listIndex = lists.findIndex(l => l.id === lists[current].id)
        if(listIndex !== -1){
            const updatedLists = [...lists]
            updatedLists[listIndex] = updatedList
            setLists(updatedLists)
        }
    }

    return (
        <>
            {task?
            <li className={`flex mt-5 bg-${task.status===0?'violet':'leafy_green'} rounded bg-opacity-30 ml-[10%] w-[80%] text-xl p-2 border-2 border-blood_orange/30`}>
                
                <h3 className={`bg-white text-center mt-auto mb-auto pr-1 w-[20ch] ${toggleEdit?"hidden":""}`}>{task.description}</h3>
                <h3 className={`mt-auto mb-auto ml-auto pr-1 text-[.9rem] ${toggleEdit?"hidden":""}`}>Updated: {task.updated}</h3>
                <div className={`flex ml-auto ${toggleEdit?"hidden":""}`}>
                    <button onClick={() => handleDelete(task)} className="hover:bg-blue-200 pr-3 pl-3">X</button>
                    <button onClick={() => setToggleEdit(!toggleEdit)} className="hover:bg-blue-200 pr-3 pl-3">{`\u270E`}</button>
                    <input
                        className="mr-3 ml-3 hover:bg-blue-200"
                        type="checkbox"
                        checked={formData.status===0?false:true}
                        onChange={(e) => (handleCheck(e))}
                        name="status">
                    </input>
                </div>
                <form className={`flex flex-col items-center mt-5 mb-auto mt-auto ${toggleEdit ? "" : "hidden"}`} onSubmit={(e) => handleSubmit(e)}>
                    <input 
                        className="mr-auto w-[100%]"
                        type='text'
                        name='description'
                        placeholder={formData.description}
                        onChange={(e) => handleChange(e)}>
                    </input>   
                </form>
                <button className={`pl-2 pr-2 ml-auto ${toggleEdit?"":"hidden"}`}onClick={() => setToggleEdit(!toggleEdit)}>Back</button> 
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