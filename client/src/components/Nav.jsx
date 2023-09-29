import { NavLink } from "react-router-dom";


function Nav({user, logout}){

    return (

        user !== null ? 
        <>
            <NavLink className='flex m-auto hover:bg-leafy_green w-[80%] justify-center' to={"/"} exact='true'>
                Home
            </NavLink>
            <NavLink className='flex ml-auto mr-auto hover:bg-leafy_green w-[80%] justify-center' to={'/lists'}>
                Lists
            </NavLink>
            <NavLink className='flex ml-auto mr-auto hover:bg-leafy_green w-[80%] justify-center' to={'/calendar'}>
                Calendar
            </NavLink>
            <button className='flex ml-auto mr-auto mt-[10px] hover:bg-leafy_green w-[80%] justify-center' onClick={logout}>Logout</button>
        </> :
        <>
            <NavLink className='m-auto hover:border-2 border-black rounded w-fit justify-center' to={"/"} exact='true'>
                <span>Home</span>
            </NavLink>
            <NavLink className='m-auto hover:border-2 border-black rounded w-fit justify-center' to={'/signup'}>
                <span>Sign up</span>
            </NavLink>
            <NavLink className='m-auto hover:border-2 border-black rounded w-fit justify-center' to={'/login'}>
                <span>Login</span>
            </NavLink>
        </>
    )
}

export default Nav