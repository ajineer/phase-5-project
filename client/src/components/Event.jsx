function Event({selEvent}){

    return (
        <div>
            {selEvent?
            <section>
                <h3>Date</h3>
                <h3>{selEvent.date}</h3>
                <h3>Name</h3>
                <h3>{selEvent.name}</h3>
                <h3>Start</h3>
                <h3>{selEvent.start}</h3>
                <h3>End</h3>
                <h3>{selEvent.end}</h3>
                <h3>Lists</h3>
                {selEvent.lists.length===0?
                <h3>No Lists</h3>:
                <h3>{selEvent.lists}</h3>}
            </section>:
            <h3>No event selected</h3>}
        </div>
    )
}

export default Event