import { useEffect, useState } from "react"
import Task from "./Task"
import useStore from "../store"
import LForm from "./LForm"

function Tasks(){

    const { taskDesc, setTaskDesc, tSearch, setTsearch, filteredTasks, setFilteredTasks, lists, setLists, current } = useStore()

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/lists/${lists[current].id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: taskDesc })
        }).then(r => r.json())
        .then(task => {
            const updatedList = {...lists[current]}
            updatedList.tasks = [...updatedList.tasks, task]
            const listIndex = lists.findIndex(l => l.id === lists[current].id)
            if(listIndex!== -1){
                const updatedLists = [...lists];
                updatedLists[listIndex] = updatedList
                setLists(updatedLists)
            }
        })
        e.target.reset()
    }

    function deleteList(){
        fetch(`/api/lists/${lists[current].id}`, {
            method: 'DELETE'
        }).then(r => 
            setLists(lists.filter(l => l.id !==lists[current].id))
        )
    }

    useEffect(()=>{
        setFilteredTasks(lists[current]?.tasks.filter(task => task.description.toLowerCase().includes(tSearch.toLowerCase())))
    },[lists[current], tSearch])

    function handleSearch(e){
        setTsearch(e.target.value)
    }


    return(
        <div className="flex flex-col p-1 items-center h-[100%] w-[100%]">
            <LForm/>
            {lists[current]?
                <div className="flex flex-col h-[100%] w-[60%] bg-light_navy rounded">
                        <h3 className="text-xl ml-auto mr-auto mt-5">{lists[current].name}</h3>
                        <form className="flex mt-5 ml-10" onSubmit={(e) => handleSubmit(e)}>
                            <input
                                type="text"
                                name='description'
                                maxLength='22'
                                placeholder="Enter new task"
                                onChange={(e) => setTaskDesc(e.target.value)}
                                ></input>
                            <input
                                className="bg-white ml-1 pr-1 pl-1 rounded-r hover:bg-gray-300"
                                type="submit"
                                value="+"
                                >
                            </input>
                        </form>
                        <input
                            className="w-fit mt-5 ml-10"
                            type='text'
                            placeholder="Search"
                            onChange={(e) => handleSearch(e)}>
                        </input>
                        {lists[current].tasks.length!==0?
                            <ul className="overflow-y-scroll h-[80%] mt-5 w-[80%]">
                                {tSearch===''?
                                (lists[current].tasks.map(task => <Task key={task.id} task={task}/>)):
                                (filteredTasks.map(task => <Task key={task.id} task={task}/>))
                                }
                            </ul>:null
                        }
                        <button className='mr-auto ml-auto mt-auto mb-5 bg-stone-300 w-fit text-lg pr-[2px] pl-[2px] hover:bg-blood_orange' onClick={() => deleteList()}>Delete</button>
                    </div>:
                <div className="flex flex-col items-center mt-5 h-[100%] w-[100%]">
                    <h3>No list</h3>
                </div>}
        </div>
    )
}

export default Tasks