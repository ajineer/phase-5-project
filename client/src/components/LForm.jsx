import { useState } from "react"

function LForm({setToggle, setLists, lists}){

    const [name, setName] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        fetch(`/api/lists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({name:name})
        }).then(r => r.json())
        .then(list => setLists([...lists, list]))
        setToggle(false)
    }

    return (
        <div className="block mt-5 h-[100%]">
            <form className='flex flex-col items-center p-5 h-[100%]' onSubmit={(e) => handleSubmit(e)}>
                <label className="mt-5">Enter new list name</label>
                <input
                    className="mb-auto border-2 border-black"
                    type="text"
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </form>
        </div>
    )
}

export default LForm