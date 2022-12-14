import { Link, NavLink } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";
import CribIcon from '@mui/icons-material/Crib';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
export function AppHeader() {
    const user = useSelector(state => state.userReducer.user)
    const[isOpenNavbar,setIsOpenNavbar]=useState(false)
    return <div className="app-header">
       <div className="menu" onClick={()=>setIsOpenNavbar(!isOpenNavbar)}>
         <MenuIcon sx={{ fontSize: 50 }}/>
        </div>
       {isOpenNavbar&& <div className="background" onClick={()=>setIsOpenNavbar(!isOpenNavbar)}>
        </div>}
        <div  onClick={()=>setIsOpenNavbar(!isOpenNavbar)} className={isOpenNavbar? "nav-bar open" :"nav-bar"} >
            <NavLink  className='login' to='login'  > {user ? <span><h4>התנתק</h4> <LogoutIcon /></span> : <span><h4>התחבר</h4> <LoginIcon /></span>}</NavLink>
            <NavLink className='login information ' to='information'  > <h4>מידע להורים</h4> <HelpCenterIcon /></NavLink>
            {user?.isAdmin && <NavLink className='login pagita ' to='pagita'  > <h4>איזור מנהל</h4> <PersonIcon /></NavLink>}
            {/* {!user.isAdmin && <NavLink className='login personal ' to='/'  > <h4> איזור אישי</h4> <CribIcon /></NavLink>} */}
            <NavLink className='login personal-navbar ' to='personal'  > <h4> איזור אישי</h4> <CribIcon /></NavLink>
            <NavLink className='login homepage ' to='/'  > <h4> דף הבית</h4> <HomeIcon /></NavLink>
        </div>
        <Link to='' className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/he/thumb/7/71/Barzilai.svg/250px-Barzilai.svg.png" alt="" />
        </Link>
    </div>
}