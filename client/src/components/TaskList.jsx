function TaskList({list}){

    return (
        list === undefined? 
        <div className="w-15 h-25 bg-red-700 m-3">______</div> :
        <div className={`flex flex-col bg-blue-500 w-[100px] h-[25px] m-3 p-0`}>
            <h2 className="text-center">{list.name}</h2>
        </div>
    )
}

export default TaskList