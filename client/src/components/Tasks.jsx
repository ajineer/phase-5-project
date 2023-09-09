import { useState } from "react"
import Task from "./Task"

function Tasks({setSelList, selList, currentTasks, setCurrentTasks}){

    const [desc, setDesc] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/lists/${selList.id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description:desc})
        }).then(r => r.json())
        .then(task => setSelList({...selList, tasks:[...selList.tasks, task]}))
        e.target.reset()
    }

    return(
        <>
            {currentTasks === undefined?
                <span>No list</span>:
            currentTasks.length === 0?
                <div>
                    {/* <h3>{selList.name}</h3> */}
                    <span>No tasks</span>
                </div>:
                <div className="flex flex-col items-center mt-5">
                    <h3>{selList.name}</h3>
                    <ul>
                        {currentTasks.map(task => 
                        <Task key={task.id} task={task} setSelList={setSelList} selList={selList} currentTasks={currentTasks} setCurrentTasks={setCurrentTasks}/>)}
                    </ul> 
                </div>}
                <div>
                    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                        <label>
                            Enter Task description
                        </label>
                        <input
                            type="text"
                            name='description'
                            onChange={(e) => setDesc(e.target.value)}
                        ></input>
                    </form>
                </div> 
        </>
    )
}

export default Tasks