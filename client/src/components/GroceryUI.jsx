import { useState } from "react"
import GroceryCarousel from './GroceryCarousel'
import GForm from "./GForm"
import GroceryItems from './GroceryItems'

function GroceryUI({user}){

    const [toggle, setToggle] = useState(false)
    if (!user){
        return <div>Loading...</div>
    }

    return (
        <>
            {
                !toggle ?
                <div>
                    <GroceryCarousel user={user}/>   
                </div>:
                <GForm user={user} setToggle={setToggle}/>
            }
            <button onClick={() => setToggle(!toggle)}>New Form</button>
        </>
        
        
    )
}

export default GroceryUI