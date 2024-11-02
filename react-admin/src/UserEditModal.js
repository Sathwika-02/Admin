import React, { useState } from 'react';
import './EditModal.scss'; // You can create a separate CSS file for styling
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';

const UserEditModal = ({ user, onClose,onUpdate }) => {
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        img: user.img,
        age:user.age,
        country:user.country,
    });
    
   
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(
        user.img 
        ? `http://localhost:5000/uploads/${user.img}` 
        : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    );
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        console.log("evenet",e.target.files)
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Update image preview if a new file is selected
        if (selectedFile) {
            const newImageUrl = URL.createObjectURL(selectedFile);
            setImageUrl(newImageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (file) {
            data.append('img', file);
        }
        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }
        

        try {
            
            const response = await axios.put(`http://localhost:5000/api/admin/users/${user._id}`,data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(response.data);
            onClose(); 
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user.');
        }
    };

    return (
        <div className="editModal">
            <div className="modalContent">
                <div className='userTitle'>

                <h2>Edit User</h2>
                <button className="closeButton" onClick={onClose}>×</button>
                </div>
                
                <form onSubmit={handleSubmit}>
                <div>
                <img src={imageUrl} alt="img" className="itemImg" />
                </div>
                    <div className="formInput">
                        
                        <label htmlFor="file">
                            Image: <DriveFolderUploadIcon className="icon" />
                        </label>
                        <input type="file" id="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    </div>
                    
                    <div className="formInput">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
                    </div>
                    <div className="formInput">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="formInput">
                        <label>Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="formInput">
                        <label>Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                    </div>
                    <div className="formInput">
                        <label>Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                    </div>
                    <div className="formInput">
                        <label>Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                    </div>
                    <div>
                    <button type="submit">Update</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default UserEditModal;
