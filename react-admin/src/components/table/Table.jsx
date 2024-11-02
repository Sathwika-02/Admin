import React,{useState,useEffect} from 'react'
import "./table.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import Cookies from 'js-cookie'; 
const List= () => {
  const [rows, setRows] = useState([]);
  const placeholderImage = 'https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/1/moon-man-nicholas-ely.jpg';
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        });
        // const response = await axios.get('http://localhost:5000/api/admin/users');
        const sortedUsers = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        
        setRows(sortedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div className='table'>
      <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
              <TableCell className="tableCell">User Img</TableCell>
              <TableCell className="tableCell">Username</TableCell>
              <TableCell className="tableCell">Email</TableCell>
              {/* <TableCell className="tableCell">Age</TableCell> */}
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Phone</TableCell>
              <TableCell className="tableCell">Created At</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  <img
                    src={row.img ? `http://localhost:5000/uploads/${row.img}` : placeholderImage}
                    alt="user"
                    className="userImage"
                  />
                </TableCell>
                <TableCell className="tableCell">{row.username}</TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                {/* <TableCell className="tableCell">{row.age}</TableCell> */}
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">{row.phone}</TableCell>
                <TableCell className="tableCell">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default List
