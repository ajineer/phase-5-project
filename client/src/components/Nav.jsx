import { NavLink } from "react-router-dom";


function Nav({user, logout}){

    return (

        user !== null ? 
        <>
            <h1>Navigation</h1>
            <NavLink className="ml-4" to={"/"} exact='true'>
                Home
            </NavLink>
            <NavLink to={'/lists'}>
                Lists
            </NavLink>
            <NavLink to={'/calendar'}>
                Calendar
            </NavLink>
            <button onClick={logout}>Logout</button>
        </> :
        <>
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
        </>
    )
}

export default Nav