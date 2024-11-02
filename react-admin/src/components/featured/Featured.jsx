import React,{useState,useEffect} from 'react'
import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import axios from 'axios';
const Featured = () => {
    const [signups, setSignups] = useState(0);
    const [target, setTarget] = useState(10);
    const [monthGrowth, setMonthGrowth] = useState(null);
    const [yearGrowth, setYearGrowth] = useState(null);
  
    useEffect(() => {
      const fetchSignups = async () => {
        try {
            if(localStorage.getItem('role')==='admin'){
          const response = await axios.get('http://localhost:5000/api/admin/user-stats');
          const { currentMonthSignups, lastMonthSignups, lastYearSignups } = response.data;

        setSignups(currentMonthSignups);

          
          
            // Calculate month-over-month growth
            const monthGrowthValue = lastMonthSignups > 0 
            ? ((currentMonthSignups - lastMonthSignups) / lastMonthSignups) * 100
            : 0;  
  
          // Calculate year-over-year growth
          const yearGrowthValue = lastYearSignups > 0 
            ? ((currentMonthSignups - lastYearSignups) / lastYearSignups) * 100
            : 0;  // Set to 0 if last year signups are 0

      setMonthGrowth(monthGrowthValue?.toFixed(1));
      setYearGrowth(yearGrowthValue?.toFixed(1));
            }
        } catch (error) {
          console.error('Error fetching signup data:', error);
        }
      };
  
      fetchSignups();
    }, []);
  
    const percentage = ((signups / target) * 100).toFixed(1);
    
   
  return (
    <div className='featured'>
    <div className="top">
<h1 className="title">Monthly Signup Progress</h1>
<MoreVertIcon fontSize='small'/>
    </div>
    <div className="bottom">
        <div className="featuredChart">
             <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5}/>
        </div>
        <p className="title">New Signups This Month</p>
        <p className="amount">{signups}</p>
        <p className="desc">This reflects the signup progress towards the monthly target.</p>
     <div className="summary">
        <div className="item">
        <div className="itemTitle">Target Signups</div>
        <div className="itemResult positive">
            {/* <KeyboardArrowUpOutlinedIcon fontSize='small'/> */}
            <CrisisAlertIcon fontSize='small'/>
            <div className="resultAmount">{target}</div>
        </div>
        </div>
        <div className="item">
            <div className="itemTitle">Month Growth</div>
            <div className={`itemResult ${monthGrowth >= 0 ? 'positive' : 'negative'}`}>
              {monthGrowth >= 0 ? <KeyboardArrowUpOutlinedIcon fontSize='small' /> : <KeyboardArrowDownIcon fontSize='small' />}
              <div className="resultAmount">
                {monthGrowth !== null ? `${monthGrowth}%` : "N/A"}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Year Growth</div>
            <div className={`itemResult ${yearGrowth >= 0 ? 'positive' : 'negative'}`}>
              {yearGrowth >= 0 ? <KeyboardArrowUpOutlinedIcon fontSize='small' /> : <KeyboardArrowDownIcon fontSize='small' />}
              <div className="resultAmount">
                {yearGrowth !== null ? `${yearGrowth}%` : "N/A"}
              </div>
            </div>
          </div>
        </div>
        
    </div>
    </div>
  )
}

export default Featured
