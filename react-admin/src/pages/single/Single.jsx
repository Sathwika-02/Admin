import React,{useState,useEffect} from 'react'
import "./single.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import { useLocation } from 'react-router-dom'
import UserEditModal from '../../UserEditModal'
import axios from 'axios'

const Single = () => {
    const location=useLocation();
    const initialUser = location.state || {};
    const [showEditModal, setShowEditModal] = useState(false);
    const [monthlySignups, setMonthlySignups] = useState([]);
    
    const [user, setUser] = useState(initialUser);
    console.log("user",user);
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
    const handleUpdate = (updatedUser) => {
        console.log("updated user",updatedUser);
        setUser(updatedUser);
        setShowEditModal(false);
    };
    const imageUrl = user.img 
    ? `http://localhost:5000/uploads/${user.img}` 
    : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
        console.log("imageurl",imageUrl);
     if (!user || !user.username) {
            return <div>Loading user data...</div>;
        }

       
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
    <div className='single'>
     <Sidebar/>
     <div className="singleContainer">
        <Navbar/>
       <div className="top">
<div className="left">
<div className="editButton" onClick={() => {console.log("Edit is clicked");setShowEditModal(true)}}>Edit</div>
<h1 className="title">Information</h1>
<div className="item">
    <img src={imageUrl} alt="img" className="itemImg" />
    <div className="details">
        <h1 className="itemTitle">{user.username}</h1>
        <div className="detailItem">
            <span className="itemKey">Email:</span>
            <span className="itemValue">{user.email}</span>
        </div>
        <div className="detailItem">
            <span className="itemKey">Phone:</span>
            <span className="itemValue">{user.phone}</span>
        </div>
        <div className="detailItem">
            <span className="itemKey">Address:</span>
            <span className="itemValue">{user.address}</span>
        </div>
        <div className="detailItem">
            <span className="itemKey">Country:</span>
            <span className="itemValue">India</span>
        </div>
    </div>
</div>
</div>
<div className="right">
    <Chart aspect={3/1} title="User Spending (Last 6 months)" data={chartData}/>
</div>
       </div>
       <div className="bottom">
        <div className="title">Recent User Signups</div>
<List/>

       </div>
       {showEditModal && (
                    <UserEditModal user={user} onClose={() => setShowEditModal(false)} onUpdate={handleUpdate}  />
                )}
     </div>
    </div>
  )
}

export default Single
