import { useState, useEffect } from "react"
import ListCard from "./ListCard"
import GroceryItems from "./GroceryItems"
import GroceryItemForm from './GroceryItemForm'

function GroceryCarousel({user}){

    const [lists, setLists] = useState([])
    const [current, setCurrent] = useState(0)
    const [toggle, setToggle] = useState(false)
    const [selList, setSelList] = useState(undefined)

    function prev(){
        current === 0 ? setCurrent(lists.length-1) : setCurrent(current-1)
        setSelList(lists[current])
    }

    function next(){
        current === lists.length-1 ? setCurrent(0) : setCurrent(current+1)
        setSelList(lists[current])
    }

    if (user){
        useEffect(()=>{
            setLists(user.grocery_lists)
            setSelList(user.grocery_lists[0])
        },[])
    }

    return (
        <>
            <ListCard list = {lists[current-1]}/>
            <ListCard list = {selList}/>
            <ListCard list = {lists[current+1]}/>
            <div> <button onClick={prev}>{`\u2770`}</button><button onClick={next}>{`\u2771`}</button></div>
            {toggle?
            <GroceryItemForm setToggle={setToggle} selList={selList} setSelList={setSelList}/>:
            <GroceryItems setSelList={setSelList} selList={selList}/>}
            {toggle?
            <button onClick={() => setToggle(!toggle)}>View items</button>:
            <button onClick={() => setToggle(!toggle)}>Add item</button>}
        </>
    )
}

export default GroceryCarousel