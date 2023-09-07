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
    <div>
        <HeaderBar />
        <Nav user={user} logout={logout}/>
        <Routes>
          <Route exact path='/' element={ <Home/>}/>
          <Route path='/signup' element={ <Signup/>}/>
          <Route path='/login'  element={ <Login onLogin={setUser}/>}/>
          <Route path='/lists' element={ <ListUI user={user}/>}/>
          <Route path='/grocery_lists' element={ <GroceryUI user={user}/>}/>
          <Route path='/calendar' element={<CalendarUI user={user}/>}></Route>
        </Routes>
    </div>
  )
}

export default App
