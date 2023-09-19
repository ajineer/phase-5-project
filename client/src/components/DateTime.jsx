import TimeSlot from "./TimeSlot"


function DateTime({times, selDate, calEvents, setRenderEvent, renderEvent}){

    return (

        <div className="flex flex-col h-[90%] ml-5">
            <h3>{selDate.toDateString()}</h3>
            <ul className="max-h-[80%] overflow-y-auto">
                {times.map((time, index) => 
                <TimeSlot key={index} time={time} calEvents={calEvents} selDate={selDate} renderEvent={renderEvent} setRenderEvent={setRenderEvent}/>)}
            </ul>
        </div>

    )
}

export default DateTime