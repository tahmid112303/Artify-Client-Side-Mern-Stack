import React, { use } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { AuthContext } from './AuthContext'
import { toast } from 'react-toastify'
import { Moon, Sun } from 'lucide-react'
import artImage from '../Components/Images/arts.png'


const Navbar = () => {
    const navigate = useNavigate()
    const {user,logOut,theme,changeTheme} = use(AuthContext)


    const handleSignOut = () => {
      navigate('/login')
      logOut()
      .then(()=>{
        toast("Signed Out")
      })
      .catch(error=>{
        console.log(error)
      })
    }

    const links = <>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/explore'}>Explore Artworks</NavLink>
        <NavLink to={'/add'}>Add Artwork</NavLink>
        <NavLink to={'/gallery'}>My Gallery</NavLink>
        <NavLink to={'/favorites'}>My Favorites</NavLink>
    </>


  return (
<div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start max-sm:w-50">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          {links}
      </ul>
    </div>
        <div className='flex justify-center items-center gap-2 ml-10 max-sm:ml-2'>
            <p className='text-4xl font-serif font-extrabold max-sm:text-2xl'>Artify</p>
            <img className='w-13 h-13 max-sm:w-9 max-sm:h-9' src={artImage} alt="logo" />
        </div>
  </div>
  <div className="navbar-center hidden lg:flex max-sm:flex-col">
    <ul style={{color: theme === "dark" ? "white" : "#0e56c9"}} className="menu menu-horizontal flex gap-5 text-xl font-bold">
        {links}
    </ul>
  </div>
  <div className="navbar-end">

    {theme === "dark" ? <Sun onClick={changeTheme} className='mr-6 cursor-pointer max-sm:mr-3 '></Sun> : <Moon onClick={changeTheme} className='mr-6 cursor-pointer max-sm:mr-2'></Moon>}

    {user ? <div className="dropdown dropdown-end dropdown-hover mr-10 max-sm:mr-30">
        <div tabIndex={0} role="button" className="m-1 rounded-[50%] w-13 h-13">
          <img className='w-full h-full rounded-[50%] cursor-pointer' 
          src={user?.photoURL} alt="pic" />
          </div>

        <ul tabIndex="-1" style={{background: theme === "dark" ? "white" : "plum", color: theme === "dark" && "black"}} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm font-bold text-[18px]">
          <li><a onClick={()=>navigate('/')}>{user?.displayName}</a></li>
          <li><a onClick={handleSignOut}>Log Out</a></li>
        </ul>
      </div> : <a onClick={()=>navigate('/login')} className="btn btn-primary 
    font-bold mr-10">Sign In</a>}
  </div>
</div>
  )
}

export default Navbar