import { useState, useEffect } from "react"
import TaskList from "./TaskList"
import Tasks from "./Tasks"
import LForm from "./LForm"

function ListCarousel({user, lists, setLists}){

    // const [lists, setLists] = useState([])
    const [toggle, setToggle] = useState(false)
    const [index, setIndex] = useState(lists.length>3 ? lists.length-1 : 2)
    const [current, setCurrent] = useState(0)
    const [left, setLeft] = useState(-1)
    const [right, setRight] = useState(1)

    function next(){
        setCurrent(current === index ? 0 : current+1)
        setRight(right === index ? 0 : right+1)
        setLeft(left === index ? 0 : left+1)
    }
    function prev(){
        setCurrent(current === 0? index : current-1)
        setRight(right === 0? index : right-1)
        setLeft(left === 0? index : left-1)
    }
    
    // useEffect(()=>{
    //     if(user && user.lists.length>0){
    //         setLists(user.lists)
    //     }
    // },[user])

    return (

        <div className="flex flex-col h-[100%]">
                <div className="flex flex-row justify-center h-[45%]">
                    <button className="mr-1 w-min pl-4 pr-4 bg-stone-500 hover:bg-stone-300"onClick={prev}>{`\u2770`}</button>
                    {[left, current, right].map((idx) => 
                        <div className="w-[15%]" key={idx}>
                        {lists[idx]? 
                            <TaskList list = {lists[idx]} lists={lists} setLists={setLists} current={current}/>:
                            <div className={`flex bg-light_navy justify-center h-[80%] m-5 p-0`}>________</div>}
                        </div>
                    )}
                    <button className="ml-1 w-min pl-4 pr-4 bg-stone-500 hover:bg-stone-300" onClick={next}>{`\u2771`}</button>
                </div>
            <div className="flex m-auto h-[100%] w-[100%] align-center justify-center">
                {!toggle?
                <div className="flex flex-col w-[100%] h-[100%]">
                    <Tasks list={lists[current]} setLists={setLists} lists={lists}/>
                    <button className='bg-white bg-opacity-50 hover:bg-slate-300 w-fit pr-2 pl-2 ml-auto mr-auto mt-[20px]' onClick={() => setToggle(!toggle)}>Add list</button>
                </div>:
                <div className="flex flex-col w-[100%] h-[100%]">
                    <LForm setToggle={setToggle} lists={lists} setLists={setLists}/>:
                    <button className='bg-white bg-opacity-50 hover:bg-slate-300 w-fit pr-2 pl-2 ml-auto mr-auto mt-[20px]' onClick={() => setToggle(!toggle)}>Back</button>
                </div>}
            </div>
        </div>
    )
}

export default ListCarousel


 {/* <div className="flex justify-center h-[45%]">
    {lists[left] === undefined?
        <div className={`flex flex-col bg-light_navy w-[15%] h-[80%] m-5 p-0 items-center`}>________</div>:
        <TaskList list = {lists[left]} lists={lists} setLists={setLists} current={current}/>}
    {lists[current] === undefined?
        <div className={`flex flex-col bg-light_navy w-[15%] h-[80%] m-5 p-0 items-center`}>________</div>:
        <TaskList list = {lists[current]} lists={lists} setLists={setLists} current={current}/>}
    {lists[right] === undefined?
        <div className={`flex flex-col bg-light_navy w-[15%] h-[80%] m-5 p-0 items-center`}>________</div>:
        <TaskList list = {lists[right]} lists={lists} setLists={setLists} current={current}/>}
</div> */}