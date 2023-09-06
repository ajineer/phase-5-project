function GroceryItems({list}){

    console.log(list)
    return (
        list === undefined ? <span>No list</span> :
        <div>
            <h2>{list.name}</h2>
            {list.grocery_items.length === 0? 
            <div>No grocery items</div>:
            <div>
                {list.grocery_items.map(gitem => 
                <div key={gitem.id}>
                    <h3>{gitem.name}</h3>
                    <h3>{gitem.price}</h3>
                    <img height='75' width='75'src={gitem.image}/>
                </div>)}
            </div>}
        </div>
    )
}

export default GroceryItems