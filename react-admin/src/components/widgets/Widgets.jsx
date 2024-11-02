import React from 'react'
import "./widgets.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Link } from 'react-router-dom';
const Widgets = ({type}) => {
    let data;
    const amount=100;
    const perc=20;

    switch(type){
        case "user":
            data={
                title:"USERS",
                isMoney:false,
                link:"See all users",
                icon:(
                    <PersonOutlineOutlinedIcon className='icon' style={{color:"crimson",
                        backgroundColor:"rgba(255,0,0,0.2)"
                    }}/>
                ),
                route:"/users"
            }
            break;
            case "active":
            data={
                title:"ACTIVE USERS",
                isMoney:false,
                link:"View Active Users",
                icon:(
                    <Inventory2OutlinedIcon className='icon' style={{
                        color:"goldenrod",
                        backgroundColor:"rgba(218,165,32,0.2)"
                    }}/>
                ),
                 route: "/users/active"
            }
            break;
            case "inactive":
            data={
                title:"INACTIVE USERS",
                isMoney:true,
                link:"View Inactive Users",
                icon:(
                    <MonetizationOnOutlinedIcon className='icon' style={{
                        color:"green",
                        backgroundColor:"rgba(0,128,0,0.2)"
                    }}/>
                ),
                route: "/users/inactive"
            }
            break;
            case "recentsignups":
            data={
                title:"View Recent signups",
                isMoney:true,
                link:"See details",
                icon:(
                    <AccountBalanceWalletOutlinedIcon className='icon'
                    style={{backgroundColor:"rgba(128,0,128,0.2)",
                        color:"purple"
                    }}
                    />
                ),
                route: "/users/recent-signups"
            }
            break;
        default:
            break;
    }
  return (
    <div className='widget'>
      <div className="left"><span className="title">
        {data.title}
        
      </span>
      <span className="counter">{data.isMoney && "$"}{amount}</span>
      <Link to={data.route} className='routes'>
      <span className='link'>{data.link}</span>
      </Link>

      </div>
      <div className="right">
        <div className="percentage positive">
         <KeyboardArrowUpOutlinedIcon/>
          {perc}%
        </div>
        {/* <PersonOutlineOutlinedIcon className='icon'/> */}
        {data.icon}

      </div>
    </div>
  )
}

export default Widgets
