import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import useStore from '../store';
import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';


function CalendarUI({events, setEvents}){

    const { lists, focusedEvent, setFocusedEvent } = useStore()
    const localizer = momentLocalizer(moment);
    const DnDCalendar = withDragAndDrop(Calendar);
    const [view, setView] = useState('week');
    const [eventView, setEventview] = useState(false)
    const [calEvents, setCalEvents] = useState([])
    const [selectDate, setSelectDate] = useState(null)

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
        .then((data) => setEvents((prev) => [...prev, data]))
    };

    function handleDelete(evnt){
        fetch(`/api/events/${evnt.event.resourceId}`, {
        method: 'DELETE',
        });
        setCalEvents(calEvents.filter(e => e.resourceId !== evnt.event.resourceId))
        setFocusedEvent({
            resourceId: '',
            title: '',
            start: '',
            end: '',
            lists: []
        })
        setEventview(false)
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
                const uEidx = updateEvents.findIndex(evnt => evnt.id === patchEvent.id)
                updateEvents[uEidx] = data
                setEvents(updateEvents)
            })
    };

    const onSelectEvent = event => { 
        const newTitle = window.prompt(event.title)
        console.log(newTitle)
        if(newTitle){
            event.title = newTitle
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
            const uEidx = updateEvents.findIndex(event => event.resourceId === focusedEvent.resourceId)
            updateEvents[uEidx] = data
            setEvents(updateEvents)
        })
    }

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
            const uEidx = updateEvents.findIndex(event => event.resourceId === focusedEvent.resourceId)
            updateEvents[uEidx] = data
            setEvents(updateEvents)
        })
    }

    useEffect(()=>{
        setCalEvents(events.map((evnt) => {
            return {
                resourceId: evnt.id,
                title: evnt.title,
                start: moment(evnt.start).toDate(),
                end: moment(evnt.end).toDate(),
                lists: evnt.lists
            }
        }))
    },[events, setEvents])

    const components = {
        event: (evnt) => {
        return (
            view==='agenda'?
            <div className='flex'>
                <p>{evnt.event.title}</p>
                <div className='flex ml-auto'>
                    <button className='mr-1 pl-1 pr-1 bg-gray-400 hover:bg-white' onClick={()=>{setEventview(true), setFocusedEvent(evnt.event)}}>view</button>
                    <button className='bg-red-600 hover:bg-red-300 p-1' onClick={() => handleDelete(evnt)}>X</button>
                </div>
            </div>:
            <p className='text-[10px]'>{evnt.event.title}</p>
        );
        },
    };

    return (
            <div className='h-[100%] w-[100%]'>
                <DnDCalendar
                    onView={(currentView) => setView(currentView)}
                    onEventDrop={(updatedEvent) => handleUpdateEvent(updatedEvent)}
                    onSelectSlot={handleSelectSlot}
                    onEventResize={(updatedEvent) => handleUpdateEvent(updatedEvent)}
                    onDoubleClickEvent={onSelectEvent}
                    onNavigate={(date, view) => setSelectDate(date)}
                    date={selectDate}
                    view={view}
                    localizer={localizer}
                    events={calEvents}
                    components={components}
                    selectable={true}
                    toolbar={[]}
                    startAccessor='start'
                    endAccessor='end'
                    style={{backgroundColor:'white', height: '60%', width: '60%', marginLeft:'auto', marginRight:'auto', marginTop:'auto', marginBottom:'auto', border:'solid black 2px' }}
                />
                {view === 'agenda' && eventView && 
                    <div className='grid grid-cols-3 gap-1 bg-light_navy h-[25%] w-[60%] ml-auto mr-auto'>
                        <p className='flex flex-col bg-white pl-1 w-[100%] h-[100%] p-1'>
                            <span className='w-fit'>
                                Title: {focusedEvent?.title}
                            </span>
                            <span>
                                Time: {String(moment(focusedEvent?.start).format("hh:mm a"))} - {String(moment(focusedEvent?.end).format("hh:mm a"))}
                            </span>
                        </p>
                        <ul className='flex flex-col bg-white overflow-y-scroll p-1'>
                            <p className='bg-yellow-200'>lists to complete</p>
                            {focusedEvent.lists && focusedEvent.lists.length > 0 &&
                                focusedEvent.lists.map(list => 
                                <li className='flex flex-row h-min m-1 border-2 border-black' key={list.id}>
                                    <span className='mr-auto'>
                                        {list.name}
                                    </span>
                                    <button className='ml-auto pr-1 pl-1 bg-gray-400 hover:bg-gray-200' onClick={() => removeList(list)}>-</button>
                                </li>
                                )
                            }
                        </ul>
                        <ul className='flex flex-col bg-white overflow-y-scroll p-1'>
                            <p className='pl-1 bg-violet text-white'>add a list</p>
                            {lists && lists.length>0 &&
                                lists.filter((list)=> !focusedEvent.lists?.some((eventList)=>eventList.id === list.id)).map(list => (
                                <li className='flex flex-row h-min m-1 border-2 border-black' key={list.id}>
                                    <span className='mr-auto'>
                                        {list.name}
                                    </span>
                                    <button className='ml-auto pl-1 pr-1 bg-gray-200 hover:bg-white' onClick={()=>(addList(list))}>+</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
    );
    };

    export default CalendarUI;
