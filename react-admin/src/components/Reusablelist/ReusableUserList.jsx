import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';

const ReusableUserList= ({status}) => {
    
    console.log("Received status from URL:",status); // Log the status received from URL
  const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'username', headerName: 'Username', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'status', headerName: 'Status', width: 120 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'country', headerName: 'Country', width: 150 }
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users');
                console.log("Response data:", response.data);  // Log entire response data
                
                // Use a condition to verify status
                console.log("Filtering users by status:", status);  // Log the status prop
                
                // Check for potential leading/trailing spaces and lowercase comparison
                const filteredUsers = status === 'recent-signups' 
                    ? response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by created date
                    : response.data.filter(user => user.status.trim().toLowerCase() === status.toLowerCase());

                console.log("Filtered users:", filteredUsers);  
                setUsers(filteredUsers);

            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [status]);
   
    return (
        <div className="charts">
            <Sidebar/>
        <div className='charts-container' style={{ height: 500, width: '100%' }}>
             <h2 className="title"> {status.toUpperCase()} USERS</h2>
            <DataGrid
                rows={users}
                columns={columns}
                pageSize={5}
                loading={loading}
                getRowId={(row) => row._id}
                checkboxSelection
            />
        </div>
        </div>
    );
};

export default ReusableUserList;
