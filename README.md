# Admin Dashboard with Role-Based Access Control (RBAC)

## Overview
This project is an Admin Dashboard that enables efficient user management with role-based access control (RBAC). The dashboard allows administrators to manage user accounts, view statistics, and access data visualizations. It includes two roles: Admin and User, each with specific permissions. The interface is fully responsive, ensuring usability across desktop and mobile devices.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [How to Run](#how-to-run)

## Features
- **User Management**:  Admins can add, edit, and delete user accounts.
- **Role-Based Access Control**: 
       **Admin Role**: Full access to user management and statistics.
       **User Role**: Limited access to view their own profile and personal statistics.
- **User Statistics Overview**: Displays statistics like the number of active users and new sign-ups
- **Data Visualization**: Charts and graphs to show trends, such as user growth over time.
- **Responsive Design**: Optimized for various screen sizes, providing a seamless experience on both mobile and desktop devices.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **State Management**: Redux
- **Data Visualization**: Chart.js for visual representations
- **Styling**: Material UI and custom CSS for responsive design
- **Version Control**: Git & GitHub

## Installation

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (for local development)

### Step 1: Clone the Repository
```bash
git clone [https://github.com/Sathwika-02/Admin-Dashboard.git](https://github.com/Sathwika-02/Admin.git)
```

### Step 2: Navigate to the Project Directory
Change into the project directory:
```
cd ReactAdminDashboard
```

### Step 3: Install Dependencies
Run the following command to install the necessary dependencies for both the frontend and backend:
```
npm install
```

### Step 4: Set Up the Environment Variables
Create a .env file in the root of your project directory and configure the required environment variables, such as MongoDB connection string and port settings. The .env file should look something like this:

```

MONGODB_URI=mongodb://localhost:27017/task-manager
PORT=5000

```

### Usage
After setting up the environment variables, you can start the application.


### How to Run
### Step 1: Start the Backend Server
Navigate to the server directory and start the backend server:
```
cd react-admin-backend
node server.js
```

### Step 2: Start the Frontend
In a new terminal window, navigate to the client directory and start the React application:
```
cd react-admin
npm start
```

### Step 3: Access the Application
Open your web browser and go to http://localhost:3000 to access the Task Manager application.
