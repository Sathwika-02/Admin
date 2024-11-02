// controllers/AdminController.js
const User = require('../Models/User');
const path = require('path');
const multer = require('multer');
const bcrypt=require('bcrypt')

// Set up multer for file uploads

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// Fetch all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

// Create a user
exports.createUser = [
    upload.single('img'), // Middleware for handling file upload
    async (req, res) => {
        const { username, email, age, status, phone, address, country } = req.body;
        const imageFileName = req.file ? req.file.filename : '';
        console.log("user",req.body);
        try {
            const defaultPassword = '12345';
            const hashedPassword = await bcrypt.hash(defaultPassword, 10)
            const newUser = new User({
                username,
                email,
                age,
                status,
                phone,
                address,
                img: imageFileName,
                country,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            console.log("error",error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
];

// Configure columns and fetch user data for table display
exports.getUserTable = async (req, res) => {
    try {
        const users = await User.find();
        const columnConfig = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'username', headerName: 'Username', width: 130 },
            { field: 'email', headerName: 'Email', width: 200 },
            { field: 'age', headerName: 'Age', width: 100 },
            { field: 'status', headerName: 'Status', width: 120 },
            { field: 'phone', headerName: 'Phone', width: 150 },
            { field: 'address', headerName: 'Address', width: 200 },
        ];
        res.status(200).json({ users, columns: columnConfig });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user data and column configuration' });
    }
};

// Update a user
exports.updateUser = [
    upload.single('img'), // Middleware for handling file upload
    async (req, res) => {
        const { id } = req.params;
        const { username, email, age, status, phone, address, country } = req.body;
        const imageFileName = req.file ? req.file.filename : undefined;

        try {
            const updateData = {
                username,
                email,
                age,
                status,
                phone,
                address,
                country,
                ...(imageFileName && { img: imageFileName }),
            };

            const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
            console.log("updated user",updatedUser);
            res.status(updatedUser ? 200 : 404).json(updatedUser || { message: 'User not found' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to update user' });
        }
    },
];

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const checkAdmin=await User.findById(id);
        if(checkAdmin.role==='admin'){
            return res.status(409).json({message:"You cannot delete yourself"})
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Additional methods for user stats and other analytics
exports.getUserStats = async (req, res) => {
    try {
        const totalActiveUsers = await User.countDocuments({ status: 'active' });
        
        const currentDate = new Date();
        
        // Calculate the first day of the month six months ago
        const startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
        
        // Aggregate monthly signups for the last six months
        const monthlySignups = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Group by month
                    count: { $sum: 1 } // Count signups
                }
            },
            {
                $sort: { _id: 1 } // Sort by month
            }
        ]);

        // Create an array of signups for the last six months
        const signupsForLastSixMonths = new Array(6).fill(0).map((_, index) => {
            const monthIndex = (new Date().getMonth() - index + 12) % 12; // Get the corresponding month index
            const monthData = monthlySignups.find(data => data._id === monthIndex + 1);
            return monthData ? monthData.count : 0; // If no data, return 0
        }).reverse(); // Reverse to have the latest month first

        res.json({
            totalActiveUsers,
            currentMonthSignups: signupsForLastSixMonths[5], // The most recent month
            lastMonthSignups: signupsForLastSixMonths[4],   // The previous month
            lastYearSignups: signupsForLastSixMonths[0],     // Six months ago
            monthlySignups: signupsForLastSixMonths, // Array of signups for the last six months
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user stats' });
    }
};

exports.getUserStatusCounts = async (req, res) => {
    try {
        const activeCount = await User.countDocuments({ status: 'active' });
        const inactiveCount = await User.countDocuments({ status: 'inactive' }); // Updated here

        res.json({
            active: activeCount,
            inactive: inactiveCount, // Updated here
        });
    } catch (error) {
        console.error('Error fetching user status counts:', error);
        res.status(500).json({ message: 'Error fetching user status counts' });
    }
};

exports.getUserSignupsBubble = async (req, res) => {
    try {
        const monthlyData = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 },
                    averageAge: { $avg: "$age" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const bubbleData = monthlyData.map((data) => ({
            x: data._id, 
            y: data.count,
            r: data.averageAge
        }));

        res.json(bubbleData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user signups for bubble chart' });
    }
};

exports.getUserSignupsDoughpie = async (req, res) => {
    try {
        const monthlyData = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Create an array of signups for all 12 months
        const signupsForAllMonths = new Array(12).fill(0);
        monthlyData.forEach(data => {
            signupsForAllMonths[data._id - 1] = data.count; // Fill counts in the corresponding month
        });

        res.json(signupsForAllMonths); // Return counts for all 12 months
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user signups' });
    }
};

exports.getUserSignupsLineChart = async (req, res) => {
    try {
        const totalActiveUsers = await User.countDocuments({ status: 'active' });
        
        // Set the start date to six months ago
        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1); // Start from the first day of six months ago

        // Aggregate monthly signups for the last six months, including the current month
        const monthlySignups = await User.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Create an array to store signups for each month in the six-month range
        const signupsForLastSixMonths = new Array(6).fill(0).map((_, index) => {
            const monthIndex = (new Date().getMonth() - 5 + index + 12) % 12; // Offset for six months
            const monthData = monthlySignups.find(data => data._id === monthIndex + 1);
            return monthData ? monthData.count : 0; // Return count or 0 if no data
        });

        res.json({
            totalActiveUsers,
            monthlySignups: signupsForLastSixMonths,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user stats' });
    }
};
