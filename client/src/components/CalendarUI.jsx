import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import useStore from '../store'
import moment from 'moment'
import { useCallback, useMemo } from 'react'

const CalendarUI = (props) => {

    const { user, events, setEvents, eventForm, setEventForm } = useStore()
    const localizer = momentLocalizer(moment)
    const DnDCalendar = withDragAndDrop(Calendar)

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New event name')
            if (title){
                const newEvent = {
                    title: title,
                    start: start,
                    end: end
                }
                fetch('/api/events',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify(newEvent)
                }).then(r => r.json())
                .then(data => {
                    setEvents([...events, data])})
            }
        },[setEvents, events]
    )

    function handleDelete(props){
        fetch(`/api/events/${props.event.id}`,{
            method: 'DELETE'
        })
        setEvents(events.filter(evnt => evnt.id !== props.event.id))
    }


    const components = {
        event: (props) => {
            console.log(props)
            return (
            <div className='flex text-xs'>
                <h5>{props.title}</h5>
                <button onClick={() => handleDelete(props)}>X</button>
            </div>)
        }
    }

    return(
        <DnDCalendar 
            withDragAndDrop
            localizer={localizer}
            startAccessor='start'
            endAccessor='end'
            events={events}
            onSelectSlot={handleSelectSlot}
            selectable
            components={components}
            style={{ height: 500}}
        />
    )
}

export default CalendarUI