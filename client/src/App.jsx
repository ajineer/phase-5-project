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

function App() {
  // const [user, setUser] = useState(null)
  const { user, setUser } = useStore()
  const navigate = useNavigate()
  const [lists, setLists] = useState([])

  useEffect(()=>{
    if(user && user.lists.length>0){
        setLists(user.lists)
    }
    },[user])

    useEffect(() => {
      async function fetchData(){
        const response = await fetch('/api/check_session')
        if (response.ok){
          const data = await response.json() 
          setUser(data)
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
    }

  return (
  <div className="flex flex-col bg-gradient-radial from-white to-mirky_water gap-2 h-screen font-sans">
    <nav className='flex flex-col bg-white bg-opacity-50 max-h-[20vh]'>
      <svg className='flex justify-center w-[100%] h-[100%] border-2 border-black bg-white'>
        <image className='w-[100%] h-[85%]' href="../../public/Logo2.png"/> 
      </svg>
    {user !== null ? 
        <div className='flex flex-row'>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:border-black rounded' to={"/"} exact='true'>
              Home
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:border-black rounded' to={'/signup'}>
              Lists
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:border-black rounded' to={'/login'}>
              Calendar
            </NavLink>
            <button className='flex ml-auto mr-auto mt-[10px] hover:bg-leafy_green w-[80%] justify-center' onClick={logout}>Logout</button>
        </div> :
        <div className='flex flex-row'>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:border-black rounded' to={"/"} exact='true'>
                Home
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:border-black rounded' to={'/signup'}>
                Sign up
            </NavLink>
            <NavLink className='flex justify-center m-auto w-[33vw] bg-light_navy border-2 border-light_navy hover:border-black rounded' to={'/login'}>
                Login
            </NavLink>
        </div>}
    </nav>
    <main className='flex bg-white bg-opacity-50 h-[80vh]'>
      <Routes className="p-2">
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/lists" element={<ListUI user={user} lists={lists} setLists={setLists}/>} />
        <Route path="/calendar" element={<CalendarUI user={user} lists={lists}/>} />
      </Routes>
    </main>
  </div>

  )
}

export default App
