import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ListUI from './components/ListUI'
import CalendarUI from './components/CalendarUI'
import useStore from './store'
import { NavLink } from 'react-router-dom'
import ListCarousel from './components/ListCarousel'

function App() {
  const { user, setUser, lists, setLists } = useStore()
  const navigate = useNavigate()

    useEffect(() => {
      async function fetchData(){
        const response = await fetch('/api/check_session')
        if (response.ok){
          const data = await response.json() 
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
  <div className="flex flex-col bg-gradient-radial from-white to-mirky_water h-screen font-sans">
    <nav className='flex flex-col bg-white bg-opacity-50 max-h-[20vh]'>
      <svg className='flex justify-center w-[100%] h-[100%] bg-white'>
        <image className='w-[100%] h-[85%]' href="../../public/Logo2.png"/> 
      </svg>
    {user !== null ? 
        <div className='flex flex-row bg-white'>
            <NavLink className='flex justify-center m-auto w-[25vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={"/"} exact='true'>
              Home
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[25vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/lists'}>
              Lists
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[25vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/calendar'}>
              Calendar
            </NavLink>
            <button className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white]' onClick={logout}>Logout</button>
        </div> :
        <div className='flex flex-row bg-white'>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={"/"} exact='true'>
                Home
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/signup'}>
                Sign up
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:bg-mirky_water hover:text-[white] rounded' to={'/login'}>
                Login
            </NavLink>
        </div>}
    </nav>
    <main className='flex justify-center bg-white bg-opacity-50 h-[80vh]'>
      <Routes className="p-2">
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/lists" element={<ListCarousel/>} />
        <Route path="/calendar" element={<CalendarUI user={user} lists={lists}/>} />
      </Routes>
    </main>
  </div>

  )
}

export default App
