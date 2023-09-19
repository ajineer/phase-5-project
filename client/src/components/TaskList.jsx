function TaskList({list, lists, setLists, current}){

    function deleteList(){
        fetch(`/api/lists/${list.id}`, {
            method: 'DELETE'
        }).then(r => 
            setLists(lists.filter(l => l.id !==list.id))
        )
    }

    return (
        <div className={`flex flex-col bg-light_navy h-[80%] m-5 p-0`}>
            <h2 className="text-center">{list.name}</h2>
            {list.tasks.length > 0?
            <ul className="flex flex-col overflow-y-auto ml-[10%] mt-[5%]">
                {list.tasks.map(t => 
                    <li className='text-xs max-w-[12ch]' key={t.id}>
                        {t.description}
                    </li>)}
            </ul>:null}
            {lists.indexOf(list) === current?
                <button className='mr-auto ml-auto mt-auto bg-stone-600 w-fit text-lg pr-[2px] pl-[2px]' onClick={() => deleteList()}>Delete</button>:null}
        </div>
    )
}

export default TaskList