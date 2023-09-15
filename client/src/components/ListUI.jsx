import React from "react"
import ListCarousel from "./ListCarousel"

function ListUI ({user}){

    return (
        <div className="flex flex-col h-[99%] w-[100%] p-5">
            <ListCarousel user={user}/>
        </div>
    )

}

export default ListUI
