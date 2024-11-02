import React, { useState } from 'react'
import "./new.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';
const New = ({inputs,title}) => {
    const [file,setFile]=useState("");
    const [formData, setFormData] = useState({});
    const [uploadedImage, setUploadedImage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        for (const key in formData) {
            data.append(key, formData[key]);
        }

        if (file) {
            data.append('img', file);
        }
        console.log("Data",data)
        try {
            const response = await axios.post('http://localhost:5000/api/admin/users', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('User created successfully!');
            console.log('Response data:', response.data);

            // Construct the image URL for display
            setUploadedImage(`http://localhost:5000/uploads/${response.data.img}`); 
            setFormData({});
            setFile("");
            setUploadedImage("");
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user.');
        }
    };
    console.log("uploaded image",uploadedImage)

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
           <h1>{title}</h1>
        </div>
        <div className="bottom">
           <div className="left">
           <img
                              src={uploadedImage || (file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg")}
                            alt="Preview"
                            className="noimage"
                        />
           </div>
           <div className="right">
           <form onSubmit={handleSubmit}>
             <div className="formInput">
           
                <label htmlFor='file'>
              Image: <DriveFolderUploadIcon className='icon'/>
                </label>
                <input type="file" id='file'  onChange={e => setFile(e.target.files[0])}
                                    style={{ display: 'none' }}/>
             </div>
             {inputs.map((input)=>(
                <div className="formInput" key={input.id}>
                <label>
                    {input.label}
                </label>
                {input.type === 'select' ? (
                                        <select name={input.label.toLowerCase()} onChange={handleInputChange} value={formData[input.label.toLowerCase()] || ""}>
                                            {input.options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            name={input.label.toLowerCase()}
                                            onChange={handleInputChange}
                                            value={formData[input.label.toLowerCase()] || ""}
                                        />
                                    )}
                
             </div>
             ))}
             
             {/* <div className="formInput">
                <label>
                    Name and Surname
                </label>
                <input type="text" placeholder='Enter FullName' />
             </div>
             <div className="formInput">
                <label>
                    Email
                </label>
                <input type="email" placeholder='Enter Email' />
             </div>
             <div className="formInput">
                <label>
                    Phone Number
                </label>
                <input type="text" placeholder='Enter PhoneNumber' />
             </div>
             <div className="formInput">
                <label>
                    Password
                </label>
                <input type="password" />
             </div>
             <div className="formInput">
                <label>
                    Address
                </label>
                <input type="text" placeholder='Enter Address' />
             </div>
             <div className="formInput">
                <label>
                    Country
                </label>
                <input type="text" placeholder='Enter Country' />
             </div> */}
             <button>Send</button>
           </form>
           </div>
        </div>
      </div>
    </div>
  )
}

export default New
