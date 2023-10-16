import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import CalendarUI from './components/CalendarUI'
import useStore from './store'
import ListCarousel from './components/ListCarousel'


function App() {
  const { user, setUser, lists, setLists} = useStore()
  const [events, setEvents] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    async function fetchData(){
      const response = await fetch('/api/check_session')
      if (response.ok){
        const data = await response.json() 
        setEvents(data.events)
        setUser(data)
        setLists(data.lists)
      }else{
        navigate('/')
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
    setLists([])
  }

  return (
    <div className="flex flex-col font-sans h-screen w-screen">
    <svg className='flex items-center bg-white border-2 border-black w-[100%]'>
      <image x='33%' y="7.5%" width='33%' height='85%' href="../../public/Logo2.png"/> 
    </svg>
    <nav className='flex flex-col'>
    {user !== null ? 
        <div className='flex flex-row bg-light_navy'>
            <NavLink className='flex justify-center m-auto w-[25%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={"/"} exact='true'>
              Home
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[25%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/lists'}>
              Lists
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[25%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/calendar'}>
              Calendar
            </NavLink>
            <button className='flex justify-center m-auto w-[25%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white]' onClick={logout}>Logout</button>
        </div> :
        <div className='flex flex-row bg-light_navy'>
            <NavLink className='flex justify-center m-auto w-[33%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={"/"} exact='true'>
                Home
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/signup'}>
                Sign up
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33%] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/login'}>
                Login
            </NavLink>
        </div>}
    </nav>
    <main className='flex justify-center bg-background bg-[length:175%_175%] bg-no-repeat bg-center h-[100%] w-[100%] ml-auto mr-auto mt-10'>
      <Routes className="p-2">
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setEvents={setEvents}/>} />
        <Route path="/lists" element={<ListCarousel/>} />
        <Route path="/calendar" element={<CalendarUI events={events} setEvents={setEvents}/>} />
      </Routes>
    </main>
  </div>
  )
}

export default App
