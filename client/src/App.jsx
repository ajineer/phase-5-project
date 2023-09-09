import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HeaderBar from './components/HeaderBar'
import Nav from './components/Nav'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import ListUI from './components/ListUI'
import GroceryUI from './components/GroceryUI'
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
    <div className='grid grid-rows-5 grid-cols-5-[1fr] bg-red-200 gap-2 h-screen'>
        <div className='flex items-center justify-center text-5xl col-start-1 col-span-6 bg-stone-500 mt-2 ml-2 mr-2'>
          <HeaderBar />
        </div>
        <div className='flex flex-col row-start-2 row-span-3 bg-stone-500 ml-2'>
          <Nav user={user} logout={logout}/>
        </div>
        <section className='flex justify-center col-start-2 col-span-5 row-start-2 row-end-6 bg-orange-300 mb-2 mr-2'>
          <Routes>
            <Route exact path='/' element={ <Home/>}/>
            <Route path='/signup' element={ <Signup/>}/>
            <Route path='/login'  element={ <Login onLogin={setUser}/>}/>
            <Route path='/lists' element={ <ListUI user={user}/>}/>
            <Route path='/calendar' element={<CalendarUI user={user}/>}></Route>
          </Routes>
        </section>
    </div>
  )
}

export default App
