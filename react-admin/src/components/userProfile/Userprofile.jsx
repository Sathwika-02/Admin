import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { post } from '../../services/ApiEndpoint';
import  { toast } from 'react-hot-toast';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import './Userprofile.scss'

const UserProfile = () => {
  const user = useSelector((state) => state.Auth.user);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    age: '',
    status: '',
    phone: '',
    address: '',
    country: '',
    img: '',
  });

  useEffect(() => {
    // Load user profile data into state
    if (user) setProfileData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => formData.append(key, profileData[key]));
      
      const response = await axios.put(`http://localhost:5000/api/admin/users/${user._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      toast.success('Profile updated successfully!');
      setProfileData(response.data);
    } catch (error) {
      toast.error('Failed to update profile');
      console.log(error);
    }
  };

  return (
    <div className="user-profile">
        <Sidebar/>
        <div className="user-profile-container">
      <h2>Your Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Username:
          <input type="text" name="username" value={profileData.username} onChange={handleChange} />
        </label>
        <label>Email:
          <input type="email" name="email" value={profileData.email} onChange={handleChange} />
        </label>
        <label>Age:
          <input type="number" name="age" value={profileData.age} onChange={handleChange} />
        </label>
        <label>Phone:
          <input type="text" name="phone" value={profileData.phone} onChange={handleChange} />
        </label>
        <label>Address:
          <input type="text" name="address" value={profileData.address} onChange={handleChange} />
        </label>
        <label>Country:
          <input type="text" name="country" value={profileData.country} onChange={handleChange} />
        </label>
        <label>Status:
          <select name="status" value={profileData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <label>Profile Picture:
          <input type="file" name="img" onChange={(e) => setProfileData({ ...profileData, img: e.target.files[0] })} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
      </div>
    </div>
  );
};

export default UserProfile;
