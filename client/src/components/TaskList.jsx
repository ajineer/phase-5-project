import useStore from "../store"

function TaskList(){

    //list = {lists[idx]} lists={lists} setLists={setLists} current={current}
    const { lists, setLists, current } = useStore()

    function deleteList(){
        fetch(`/api/lists/${lists[current].id}`, {
            method: 'DELETE'
        }).then(r => 
            setLists(lists.filter(l => l.id !==list.id))
        )
    }

    return (
        lists[current]?
        <div className={`flex flex-col bg-light_navy h-[80%] m-5 p-0`}>
            <h2 className="text-center">{lists[current].name}</h2>
            {lists[current].tasks.length > 0?
            <ul className="flex flex-col overflow-y-auto ml-[10%] mt-[5%]">
                {lists[current].tasks.map(t => 
                    <li className='text-xs max-w-[12ch]' key={t.id}>
                        {t.description}
                    </li>)}
            </ul>:null}
            <button className='mr-auto ml-auto mt-auto bg-stone-600 w-fit text-lg pr-[2px] pl-[2px]' onClick={() => deleteList()}>Delete</button>
        </div>:
        <div className={'flex flex-col bg-light_navy h-[80%] m-5 p-0'}>
            <h2>No lists</h2>
        </div>
    )
}

export default TaskList