import React,{useState,useEffect} from 'react'
import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { userColumns,userRows } from '../../datatablesource';
import { Link,useNavigate  } from "react-router-dom";
import Modal from '../../Modal';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { toast } from 'react-hot-toast';

const paginationModel = { page: 0, pageSize: 5 };
const DataTable = () => {
  const navigate=useNavigate()
    // const [data, setData] = useState(userRows);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [columns, setColumns] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const role = localStorage.getItem('role');
              if (role !== 'admin') {
                toast.error("Access denied.");
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                navigate('/login');
                return;
              }
              
              const response = await axios.get('http://localhost:5000/api/admin/userTable');
              
                setData(response.data.users);
                console.log("data",response.data)
                setColumns(response.data.columns); 
              
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const handleDelete = (id) => {
        setShowModal(true);
        setSelectedId(id); 
    };

    
    const confirmDelete = async () => {
      try {
          await axios.delete(`http://localhost:5000/api/admin/users/${selectedId}`);
          setData(data.filter((item) => item._id !== selectedId));
          setShowModal(false);
          setSelectedId(null);
      } catch (error) {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
      }
  };

    const cancelDelete = () => {
        setShowModal(false); 
        setSelectedId(null);
    };
    
      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            const user=params.row;
            console.log("user",user);
            return (
              <div className="cellAction">
                <Link  to={`/users/${user._id}`}  state={user} style={{ textDecoration: "none" }}>
                  <div className="viewButton">View</div>
                </Link>
                <div
                  className="delete_Button"
                  onClick={() => handleDelete(params.row._id)}
                >
                  Delete
                </div>
              </div>
            );
          },
        },
      ];
  return (
    <div className='datatable'>
        <div className="datatableTitle">
            Add New User
            <Link to="/users/new" style={{textDecoration:"none"}} className='link'>
            Add New
            </Link>
        </div>
       <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
      className='datagrid'
        rows={data}
        columns={columns.concat(actionColumn)} 
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
        getRowId={(row) => row._id}
      />
    </Paper>

    {showModal && (
                <Modal
                    title="Are you sure you want to delete?"
                    onDelete={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
    </div>
  )
}

export default DataTable
