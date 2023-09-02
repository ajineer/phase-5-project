import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'


function App() {
  const [user, setUser] = useState(null)

    useEffect(() => {
      async function fetchData(){
        const response = await fetch('/check_session')
        const data = await response.json()
        if (data.ok){
          data.json().then(user => setUser(user))
        }
      }
      fetchData()
    },[])

    function logout(){
      setUser(null)
      fetch('/logout', {
        method: 'DELETE'
      })
    }

  return (
    <div>
        <HeaderBar />
        <Nav user={user} logout={logout}/>
        <Routes>
          <Route exact path='/' element={ <Home/>}/>
          <Route path='/signup' element={ <Signup/>}/>
          <Route path='/login'  element={ <Login onLogin={setUser}/>}/>
        </Routes>
    </div>
  )
}

export default App
