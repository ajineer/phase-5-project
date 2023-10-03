import { create } from 'zustand'
import moment from 'moment'

const useStore = create((set)=>({

    // lists
    current: 0,
    setCurrent: (newCurrent) => set({ current: newCurrent }),
    Lform: false,
    setLForm: (newLForm) => set({ Lform: newLForm}),
    lists: [],
    setLists: (newLists) => set({ lists: newLists }),
    listName: '',
    setNewList: (newList) => set({listName: newList}),

    // tasks
    taskDesc: "",
    setTaskDesc: (newTaskDesc) => set({ taskDesc: newTaskDesc}),
    tSearch: "",
    setTsearch: (newTsearch) => set({ tSearch: newTsearch}),
    filteredTasks: [],
    setFilteredTasks: (newFilteredTasks) => set({ filteredTasks: newFilteredTasks }),
    toggleEdit: false,
    setToggleEdit: (newEdit) => set({ toggleEdit: newEdit }),
    
    // user login and signup
    user: null,
    setUser: (newUser) => set({ user: newUser }),
    loginForm: {username:'', password:''},
    setLoginForm: (newLoginForm) => set({ loginForm: newLoginForm}),
    signupForm: {username: '', image: '', email: '', password: '',},
    setSignupForm: (newSignupForm) => set({ signupForm: newSignupForm}),

    // events
    events: [],
    setEvents: (newEvents) => set({ events: newEvents.map(evnt => {
        return {
            resourceId: evnt.id,
            title: evnt.title,
            start: moment(evnt.start).toDate(),
            end: moment(evnt.end).toDate(),
            lists: evnt.lists
        }
    }) }),
    eventForm: {
        name: '',
        date: '',
        start: '', 
        end:'',
    },
    setEventForm: (newEventForm) => set({ eventForm: newEventForm })
}))

export default useStore
