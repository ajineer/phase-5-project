import React,{ useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



function Login({onLogin}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(false)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault();
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        }).then((r) => {
            if (r.ok){
                r.json().then((user) => 
                {
                    onLogin(user)
                    navigate('/')
                })
                setStatus(true)
            }else{
                r.json().then((err) => (
                    setErrors(err.errors)))
            }
        })
    }

    return (
        <>
            <form className='flex flex-col bg-light_navy w-fit mr-auto ml-auto mt-5 p-10 h-fit' onSubmit={handleSubmit}>
                <h2 className='text-lg'>Login</h2>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />

                <label>Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="ml-auto mr-auto mt-2 w-min pl-4 pr-4 bg-gray-300 hover:bg-white" type="submit">Submit</button>
            </form>
        </>
    )       
}

export default Login