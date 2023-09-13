import { useState, useEffect } from "react"
import TaskList from "./TaskList"
import Tasks from "./Tasks"
import LForm from "./LForm"

function ListCarousel({user}){

    const [lists, setLists] = useState([])
    const [current, setCurrent] = useState(0)
    const [toggle, setToggle] = useState(false)

    function prev(){
        current === 0 ? setCurrent(lists.length-1) : setCurrent(current-1)
    }

    function next(){
        current === lists.length-1 ? setCurrent(0) : setCurrent(current+1)
    }

    
    useEffect(()=>{
        if(user && user.lists.length>0){
            setLists(user.lists)
        }
    },[user])

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <TaskList list = {current===lists.length-1?lists[0]:lists[current+1]}/>
                <TaskList list = {lists[current]}/>
                <TaskList list = {current===0?lists[lists.length-1]:lists[current-1]}/>
            </div>
            <div className="flex justify-center mt-auto">
                <button
                    className="mr-1 w-min pl-4 pr-4 bg-stone-500" 
                    onClick={prev}>{`\u2770`}</button>
                <button 
                    className="ml-1 w-min pl-4 pr-4 bg-stone-500"
                    onClick={next}>{`\u2771`}</button>
            </div>
            {toggle?
                <LForm setToggle={setToggle} lists={lists} setLists={setLists}/>:
                <Tasks list={lists[current]} setLists={setLists} lists={lists}/>}
            <div className="flex m-auto">
                {!toggle?
                <button className='bg-yellow-500 mt-5' onClick={() => setToggle(!toggle)}>Add list</button>:
                <button className='bg-yellow-500 mt-5' onClick={() => setToggle(!toggle)}>Back to Lists</button>}
            </div>
        </div>
    )
}

export default ListCarousel