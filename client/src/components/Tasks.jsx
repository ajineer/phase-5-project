import { useEffect, useState } from "react"
import Task from "./Task"

function Tasks({list, setLists, lists}){

    const [desc, setDesc] = useState("")
    const [search, setSearch] = useState("")
    const [filteredTasks, setFilteredTasks] = useState([])

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

    useEffect(()=>{
        setFilteredTasks(list?.tasks.filter(task => task.description.toLowerCase().includes(search.toLowerCase())))
    },[list, search])

    function handleSearch(e){
        setSearch(e.target.value)
    }


    return(
        <div className="flex flex-col p-1 items-center h-[100%] w-[100%]">
            {list?
                <div className="flex flex-col items-center mt-5 h-[100%] w-[100%]">
                    <h3 className="text-xl">{list.name}</h3>
                    <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            name='description'
                            placeholder="Enter new task"
                            onChange={(e) => setDesc(e.target.value)}
                        ></input>
                    </form>
                    {list.tasks.length!==0?
                    <ul className="overflow-y-auto h-[60%] mt-5 w-[80%]">
                        <input
                            type='text'
                            placeholder="Search"
                            onChange={(e) => handleSearch(e)}>
                        </input>
                        {search===''?
                        (list.tasks.map(task => <Task key={task.id} task={task} list={list} setLists={setLists} lists={lists}/>)):
                        (filteredTasks.map(task => <Task key={task.id} task={task} list={list} setLists={setLists} lists={lists}/>))
                        }
                    </ul>:null
                    }
                </div>:
                <div className="flex flex-col items-center mt-5 h-[100%] w-[100%]">
                    <h3>No list</h3>
                </div>}
        </div>
    )
}

export default Tasks