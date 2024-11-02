import React,{useState,useEffect} from 'react'
import './Home.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import List from '../../components/table/Table'
import axios from 'axios';


const Home = () => {
  const [monthlySignups, setMonthlySignups] = useState([]);

  useEffect(() => {
    const fetchSignupsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/user-stats');
        
        // Extract monthly signups for the last six months
        const signups = response.data.monthlySignups; 
        setMonthlySignups(signups); // This is an array of signups for the last 6 months
      } catch (error) {
        console.error('Error fetching monthly signup data:', error);
      }
    };

    fetchSignupsData();
  }, []);
  const getMonthNames = (numMonths) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = new Date().getMonth();
    
    return Array.from({ length: numMonths }, (_, i) => {
      const monthIndex = (currentMonth - (numMonths - 1) + i + 12) % 12;
      return monthNames[monthIndex];
    });
  };
  const monthNames = getMonthNames(6);
  
  const chartData = monthlySignups.map((signup, index) => ({
    name: monthNames[index],
    Total: signup
  }));
  return (
    <div className='home'>
    <Sidebar/>
    <div className="homeContainer">
        <Navbar/>
       <div className="widgets">
        <Widgets type="user" />
        <Widgets type="active"/>
        <Widgets type="inactive"/>
        <Widgets type="recentsignups"/>
        
       </div>
       <div className="charts">
        <Featured/>
        <Chart title="Last 6 Months (Signups)" aspect={2 / 1} data={chartData} />
       </div>

       <div className="listContainer">
        <div className="listTitle">
            Recent User Signups
           <List/>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Home
