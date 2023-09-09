function DayUI({selDate, user}){

    const hours = []
    const minutes = []

    for (let hour = 1; hour < 25; hour++){
        if(hour > 12){
            let hourPM = hour-12
            hours.push(`${hourPM.toString()}`)
        }else{
            hours.push(`${hour.toString()}`)
        }
    }

    for(let minute = 0; minute < 60; minute +=15){
            minutes.push(minute.toString().padEnd(2,'0'))
            // const formattedHour = hour.toString().padStart(2, '0')
            // const formattedMinute = minute.toString().padStart(2, '0')
            // times.push(`${formattedHour}:${formattedMinute}`)
        }

    return(
        <div className="overflow-auto mb-5 bg-white">
            <h3>{selDate}</h3>
            <ul>
                {hours.map((hour, index) => 
                <li key={index}>
                    <h3 className="text-s">{index>10 && index<23?`${hour}:00 p.m.`: `${hour}:00 a.m.`}</h3>
                    <ul>
                        {minutes.map((time, index) => 
                        <li className='text-xs' key={index}>{`${hour}:${time}`}</li>)}
                    </ul>
                </li>)}
            </ul>
        </div>
    )
}

export default DayUI