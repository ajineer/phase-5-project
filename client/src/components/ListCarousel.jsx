import { useState, useEffect } from "react"
import TaskList from "./TaskList"
import Tasks from "./Tasks"
import LForm from "./LForm"
import useStore from "../store"

function ListCarousel(){

    const { user, setuser, lists, setLists, Lform, setLForm, current, setCurrent } = useStore()

    function next(){
        setCurrent(current === lists.length ? 0 : current+1)
    }
    function prev(){
        setCurrent(current === 0? lists.length : current-1)
    }

    return (

        <div className="flex justify-center mt-auto mb-auto w-[90%] h-[90%]">
            <button className="mr-1 mt-auto mb-auto h-min w-min p-4 bg-stone-500 hover:bg-stone-300" onClick={() => prev()}>{`\u2770`}</button>                   
                <Tasks/>
            <button className="ml-1 mt-auto mb-auto h-min w-min p-4 bg-stone-500 hover:bg-stone-300" onClick={() => next()}>{`\u2771`}</button>
        </div>
    )
}

export default ListCarousel