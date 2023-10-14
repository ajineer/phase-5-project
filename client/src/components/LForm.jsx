import { useState } from "react"
import useStore from "../store"

function LForm(){

    const { setCurrent, setLists, lists, listName, setNewList } = useStore()

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({name:listName})
        }).then(r => r.json())
        .then(list => {
            setLists([...lists, list])
            setCurrent(list.id-1)
        })
        e.target.reset()
    }

    return (
        <div className="block mt-2 mb-2">
            <form className='flex text-lg' onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    name='name'
                    required={true}
                    max={20}
                    placeholder="Enter new list"
                    onChange={(e) => setNewList(e.target.value)}
                ></input>
                <input 
                    className="bg-white rounded-r hover:bg-gray-300 pr-1 pl-1 ml-1"
                    type='submit'
                    value='+'
                    onSubmit={(e) => handleSubmit(e)}>
                </input>
            </form>
        </div>
    )
}

export default LForm