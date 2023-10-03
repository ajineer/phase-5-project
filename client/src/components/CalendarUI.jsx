import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import useStore from '../store';
import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';

function CalendarUI(){

    const { events, setEvents, lists } = useStore()
    const localizer = momentLocalizer(moment);
    const DnDCalendar = withDragAndDrop(Calendar);
    const [view, setView] = useState('week');

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
        const title = window.prompt('New event name');
        if (title) {
            const newEvent = {
            title: title,
            start: start,
            end: end,
            };
            createEvent(newEvent);
        }
        },
        [setEvents]
    );

    const createEvent = (newEvent) => {
        fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
        })
        .then((r) => r.json())
        .then((data) => {
            setEvents([...events, data]);
        });
    };

    const handleDelete = (evnt) => {
        console.log('delete: ', evnt.event)
        const resourceId = evnt.event.resourceId;
        deleteEvent(resourceId);
    };

    const deleteEvent = (resourceId) => {
        fetch(`/api/events/${resourceId}`, {
        method: 'DELETE',
        });
        setEvents(events.filter((evnt) => evnt.resourceId !== resourceId));
    };

    const handleUpdateEvent = (updatedEvent) => {
        const patchEvent = {
            id: updatedEvent.event.resourceId,
            title: updatedEvent.event.title,
            start: updatedEvent.start,
            end: updatedEvent.end,
            action: ''
        }
        fetch(`/api/events/${patchEvent.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchEvent),
        }).then(r => r.json())
        .then(data => {
            const updateEvents = [...events]
            const uEidx = updateEvents.findIndex(evnt => evnt.resourceId === patchEvent.id)
            updateEvents[uEidx] = data
            setEvents(updateEvents)
        })
    };

    const onSelectEvent = event => { 
        const newTitle = window.prompt(event.title)
        event.title = newTitle
        if(newTitle){
            fetch(`/api/events/${event.resourceId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...event, action:''}),
            }).then(r => r.json())
            .then(data => {
                const updateEvents = [...events]
                const uEidx = updateEvents.findIndex(evnt => evnt.resourceId === event.resourceId)
                updateEvents[uEidx] = data
                setEvents(updateEvents)
            })
        }
    }

    function addList(evnt, list){
        fetch(`/api/events/${evnt.event.resourceId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: evnt.event.title,
                start: evnt.start,
                end: evnt.end,
                list_id: list.id,
                action:'add'
            })
        }).then(r => r.json())
        .then(data => {
            const updateEvents = [...events]
                const uEidx = updateEvents.findIndex(event => event.resourceId === evnt.resourceId)
                updateEvents[uEidx] = data
                setEvents(updateEvents)
        })
    }

    const components = {
        event: (evnt) => {
            console.log(evnt)
        return (
            view==='agenda'?
            <div className='flex'>
                <p>{evnt.event.title}, Lists: </p>
                <ul>
                    {evnt.event.lists?.map(list => 
                        <li>
                            {list.name}
                        </li>
                        )}
                </ul>
                <div className='flex ml-auto'>
                    <button className='bg-red-600 p-1' onClick={() => handleDelete(evnt)}>X</button>
                </div>
                {view==='agenda' &&(
                lists.length > 0?
                <ul>
                    {lists.map(list => 
                        <li>{list.name} <button onClick={() => addList(evnt, list)}>add</button></li>    
                        )}
                </ul>:
                <p>No lists to add</p>
                )
            }
            </div>:
            <p className='text-[10px]'>{evnt.event.title}</p>
        );
        },
    };

    return (
            <DnDCalendar
            onView={(currentView) => setView(currentView)}
            onEventDrop={(updatedEvent) => handleUpdateEvent(updatedEvent)}
            onSelectSlot={handleSelectSlot}
            onEventResize={(updatedEvent) => handleUpdateEvent(updatedEvent)}
            onDoubleClickEvent={onSelectEvent}
            on
            view={view}
            localizer={localizer}
            events={events}
            components={components}
            toolbar={[]}
            startAccessor='start'
            endAccessor='end'
            selectable
            style={{ height: 500 }}
            />
    );
    };

    export default CalendarUI;
