//Admin Routes
const express = require('express');
const isAdmin = require('../middleware/verifyToken');
const AdminController = require('../controllers/Admin');
const router = express.Router();

router.get('/users', AdminController.getAllUsers);
router.post('/users', AdminController.createUser);
router.get('/userTable', AdminController.getUserTable);
router.put('/users/:id', AdminController.updateUser);
router.delete('/users/:id', AdminController.deleteUser);

// Routes for stats and analytics
router.get('/user-stats', AdminController.getUserStats);
router.get('/user-status-counts', AdminController.getUserStatusCounts);
router.get('/user-signups-bubble', AdminController.getUserSignupsBubble);
router.get('/user-signups-doughpie', AdminController.getUserSignupsDoughpie);
router.get('/user-signups-linechart', AdminController.getUserSignupsLineChart);

module.exports = router;
