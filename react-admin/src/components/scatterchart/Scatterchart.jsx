// src/components/UserSignupScatterChart.js

import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import "./scatterchart.scss"
Chart.register(...registerables);

const UserSignupScatterChart = () => {
    const [signupData, setSignupData] = useState([]);

    useEffect(() => {
        const fetchSignupData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-signups-linechart');
                const counts = response.data.monthlySignups;

                // Calculate labels for the last 6 months, including the current month
                const currentMonth = new Date().getMonth();
                const labels = Array.from({ length: 6 }, (_, i) => {
                    const monthIndex = (currentMonth - 5 + i + 12) % 12;
                    return new Date(new Date().setMonth(monthIndex)).toLocaleString('default', { month: 'long' });
                });

                // Format data for the scatter chart
                const scatterPoints = labels.map((month, index) => ({
                    x: month,
                    y: counts[index],
                }));

                setSignupData(scatterPoints);
            } catch (error) {
                console.error('Error fetching signup data:', error);
            }
        };

        fetchSignupData();
    }, []);

    const scatterData = {
        datasets: [
            {
                label: 'User Signups (Last 6 Months)',
                data: signupData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                pointRadius: 8,
                pointHoverRadius: 10,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: signupData.map(point => point.x),
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                beginAtZero: true,
                min: 0,
                max: Math.max(...signupData.map(point => point.y)) + 1,
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
                <div className="scatter-chart">
                <h2>User Signups Scatter Chart (Last 6 Months)</h2>
                <Scatter data={scatterData} options={options} />
                </div>
            </div>
        </div>
    );
};
export default UserSignupScatterChart;
