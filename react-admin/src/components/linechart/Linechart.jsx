

// src/components/UserSignupLineChart.js

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import './linechart.scss'; // Include your own styles
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

// Register all necessary components
Chart.register(...registerables);

const UserSignupLineChart = () => {
    const [signupData, setSignupData] = useState([]);
    const [signupLabels, setSignupLabels] = useState([]);

    useEffect(() => {
        const fetchSignupData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-stats');
                const counts = response.data.monthlySignups;

                // Get labels for the last six months, including the current month
                const currentMonth = new Date().getMonth();
                const labels = Array.from({ length: 6 }, (_, i) => {
                    const monthIndex = (currentMonth - 5 + i + 12) % 12;
                    return new Date(new Date().setMonth(monthIndex)).toLocaleString('default', { month: 'long' });
                });

                setSignupLabels(labels);
                setSignupData(counts);
            } catch (error) {
                console.error('Error fetching signup data:', error);
            }
        };

        fetchSignupData();
    }, []);

    const lineData = {
        labels: signupLabels,
        datasets: [
            {
                label: 'User Signups (Last 6 Months)',
                data: signupData,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1, // Smoother line
                pointBackgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: Math.max(...signupData) + 1,
                title: {
                    display: true,
                    text: 'Signups',
                },
            },
        },
    };
    return (
        <div className="charts">
            <Sidebar />
            <div className="charts-container">
                <Navbar />
                <div className="linechart">
                <h2>User Signups Over the Last 6 Months</h2>
                <Line data={lineData} options={options}/>
                </div>
            </div>
        </div>
    );
};

export default UserSignupLineChart;
