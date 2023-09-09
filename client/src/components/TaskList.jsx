function TaskList({list}){

    return (
        list === undefined ? <div className="w-15 h-25 bg-red-700 m-3">________</div> :
        <div className="flex flex-col bg-blue-500 w-50 h-25 m-3 p-0">
            <h2>{list.name}</h2>
            {list.tasks.length === 0? 
            <div className="text-xs">No tasks</div>:
            
            list.tasks.map(task => 
            <div className='flex flex-col p-0 m-0 w-inherit text-xs' key={task.id}>
                <h3>{task.description}</h3>
                <h3>{task.status}</h3>
            </div>)}
        </div>
    )
}

export default TaskList