import { useState } from "react"
import Task from "./Task"

function Tasks({list, setLists, lists}){

    const [desc, setDesc] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/lists/${list.id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description:desc})
        }).then(r => r.json())
        .then(task => {
            const updatedList = {...list}
            updatedList.tasks = [...updatedList.tasks, task]
            const listIndex = lists.findIndex(l => l.id === list.id)
            if(listIndex!== -1){
                const updatedLists = [...lists];
                updatedLists[listIndex] = updatedList
                setLists(updatedLists)
            }
        })
        e.target.reset()
    }

    return(
        <div className="flex flex-col bg-gray-300 p-1 items-center border-2 border-yellow-500 h-[200px]">
            {list?
                <div className="flex flex-col items-center mt-5 h-[180px] w-[100%]">
                    <h3 className="text-xl">{list.name}</h3>
                    {list.tasks.length!==0?
                    <ul className="overflow-y-auto h-[60%]">
                        {list.tasks.map(task => <Task key={task.id} task={task} list={list} setLists={setLists} lists={lists}/>)}
                    </ul>:
                    <ul className="overflow-y-auto">
                        <Task/>
                    </ul>
                    }
                <div className="flex mt-auto">
                    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            name='description'
                            placeholder="Enter Task description"
                            onChange={(e) => setDesc(e.target.value)}
                        ></input>
                    </form>
                </div> 
                </div>:
                <div className="flex flex-col items-center mt-5 border-2 border-red-600 h-[180px] w-[100%]">
                    <h3>No lists</h3>
                </div>}
        </div>
    )
}

export default Tasks