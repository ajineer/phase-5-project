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
                    <div className="flex w-[90%]">
                        <form className="flex mr-auto" onSubmit={(e) => handleSubmit(e)}>
                            <input
                                type="text"
                                name='description'
                                maxLength='22'
                                placeholder="Enter new task"
                                onChange={(e) => setDesc(e.target.value)}
                                ></input>
                        </form>
                            <input
                                className="w-fit"
                                type='text'
                                placeholder="Search"
                                onChange={(e) => handleSearch(e)}>
                            </input>
                    </div>
                    <div className="flex flex-col border-2 border-black items-center h-[100%] w-[90%]">
                        {list.tasks.length!==0?
                            <ul className="overflow-y-scroll h-[80%] mt-5 w-[80%]">
                                {search===''?
                                (list.tasks.map(task => <Task key={task.id} task={task} list={list} setLists={setLists} lists={lists}/>)):
                                (filteredTasks.map(task => <Task key={task.id} task={task} list={list} setLists={setLists} lists={lists}/>))
                                }
                            </ul>:null
                        }
                        <h3>
                            Task count: {list.tasks.length}
                        </h3>
                    </div>
                </div>:
                <div className="flex flex-col items-center mt-5 h-[100%] w-[100%]">
                    <h3>No list</h3>
                </div>}
        </div>
    )
}

export default Tasks