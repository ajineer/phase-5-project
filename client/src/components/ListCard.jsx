function ListCard({list}){

    return (
        list == undefined ? <span>No list</span> :
        <div>
            <h2>{list.name}</h2>
            {list.grocery_items.length === 0? 
            <div>No grocery items</div>:
            <div>
                {list.grocery_items.map(gitem => 
                <div key={gitem.id}>
                    <h3>{gitem.name}</h3>
                    <h3>{gitem.price}</h3>
                </div>)}
            </div>}
        </div>
    )
}

export default ListCard