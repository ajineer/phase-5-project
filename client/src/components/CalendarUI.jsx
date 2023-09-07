import Calendar from 'react-calendar'
import { useState, useEffect } from 'react'
import Day from './day'
import DayUI from './DayUI'


function CalendarUI({user}){

    const [selDate, setSelDate] = useState(new Date())
    const [selDay, setDay] = useState(null)
    const [days, setDays] = useState([])

    useEffect(()=>{
        if (user && user.days){
            setDays(user.days)
            setDay(user.days[0])
        }
    },[user])

    if (!user || !user.days){
        return <div>Loading...</div>
    }

    return(
        <div>
            <Calendar 
                onClickDay={(e) => {
                    setSelDate(e.toDateString())
                    const selectedDay = days.find(d => d.date === e.toDateString())
                    setDay(selectedDay || null)}}
                onChange={setSelDate}
                tileContent={days.length!==0?
                ({date}) => (days.map(day => (date.toDateString() === day.date ?
                    <Day key={day.id} day={day}/>:
                    null))):
                null}/>
            <DayUI days={days} setDays={setDays} selDay={selDay} selDate={selDate} user={user}/>
        </div>
    )
}

export default CalendarUI