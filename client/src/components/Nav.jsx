import { NavLink } from "react-router-dom";


function Nav({user, logout}){

    return (

        user !== null ? 
        <div>
            <h1>Naviation</h1>
            <NavLink to={"/"} exact>
                <span>Home</span>
            </NavLink>
            <button onClick={logout}>Logout</button>
        </div> :
        <div>
            <h1>Navigation</h1>
            <NavLink to={"/"}>
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