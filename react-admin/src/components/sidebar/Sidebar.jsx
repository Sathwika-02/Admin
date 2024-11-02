import React, { useContext } from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link ,useNavigate} from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
const Sidebar = () => {
   const navigate=useNavigate();
    const {dispatch}=useContext(DarkModeContext);
    const role = localStorage.getItem('role');

    const handleLogout = () => {
      // Remove token and role from localStorage and cookies
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      Cookies.remove('token');
      toast.success("Logged out successfully.");
      navigate('/login');
    };
  return (
    <div className='sidebar'>
     <div className="top">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className='logo'>Admin Dashboard</span>
        </Link>
      
     </div>
     <hr/>
     <div className="center">
        {/* <ul> */}
        
            {/* <p className='title'>MAIN</p> 
            <Link to="/" style={{textDecoration:"none"}}>
         <li>
        
            <DashboardIcon className='icon'/>
                <span>Dashboard</span>
                </li>
                </Link>
        
        <p className='title'>LISTS</p>
        <Link to="/users" style={{textDecoration:"none"}}>
            <li> <PersonOutlineOutlinedIcon className='icon'/><span>Users</span></li></Link>
            <p className='title'>ANALYSIS</p>
            <Link to="/status-activechart" style={{textDecoration:"none"}}>
            <li>  <AnalyticsIcon className='icon'/><span>User Active Inactive Analysis</span></li>
            </Link>
            <p className='title'>USEFUL</p>
            <Link to="/status-barchart" style={{textDecoration:"none"}}>
            <li>  <BarChartIcon className='icon'/><span>User Status Bar Chart</span></li>
            </Link>
            <Link to="/status-areachart" style={{textDecoration:"none"}}>
            <li>  <InsertChartIcon className='icon'/><span>User Signups Area Chart</span></li>
            </Link>
            <Link to="/status-bubblechart" style={{textDecoration:"none"}}>
            <li>  <BubbleChartIcon className='icon'/><span>User SignUps Bubble Chart</span></li>
            </Link>
            <Link to="/status-doughnut-piechart" style={{textDecoration:"none"}}>
            <li>  <DonutLargeIcon className='icon'/><span>User SignUps Doughnut & Pie Chart</span></li>
            </Link>
            <Link to="/status-linechart" style={{textDecoration:"none"}}>
            <li>  <ShowChartIcon
             className='icon'/><span>User SignUps Line Chart</span></li>
            </Link>
            <Link to="/status-scatterchart" style={{textDecoration:"none"}}>
            <li>  <ScatterPlotIcon
             className='icon'/><span>User SignUps Scatter Plot</span></li>
            </Link>
            <p className='title'>THEME</p>
        </ul>
     </div> */}
     <ul>
          {role === 'admin' ? (
            <>
              <p className='title'>MAIN</p>
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <li>
                  <DashboardIcon className='icon' />
                  <span>Dashboard</span>
                </li>
              </Link>
              <p className='title'>LISTS</p>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineOutlinedIcon className='icon' />
                  <span>Users</span>
                </li>
              </Link>
              <p className='title'>ANALYSIS</p>
              <Link to="/status-activechart" style={{ textDecoration: "none" }}>
                <li>
                  <AnalyticsIcon className='icon' />
                  <span>User Active Inactive Analysis</span>
                </li>
              </Link>
              <p className='title'>USEFUL</p>
              <Link to="/status-barchart" style={{ textDecoration: "none" }}>
                <li>
                  <BarChartIcon className='icon' />
                  <span>User Status Bar Chart</span>
                </li>
              </Link>
              <Link to="/status-areachart" style={{ textDecoration: "none" }}>
                <li>
                  <InsertChartIcon className='icon' />
                  <span>User Signups Area Chart</span>
                </li>
              </Link>
              <Link to="/status-bubblechart" style={{ textDecoration: "none" }}>
                <li>
                  <BubbleChartIcon className='icon' />
                  <span>User SignUps Bubble Chart</span>
                </li>
              </Link>
              <Link to="/status-doughnut-piechart" style={{ textDecoration: "none" }}>
                <li>
                  <DonutLargeIcon className='icon' />
                  <span>User SignUps Doughnut & Pie Chart</span>
                </li>
              </Link>
              <Link to="/status-linechart" style={{ textDecoration: "none" }}>
                <li>
                  <ShowChartIcon className='icon' />
                  <span>User SignUps Line Chart</span>
                </li>
              </Link>
              <Link to="/status-scatterchart" style={{ textDecoration: "none" }}>
                <li>
                  <ScatterPlotIcon className='icon' />
                  <span>User SignUps Scatter Plot</span>
                </li>
              </Link>
              <p className='title'>THEME</p>
            </>
          ) : (
            <>
              <p className='title'>USER</p>
              <Link to="/userprofile" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineOutlinedIcon className='icon' />
                  <span>Profile</span>
                </li>
              </Link>
            </>
          )}
          <li onClick={handleLogout}>
            <LogoutIcon className='icon' />
            <span>Logout</span>
          </li>
        </ul>
     
      </div>
     
     <div className="bottom">
      
        <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
     </div>

    </div>
  )
}

export default Sidebar
