import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import useStore from '../store';
import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';


function CalendarUI(){

    const { events, setEvents, lists, focusedEvent, setFocusedEvent } = useStore()
    const localizer = momentLocalizer(moment);
    const DnDCalendar = withDragAndDrop(Calendar);
    const [view, setView] = useState('week');
    //const [focusedEvent, setFocusedEvent] = useState({})
    const [eventView, setEventview] = useState(false)

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

    function handleDelete(evnt){
        fetch(`/api/events/${evnt.event.resourceId}`, {
        method: 'DELETE',
        });
        setEvents(events.filter((e) => e.resourceId !== evnt.event.resourceId));
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

    function addList(list){
        fetch(`/api/events/${focusedEvent.resourceId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: focusedEvent.title,
                start: focusedEvent.start,
                end: focusedEvent.end,
                list_id: list.id,
                action:'add'
            })
        }).then(r => r.json())
        .then(data => {
            setFocusedEvent(data)
            const updateEvents = [...events]
            const uEidx = updateEvents.findIndex(event => event.resourceId === focusedEvent.event.resourceId)
            updateEvents[uEidx] = data
            setEvents(updateEvents)
        })
    }

    useEffect(() => {
        //console.log(focusedEvent.event)
    },[focusedEvent])

    function removeList(list){
        fetch(`/api/events/${focusedEvent.resourceId}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: focusedEvent.title,
                start: focusedEvent.start,
                end: focusedEvent.end,
                list_id: list.id,
                action: 'remove',
            })
        }).then(r => r.json())
        .then(data => {
            setFocusedEvent(data)
            const updateEvents = [...events]
            const uEidx = updateEvents.findIndex(event => event.resourceId === focusedEvent.event.resourceId)
            updateEvents[uEidx] = data
            setEvents(updateEvents)
        })
    }

    const components = {
        event: (evnt) => {
        return (
            view==='agenda'?
            <div className='flex'>
                <p>{evnt.event.title}</p>
                <div className='flex ml-auto'>
                    <button onClick={()=>{setEventview(true), setFocusedEvent(evnt.event)}}>view</button>
                    <button className='bg-red-600 p-1' onClick={() => handleDelete(evnt.event)}>X</button>
                </div>
            </div>:
            <p className='text-[10px]'>{evnt.event.title}</p>
        );
        },
    };

    return (
            <div>

                <DnDCalendar
                    onView={(currentView) => setView(currentView)}
                    onEventDrop={(updatedEvent) => handleUpdateEvent(updatedEvent)}
                    onSelectSlot={handleSelectSlot}
                    onEventResize={(updatedEvent) => handleUpdateEvent(updatedEvent)}
                    onDoubleClickEvent={onSelectEvent}
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
                {view === 'agenda' && eventView && 
                    <div className='flex bg-light_navy h-[25%]'>
                        <p>
                            {focusedEvent?.title}
                        </p>
                        <p className='ml-auto mr-auto'>lists to complete: 
                            <ul>
                                {focusedEvent.lists && focusedEvent.lists.length > 0 &&
                                    focusedEvent.lists.map(list => 
                                        <li key={list.id}>
                                            {list.name}<button onClick={() => removeList(list)}>remove</button>
                                        </li>
                                        )
                                }
                            </ul>
                        </p>
                        {lists && lists.length>0 &&
                            lists.filter((list)=> !focusedEvent.lists.some((eventList)=>eventList.id === list.id)).map(list => (
                            <li className='flex flex-row h-min' key={list.id}>
                                {list.name}
                                <button className='ml-auto bg-gray-200 hover:bg-white' onClick={()=>(addList(list))}>Add list</button>
                            </li>
                        ))}
                    </div>
                }
            </div>
    );
    };

    export default CalendarUI;
