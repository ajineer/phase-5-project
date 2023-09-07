function DayUI({setDays, days, selDate, selDay}){


    function addDay(){
        fetch(`/api/days`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: selDate.toDateString(),
            })
        }).then(r => r.json())
        .then(data => (setDays([...days, data])))
    }

    function deleteDay(selDay){
        fetch(`/api/days/${selDay.id}`, {
            method:'Delete'
        })
        setDays([...days].filter(day => day.id !== selDay.id))
    }
    return(
        <div>
        {selDay === null ?
            <div>
                <h3>No data</h3>
                <button onClick={addDay}>Add day</button>
            </div>:
            <div>
                {!selDay || selDay.events.length===0?
                <h3>No events</h3>:
                <ul>
                    <h3>Events</h3>
                    {selDay.events.map(evt => 
                        <li key={evt.id}>
                            {evt.name}
                        </li>)}
                </ul>}
                {!selDay || selDay.grocery_lists.length===0?
                <h3>No grocery lists</h3>:
                <ul>
                    <h3>Grocery Lists</h3>
                    {selDay.grocery_lists.map(glist => 
                        <li key={glist.id}>
                            {glist.name}
                        </li>)}
                </ul>}
                <button onClick={() => deleteDay(selDay)}>Delete day</button>
            </div>
        }
        </div>
    )
}

export default DayUI