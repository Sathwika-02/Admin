
const express = require('express');
const db=require('./db');
const cors = require('cors');
// const mongoose = require('mongoose'); // Uncomment if using MongoDB
const app = express();
const path=require('path')
const multer = require('multer');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoute');
const adminRoutes=require('./routes/Adminroutes');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });
app.get("/",function(req,res){
    res.sendFile(
        path.join(__dirname,"../react-admin/build/index.html"),
        function(err){
            if(err){
                res.status(500).send(err)
            }
        }
    )
});
app.use(express.json());
app.use(cookieParser());
app.use(cors({
     // Update this with the frontend's URL
    credentials: true ,
    origin: 'http://localhost:3000',
    methods:["POST","GET","PUT","DELETE"]
}));
// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/admin',adminRoutes);


app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
const User = require('./Models/User');

// app.post('/api/users', upload.single('img'), async (req, res) => {
//     const { username, email, age, status, phone, address,country } = req.body;
//     const imageFileName = req.file ? req.file.filename : '';

//     try {
//         const newUser = new User({
//             username,
//             email,
//             age,
//             status,
//             phone,
//             address,
//             img: imageFileName ,
//             country,
//         });

//         await newUser.save();
//         res.status(201).json(newUser); 
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ error: 'Failed to create user' });
//     }
// });


// app.get('/api/users', async (req, res) => {
//     try {
//         const users = await User.find(); 
//         res.status(200).send(users);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });
// app.get('/api/userTable', async (req, res) => {
//     try {
//         const users = await User.find(); 
//         const columnConfig = [
//             { field: 'id', headerName: 'ID', width: 70 },
//             { field: 'username', headerName: 'Username', width: 130 },
//             { field: 'email', headerName: 'Email', width: 200 },
//             { field: 'age', headerName: 'Age', width: 100 },
//             { field: 'status', headerName: 'Status', width: 120 },
//             { field: 'phone', headerName: 'Phone', width: 150 },
//             { field: 'address', headerName: 'Address', width: 200 },
//             // {field:'country',headerName:'Country',width:200},
//         ];
//         res.status(200).json({ users, columns: columnConfig });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching user data and column configuration' });
//     }
// });

// app.delete('/api/users/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (deletedUser) {
//             res.status(200).json({ message: 'User deleted successfully' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ error: 'Failed to delete user' });
//     }
// });

// app.put('/api/users/:id', upload.single('img'), async (req, res) => {
//     const { id } = req.params;
//     const { username, email, age, status, phone, address, country } = req.body;
//     const imageFileName = req.file ? req.file.filename : undefined;

//     try {
        
//         const updateData = {
//             username,
//             email,
//             age,
//             status,
//             phone,
//             address,
//             country,
//             ...(imageFileName && { img: imageFileName }), 
//         };

//         const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
//         if (updatedUser) {
//             res.status(200).json(updatedUser);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// });


// app.get('/api/user-stats', async (req, res) => {
//     try {
//         const totalActiveUsers = await User.countDocuments({ status: 'active' });
        
//         const currentDate = new Date();
        
//         // Calculate the first day of the month six months ago
//         const startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6));
        
//         // Aggregate monthly signups for the last six months
//         const monthlySignups = await User.aggregate([
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: startDate,
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: { $month: "$createdAt" }, // Group by month
//                     count: { $sum: 1 } // Count signups
//                 }
//             },
//             {
//                 $sort: { _id: 1 } // Sort by month
//             }
//         ]);

//         // Create an array of signups for the last six months
//         const signupsForLastSixMonths = new Array(6).fill(0).map((_, index) => {
//             const monthIndex = (new Date().getMonth() - index + 12) % 12; // Get the corresponding month index
//             const monthData = monthlySignups.find(data => data._id === monthIndex + 1);
//             return monthData ? monthData.count : 0; // If no data, return 0
//         }).reverse(); // Reverse to have the latest month first

//         res.json({
//             totalActiveUsers,
//             currentMonthSignups: signupsForLastSixMonths[5], // The most recent month
//             lastMonthSignups: signupsForLastSixMonths[4],   // The previous month
//             lastYearSignups: signupsForLastSixMonths[0],     // Six months ago
//             monthlySignups: signupsForLastSixMonths, // Array of signups for the last six months
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user stats' });
//     }
// });

// app.get('/api/user-status-counts', async (req, res) => {
//     try {
//         const activeCount = await User.countDocuments({ status: 'active' });
//         const inactiveCount = await User.countDocuments({ status: 'inactive' }); // Updated here

//         res.json({
//             active: activeCount,
//             inactive: inactiveCount, // Updated here
//         });
//     } catch (error) {
//         console.error('Error fetching user status counts:', error);
//         res.status(500).json({ message: 'Error fetching user status counts' });
//     }
// });


// app.get('/api/user-signups-bubble', async (req, res) => {
//     try {
//         const monthlyData = await User.aggregate([
//             {
//                 $group: {
//                     _id: { $month: "$createdAt" },
//                     count: { $sum: 1 },
//                     averageAge: { $avg: "$age" }
//                 }
//             },
//             {
//                 $sort: { _id: 1 }
//             }
//         ]);

//         const bubbleData = monthlyData.map((data) => ({
//             x: data._id, 
//             y: data.count,
//             r: data.averageAge
//         }));

//         res.json(bubbleData);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user signups for bubble chart' });
//     }
// });

// app.get('/api/user-signups-doughpie', async (req, res) => {
//     try {
//         const monthlyData = await User.aggregate([
//             {
//                 $group: {
//                     _id: { $month: "$createdAt" },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $sort: { _id: 1 }
//             }
//         ]);

//         // Create an array of signups for all 12 months
//         const signupsForAllMonths = new Array(12).fill(0);
//         monthlyData.forEach(data => {
//             signupsForAllMonths[data._id - 1] = data.count; // Fill counts in the corresponding month
//         });

//         res.json(signupsForAllMonths); // Return counts for all 12 months
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user signups' });
//     }
// });

// app.get('/api/user-signups-linechart', async (req, res) => {
//     try {
//         const totalActiveUsers = await User.countDocuments({ status: 'active' });
        
//         // Set the start date to six months ago
//         const currentDate = new Date();
//         const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1); // Start from the first day of six months ago

//         // Aggregate monthly signups for the last six months, including the current month
//         const monthlySignups = await User.aggregate([
//             {
//                 $match: {
//                     createdAt: {
//                         $gte: startDate,
//                     }
//                 }
//             },
//             {
//                 $group: {
//                     _id: { $month: "$createdAt" },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $sort: { _id: 1 }
//             }
//         ]);

//         // Create an array to store signups for each month in the six-month range
//         const signupsForLastSixMonths = new Array(6).fill(0).map((_, index) => {
//             const monthIndex = (new Date().getMonth() - 5 + index + 12) % 12; // Offset for six months
//             const monthData = monthlySignups.find(data => data._id === monthIndex + 1);
//             return monthData ? monthData.count : 0; // Return count or 0 if no data
//         });

//         res.json({
//             totalActiveUsers,
//             monthlySignups: signupsForLastSixMonths,
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user stats' });
//     }
// });



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });