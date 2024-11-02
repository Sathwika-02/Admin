const mongoose=require('mongoose');
const permissionschema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    permissions:[{
        permission_name:String,
        permission_value:[]
    }]
})