import { create } from 'zustand'

const useStore = create((set)=>({
    user: null,
    setUser: (newUser) => set({ user: newUser }),
    Lists: [],
    setLists: (newLists) => set({ Lists: newLists }),
    loginForm: {username:'', password:''},
    setLoginForm: (newLoginForm) => set({ loginForm: newLoginForm}),
    signupForm: {username: '', image: '', email: '', password: '',},
    setSignupForm: (newSignupForm) => set({ signupForm: newSignupForm})
}))

export default useStore