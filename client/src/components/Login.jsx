import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../store'


function Login({setEvents}){
    const { loginForm, setLoginForm, setUser, setLists, lists} = useStore()
    const navigate = useNavigate()

    function handleChange(e){
        const { name, value } = e.target
        setLoginForm({...loginForm, [name]:value})
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginForm),
        }).then((r) => {
            if (r.ok){
                r.json().then((user) => 
                {
                    setEvents(user.events)
                    setUser(user)
                    setLists(user.lists)
                    setLoginForm({username: '', password: ''})
                    navigate('/')
                })
            }
        })
    }

    return (
        <>
            <form className='flex flex-col bg-light_navy w-fit mr-auto ml-auto mt-[10%] p-10 h-fit rounded-xl' onSubmit={handleSubmit}>
                <h2 className='text-lg'>Login</h2>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={loginForm.username}
                    onChange={handleChange}
                    />

                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    value={loginForm.password}
                    onChange={handleChange}
                    />
                <button className="ml-auto mr-auto mt-2 w-min pl-4 pr-4 bg-gray-300 hover:bg-white" type="submit">Submit</button>
            </form>
        </>
    )       
}

export default Login