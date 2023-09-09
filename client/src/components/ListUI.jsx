import { useState } from "react"
import ListCarousel from "./ListCarousel"

function ListUI ({user}){

    const [toggle, setToggle] = useState(false)

    return (
        <div className="flex flex-col mt-10 bg-orange-600 h-min p-5">
            <h2 className="ml-auto mr-auto text-3xl bg-blue-800 text-white">List UI</h2>
            <ListCarousel user={user}/>
        </div>
    )

}

export default ListUI
