// src/components/UserSignupCharts.js

import React, { useEffect, useState } from 'react';
import { Line, Bar, Bubble, Scatter, Doughnut, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import "./useractiveinactive.scss";
Chart.register(...registerables);

const UserActiveInactiveCharts= () => {
    const [signupData, setSignupData] = useState([]);
    const [activeInactiveData, setActiveInactiveData] = useState({ active: 0, inactive: 0 });
    const [labels, setLabels] = useState([]);

    useEffect(() => {
      
        const fetchSignupData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-stats');
                const counts = response.data.monthlySignups;
                const currentMonth = new Date().getMonth();
                const monthLabels = Array.from({ length: 6 }, (_, i) => {
                    const monthIndex = (currentMonth - 5 + i + 12) % 12;
                    return new Date(new Date().setMonth(monthIndex)).toLocaleString('default', { month: 'long' });
                });

                setLabels(monthLabels);
                setSignupData(counts);
            } catch (error) {
                console.error('Error fetching signup data:', error);
            }
        };

        // Fetch active and inactive user counts
        const fetchUserStatusCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/user-status-counts');
                setActiveInactiveData(response.data);
            } catch (error) {
                console.error('Error fetching user status counts:', error);
            }
        };

        fetchSignupData();
        fetchUserStatusCounts();
    }, []);


    const colors = {
        active: 'rgba(75, 192, 192, 0.6)',
        inactive: 'rgba(255, 99, 132, 0.6)',
    };

  
    const lineData = {
        labels,
        datasets: [
            {
                label: 'Active Users Signups (Line)',
                data: signupData,
                borderColor: colors.active,
                tension: 0.2,
                fill: false,
            },
            {
                label: 'Inactive Users Signups (Line)',
                data: signupData.map(() => activeInactiveData.inactive),
                borderColor: colors.inactive,
                tension: 0.2,
                fill: false,
            },
        ],
    };

  
    const barData = {
        labels,
        datasets: [
            {
                label: 'Active Users Signups (Bar)',
                data: signupData,
                backgroundColor: colors.active,
            },
            {
                label: 'Inactive Users Signups (Bar)',
                data: signupData.map(() => activeInactiveData.inactive),
                backgroundColor: colors.inactive,
            },
        ],
    };

    const bubbleData = {
        labels,
        datasets: [
            {
                label: 'Active Users Signups (Bubble)',
                data: signupData.map((count, i) => ({ x: i, y: count, r: 10 })),
                backgroundColor: colors.active,
            },
            {
                label: 'Inactive Users Signups (Bubble)',
                data: signupData.map((_, i) => ({ x: i, y: activeInactiveData.inactive, r: 8 })),
                backgroundColor: colors.inactive,
            },
        ],
    };
    const chartOptions = {
        scales: {
            x: {
                type: 'category',
                labels, 
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Signups'
                }
            }
        }
    };

    const scatterData = {
        datasets: [
            {
                label: 'Active Users Signups (Scatter)',
                data: signupData.map((count, i) => ({ x: i, y: count })),
                backgroundColor: colors.active,
            },
            {
                label: 'Inactive Users Signups (Scatter)',
                data: signupData.map((_, i) => ({ x: i, y: activeInactiveData.inactive })),
                backgroundColor: colors.inactive,
            },
        ],
    };
    const areaData = {
        labels,
        datasets: [
            {
                label: 'Active Users Signups (Area)',
                data: signupData,
                backgroundColor: colors.active,
                borderColor: colors.active,
                fill: true,
                tension: 0.4,
            },
            {
                label: 'Inactive Users Signups (Area)',
                data: signupData.map(() => activeInactiveData.inactive),
                backgroundColor: colors.inactive,
                borderColor: colors.inactive,
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const doughnutData = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
            {
                data: [activeInactiveData.active, activeInactiveData.inactive],
                backgroundColor: [colors.active, colors.inactive],
            },
        ],
    };
    const pieData = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
            {
                data: [activeInactiveData.active, activeInactiveData.inactive],
                backgroundColor: [colors.active, colors.inactive],
            },
        ],
    };

    return (
        <div className="user-signup-charts">
            <Sidebar />
            <div className="charts-container">
                <Navbar />
                <h2>Active InActive User Analysis</h2>
                <div className="charts">
               
                <div className="chart-grid">
                
                    <div className="chart-item">
                        <h3>Line Chart</h3>
                        <Line data={lineData} />
                    </div>
                    <div className="chart-item">
                        <h3>Bar Chart</h3>
                        <Bar data={barData} />
                    </div>
                    <div className="chart-item">
                        <h3>Bubble Chart</h3>
                        <Bubble data={bubbleData} options={chartOptions}/>
                    </div>
                    <div className="chart-item">
                        <h3>Scatter Chart</h3>
                        <Scatter data={scatterData} options={chartOptions} />
                    </div>
                    <div className="chart-item">
                            <h3>Area Chart</h3>
                            <Line data={areaData} options={chartOptions} />
                        </div>
                        <div className="chart-item doughnut">
                            <h3>Doughnut Chart</h3>
                            <Doughnut data={doughnutData} />
                        </div>
                        <div className="chart-item pie">
                            <h3>Pie Chart</h3>
                            <Pie data={pieData} />
                        </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default UserActiveInactiveCharts;
