import { NavLink } from "react-router-dom";


function Nav({user, logout}){

    return (

        user !== null ? 
        <div>
            <h1>Naviation</h1>
            <NavLink to={"/"} exact='true'>
                <span>Home</span>
            </NavLink>
            <NavLink to={'/lists'}>
                <span>Lists</span>
            </NavLink>
            <NavLink to={'/grocery_lists'}>
                <span>Grocery</span>
            </NavLink>
            <NavLink to={'/calendar'}>
                <span>Calendar</span>
            </NavLink>
            <button onClick={logout}>Logout</button>
        </div> :
        <div>
            <h1>Navigation</h1>
            <NavLink to={"/"} exact='true'>
                <span>Home</span>
            </NavLink>
            <NavLink to={'/signup'}>
                <span>Sign up</span>
            </NavLink>
            <NavLink to={'/login'}>
                <span>Sign in</span>
            </NavLink>
        </div>
    )
}

export default Nav