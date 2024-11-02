const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String},
    age: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    img: { type: String,default:'' }, 
    phone: { type: String,default:'' },
    address: { type: String ,default:''},
    country:{type:String,default:''},
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
    // role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   });
  
//   // Compare password
// UserSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
//   };
const User = mongoose.model('User', UserSchema);

module.exports = User;
