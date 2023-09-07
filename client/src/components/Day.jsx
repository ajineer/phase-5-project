function Day({day, setDay}){
    return (

        <div>
            {day.events.length===0?
                <h3>_____</h3>:
                day.events.map(evt => <h3 key={evt}>{evt.name}</h3>)}
            {day.grocery_lists.length===0?
                <h3>_____</h3>:
                day.grocery_lists.map(glist => <h3 key={glist.id}>{glist.name}</h3>)}
            {day.lists.length===0?
                <h3>_____</h3>:
                day.lists.map(list => <h3>{list.name}</h3>)}
        </div>
    )
}

export default Day