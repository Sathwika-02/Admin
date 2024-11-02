// src/components/UserStatusChart.js

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import registerables
import axios from 'axios';
import './statusbarchar.scss'
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

// Register all the necessary components
Chart.register(...registerables);
Chart.register(...registerables);

const UserStatusChart = () => {
    const [statusCounts, setStatusCounts] = useState({ active: 0, inactive: 0 }); // Updated here

    useEffect(() => {
        const fetchStatusCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-status-counts');
                setStatusCounts(response.data);
            } catch (error) {
                console.error('Error fetching status counts:', error);
            }
        };

        fetchStatusCounts();
    }, []);

    const data = {
        labels: ['Active', 'Inactive'], // Updated here
        datasets: [
            {
                label: 'User Status Counts',
                data: [statusCounts.active, statusCounts.inactive], // Updated here
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)', // Updated here
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)', // Updated here
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    // Specify your custom tick values
                    callback: function(value, index, values) {
                        return value === 0 || value === 5 || value === 10 || value === 20 ? value : ''; // Only show 0, 5, 10, 20
                    },
                    // You can also define specific step sizes
                    stepSize: 5, // This defines the interval between tick marks
                },
                min: 0, // Minimum value on y-axis
                max: 20 // Adjust maximum value as necessary
            },
        },
    };

    return (
        <div className="chart">
            <Sidebar/>
            <div className="chart-container">
                <Navbar/>
                <div className="bar-chart">
                    <h2>User Status Counts</h2>
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};
export default UserStatusChart;