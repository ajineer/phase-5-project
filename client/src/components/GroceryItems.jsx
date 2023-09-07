function GroceryItems({setSelList, selList}){

    function handleDelete(item){
        fetch(`/api/grocery_item/${item.id}`,{
            method: 'DELETE'
        })
        setSelList({...selList, grocery_items:[...selList.grocery_items].filter(gitem => gitem.id !== item.id)})
    }

    return (
        selList === undefined ? <span>No list</span> :
        <div>
            <h2>{selList.name}</h2>
            {selList.grocery_items.length === 0? 
            <div>No grocery items</div>:
            <div>
                {selList.grocery_items.map(gitem => 
                <div key={gitem.id}>
                    <h3>{gitem.name}</h3>
                    <h3>{gitem.price}</h3>
                    <img height='75' width='75'src={gitem.image}/>
                    <div>
                        <button onClick={() => handleDelete(gitem)}>Delete</button>
                    </div>
                </div>)}
            </div>}
        </div>
    )
}

export default GroceryItems