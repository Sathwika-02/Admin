// src/components/UserSignupsBubbleChart.js

import React, { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import "./bubblechart.scss"
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

Chart.register(...registerables);

const UserSignupsBubbleChart = () => {
    const [bubbleData, setBubbleData] = useState([]);

    useEffect(() => {
        const fetchUserSignups = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-signups-bubble');
                setBubbleData(response.data);
            } catch (error) {
                console.error('Error fetching user signups for bubble chart:', error);
            }
        };

        fetchUserSignups();
    }, []);
    const data = {
        datasets: [{
            label: 'User Signups',
            data: bubbleData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
                min: 0,
                max: 12,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        const monthNames = [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ];
                        return monthNames[value - 1] || ''; 
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Signups',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart">
            <Sidebar/>

        <div className="chart-container">
            <Navbar/>
            <div className="bubblechart">
            <h2>User Signups Bubble Chart</h2>
            <Bubble data={data} options={options} />
        </div>
        </div>
        </div>
    );
};

export default UserSignupsBubbleChart;
