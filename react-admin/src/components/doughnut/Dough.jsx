// src/components/UserSignupCharts.js

import React, { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import registerables
import axios from 'axios';
import './doughnut.scss'; // Create this file for custom styles if needed
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

// Register all the necessary components
Chart.register(...registerables);

const DoughnutCharts = () => {
    const [signupData, setSignupData] = useState({ labels: [], counts: [] });

    useEffect(() => {
        const fetchSignupData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-signups-doughpie'); // Updated endpoint
                const counts = response.data;

                // Month names
                const labels = [
                    "January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"
                ];

                setSignupData({ labels, counts });
            } catch (error) {
                console.error('Error fetching signup data:', error);
            }
        };

        fetchSignupData();
    }, []);

    // Chart data for Doughnut
    const doughnutData = {
        labels: signupData.labels,
        datasets: [
            {
                label: 'User Signups (Doughnut)',
                data: signupData.counts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
            },
        ],
    };

    // Chart data for Pie
    const pieData = {
        labels: signupData.labels,
        datasets: [
            {
                label: 'User Signups (Pie)',
                data: signupData.counts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
            },
        ],
    };

    return (
        <div className="charts">
            <Sidebar />
            <div className="charts-container">
                <Navbar />
                <div className="container">
                    <div className="doughnut-chart">
                        <h2>User Signups (Doughnut Chart)</h2>
                        <Doughnut data={doughnutData} />
                    </div>
                    <div className="doughnut-chart">
                        <h2>User Signups (Pie Chart)</h2>
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DoughnutCharts;
