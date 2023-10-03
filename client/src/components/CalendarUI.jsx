import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import useStore from '../store';
import moment from 'moment';
import { useState, useCallback, useEffect } from 'react';

function CalendarUI(){

    const { events, setEvents } = useStore()
    const [calEvents, setCalEvents] = useState([])
    const localizer = momentLocalizer(moment);
    const DnDCalendar = withDragAndDrop(Calendar);
    const [view, setView] = useState('month');

    useEffect(()=>{
        setCalEvents(events.map(evnt => {
            return {
                resourceId: evnt.resourceId,
                title: evnt.title,
                start: moment(evnt.start).toDate(),
                end: moment(evnt.end).toDate(),
                isDraggable: true,
                isResizable: false,
                isAllDay: false
            }
        }))
    },[events])

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
        console.log('delete: ', evnt)
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
        console.log(updatedEvent)
        const resourceId = updatedEvent.event.resourceId;
        updateEvent(resourceId, updatedEvent);
    };

    const updateEvent = (resourceId, updatedEvent) => {
        const currentEvents = [...events];
        const currentEidx = currentEvents.findIndex(
        (evnt) => evnt.resourceId === resourceId
        );
        currentEvents[currentEidx].start = updatedEvent.start;
        currentEvents[currentEidx].end = updatedEvent.end;
        setEvents(currentEvents);
        fetch(`/api/events/${resourceId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedEvent.event, action: '' }),
        });
    };

    const components = {
        event: (evnt) => {
        return (
            <div className='flex text-xs'>
            <h5>{evnt.title}</h5>
            <button onClick={() => handleDelete(evnt)}>X</button>
            </div>
        );
        },
    };

    return (
        <DnDCalendar
        view={view}
        onView={(currentView) => setView(currentView)}
        onEventDrop={(updatedEvent) => handleUpdateEvent(updatedEvent)}
        draggableAccessor={(event) => event.isDraggable}
        resizable={(event) => event.isResizable}
        allDayAccessor={(event)=> event.isAllDay}
        localizer={localizer}
        startAccessor='start'
        endAccessor='end'
        events={calEvents}
        onSelectSlot={handleSelectSlot}
        components={components}
        selectable
        style={{ height: 500 }}
        toolbar={[]}
        />
    );
    };

    export default CalendarUI;
