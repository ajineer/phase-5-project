import React from "react"
import ListCarousel from "./ListCarousel"

function ListUI ({user}){

    return (
        <div className="flex flex-col mt-10 bg-blue-200 h-[375px] p-5">
            <ListCarousel user={user}/>
        </div>
    )

}

export default ListUI
