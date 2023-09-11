import { useState, useEffect } from "react"
import TaskList from "./TaskList"
import Tasks from "./Tasks"
import LForm from "./LForm"

function ListCarousel({user}){

    const [lists, setLists] = useState([])
    const [current, setCurrent] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [selList, setSelList] = useState(undefined)
    const [currentTasks, setCurrentTasks] = useState(undefined)

    function prev(){
        current === 0 ? setCurrent(lists.length-1) : setCurrent(current-1)
        setSelList(lists[current])
        setCurrentTasks(lists[current].tasks)
    }

    function next(){
        current === lists.length-1 ? setCurrent(0) : setCurrent(current+1)
        setSelList(lists[current])
        setCurrentTasks(lists[current].tasks)
    }

    
    useEffect(()=>{
        if(user && user.lists){
            console.log(user.lists[0])
            setLists(user.lists)
            setSelList(user.lists[0])
            if (user.lists[0].length !==0){
                setCurrentTasks(user.lists[0].tasks)
            }
        }
    },[user])

    return (
        <div className="flex flex-col">
            <div className="flex">
                <TaskList list = {lists[current+1]}/>
                <TaskList list = {lists[current]}/>
                <TaskList list = {lists[current-1]}/>
            </div>
            <div className="flex justify-center">
                <button
                    className="mr-1 w-min pl-4 pr-4 bg-stone-500" 
                    onClick={prev}>{`\u2770`}</button>
                <button 
                    className="ml-1 w-min pl-4 pr-4 bg-stone-500"
                    onClick={next}>{`\u2771`}</button>
            </div>
            {toggle?
                <LForm setToggle={setToggle} lists={lists} setLists={setLists}/>:
                <Tasks setSelList={setSelList} selList={selList} currentTasks={currentTasks} setCurrentTasks={setCurrentTasks}/>}
            <div className="flex ml-auto mr-auto">
                {!toggle?
                <button className='bg-yellow-500 mt-5' onClick={() => setToggle(!toggle)}>Add list</button>:
                <button className='bg-yellow-500 mt-5' onClick={() => setToggle(!toggle)}>Back to Lists</button>}
            </div>
        </div>
    )
}

export default ListCarousel