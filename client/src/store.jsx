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
    setEvents: (newEvents) => set({ events: newEvents }),
    focusedEvent: {},
    setFocusedEvent: (newEvent) => set({focusedEvent:{
        resourceId: newEvent.resourceId?newEvent.resourceId:newEvent.id,
        title: newEvent.title,
        start: moment(newEvent.start).toDate(),
        end: moment(newEvent.end).toDate(),
        lists: newEvent.lists
    }})
}))

export default useStore
