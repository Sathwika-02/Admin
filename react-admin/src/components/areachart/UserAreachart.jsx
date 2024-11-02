import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import "./userareachart.scss";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
Chart.register(...registerables);

const UserSignupsAreaChart = () => {
    const [monthlySignups, setMonthlySignups] = useState([]);

    useEffect(() => {
        const fetchUserSignups = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-stats');
                setMonthlySignups(response.data.monthlySignups);
            } catch (error) {
                console.error('Error fetching user signups:', error);
            }
        };

        fetchUserSignups();
    }, []);
    const data = {
        labels: ['6 Months Ago', '5 Months Ago', '4 Months Ago', '3 Months Ago', '2 Months Ago', '1 Month Ago'],
        datasets: [
            {
                label: 'User Signups',
                data: monthlySignups,
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
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
            <div className="areachart">
            <h2>User Signups Over Time</h2>
            <Line data={data} options={options} />
        </div>
        </div>
        </div>
    );
};

export default UserSignupsAreaChart;
