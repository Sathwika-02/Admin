import React, { useContext } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import "./navbar.scss"
import { DarkModeContext } from '../../context/darkModeContext';
const Navbar = () => {
    const {dispatch}=useContext(DarkModeContext)
  return (
    <div className='navbar'>
        <div className="wrapper">
            <div className="search">
                <input type='text' placeholder='Search'/>
                <SearchOutlinedIcon/>
            </div>
            <div className="items">
                <div className="item">
                    <LanguageOutlinedIcon className='icon'/>
                    English
                </div>
                <div className="item">
                    <DarkModeOutlinedIcon className='icon' style={{cursor:"pointer"}}  onClick={()=>dispatch({type:"TOGGLE"})}/>
                </div>
                <div className="item">
                    <FullscreenExitOutlinedIcon className='icon'/>
                </div>
                <div className="item">
                    <NotificationsNoneOutlinedIcon className='icon'/>
                    <div className="counter">1</div>
                </div>
                <div className="item">
                    <ChatBubbleOutlineOutlinedIcon className='icon'/>
                    <div className="counter">2</div>
                </div>
                <div className="item">
                    <ListOutlinedIcon className='icon'/>
                </div>
                <div className="item">
                    <img  src="https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/moon-man-nicholas-ely.jpg"
                    className='avatar'/>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
