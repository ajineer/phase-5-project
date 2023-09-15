import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ListUI from './components/ListUI'
import CalendarUI from './components/CalendarUI'


function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

    useEffect(() => {
      async function fetchData(){
        const response = await fetch('/api/check_session')
        if (response.ok){
          const data = await response.json() 
          setUser(data)
        }
      }
      fetchData()
    },[])

    function logout(){
      setUser(null)
      fetch('/api/logout', {
        method: 'DELETE'
      })
      navigate('/')
    }

  return (
  <div className="grid grid-rows-[1fr, 4fr, 1fr] grid-cols-[1fr, 5fr] bg-gradient-radial from-white to-mirky_water gap-2 h-screen">
    <header className='flex justify-center row-start-1 row-end-1 col-start-1 col-end-6 h-[19vh] w-[100%] bg-white bg-opacity-50'>
      <HeaderBar/>
    </header>
    <nav className='flex flex-col col-start-1 col-end-1 row-start-2 row-end-6  h-[79vh] w-[200px] bg-white bg-opacity-50'>
      <Nav user={user} logout={logout} />
    </nav>
    <main className='flex justify-self-center col-start-2 col-end-6 row-start-2 row-end-6 h-[79vh] w-[80vw] bg-white bg-opacity-50'>
      <Routes className="p-2">
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/lists" element={user === null ? <h2>...loading</h2> : <ListUI user={user} />} />
        <Route path="/calendar" element={<CalendarUI user={user} />} />
      </Routes>
    </main>
  </div>

  )
}

export default App
