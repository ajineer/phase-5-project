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
        fetch('/login', {
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
                    navigate('/home')
                })
                setStatus(true)
            }else{
                r.json().then((err) => (
                    setErrors(err.errors)))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>
        </form>
    )       
}

export default Login