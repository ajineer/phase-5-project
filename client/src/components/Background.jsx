function Background(){

    const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

    return(
        <div className="flex bg-gradient-radial from-mirky_water to-light_navy h-screen w-screen">
            <div className="absolute w-fit h-fit -rotate-90 text-5xl translate-x-[835px] translate-y-[240px] z-10 text-violet">{`\u2710`}</div>
            <div className="absolute grid grid-cols-7 grid-rows-5 gap-4 bg-gray-300 p-4 rounded-xl h-[65%] w-[65%] ml-[20%] -skew-y-12 mt-40 z-0 shadow-[-15px_-35px_60px_-15px_rgba(0,0,0,0.3)]">
                <h2 className="flex justify-center items-center bg-light_navy bg-opacity-50 border-2 border-mirky_water"></h2>
                {days.map(int => {
                    return(
                        <div className="flex flex-col bg-white border-2 border-black text-3xl ">
                            <div className="w-[15%] h-[15%] border-2 border-gray-300 self-start mr-auto text-xs">
                                {int}
                            </div>
                            {int===19 || int === 2 || int === 29?
                                <ul className="text-xs border-2 border-gray-300 w-fit m-2">
                                    <li>
                                        <span className="mr-2">
                                            __________
                                        </span>
                                        <span className="ml-auto">
                                            {`\u2611`}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="mr-2">
                                            _______
                                        </span>
                                        <span className="ml-auto">
                                            {`\u2610`}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="mr-2">
                                            __________
                                        </span>
                                        <span className="ml-auto">
                                            {`\u2611`}
                                        </span>
                                    </li>
                                    <li>
                                        <span className="mr-2">
                                            _______
                                        </span>
                                        <span className="ml-auto">
                                            {`\u2610`}
                                        </span>
                                    </li>
                                </ul>
                            :null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Background