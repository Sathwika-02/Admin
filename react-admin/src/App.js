import Home from './pages/home/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import { productInputs, userInputs } from './formsource';
import "./style/dark.scss"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import StatusBarChart from './components/barchart/StatusBarChart';
import UserSignupsAreaChart from './components/areachart/UserAreachart';
import UserSignupsBubbleChart from './components/bubblechart/BubbleChart';
import DoughnutCharts from './components/doughnut/Dough';
import UserSignupLineChart from './components/linechart/Linechart';
import UserSignupScatterChart from './components/scatterchart/Scatterchart';
import UserActiveInactiveCharts from './components/activecharts/UserActiveInactivecharts';
import ReusableUserList from './components/Reusablelist/ReusableUserList';
import Signup from './components/signup/Register';
import Register from './components/signup/Register';
import Login from './components/signup/Login';
import Userprofile from './components/userProfile/Userprofile';
function App() {
   const {darkMode}=useContext(DarkModeContext);
  return (
    <div className={darkMode?"app dark":"dark"}>
     <BrowserRouter>
     <Routes>
      <Route path="/">
      <Route path="register" element={<Register/>} />
       <Route path="login" element={<Login/>} />
       <Route path='/admin/' element={<Home/>}/>
      <Route index element={<Signup/>}/>
      <Route path='users'>
        <Route index element={<List/>}/>
        <Route path=':userid' element={<Single/>}/>
        <Route path='new' element={<New inputs={userInputs} title="Add New User"/>}/>
        <Route path="active" element={<ReusableUserList status="active" />} /> {/* Active Users */}
        <Route path="inactive" element={<ReusableUserList status="inactive" />} /> {/* Inactive Users */}            
        <Route path="recent-signups" element={<ReusableUserList status="recent-signups" />} /> {/* Pass 'recent-signups' */}
        </Route>
        <Route path='products'>
        <Route index element={<List/>}/>
        <Route path=':prodid' element={<Single/>}/>
        <Route path='new' element={<New inputs={productInputs} title="Add New Product"/>}/>
        </Route>
        <Route path='/status-barchart' element={<StatusBarChart/>}/>
        <Route path='/status-areachart' element={<UserSignupsAreaChart/>}/>
        <Route path='/status-bubblechart' element={<UserSignupsBubbleChart/>}/>
        <Route path='/status-doughnut-piechart' element={<DoughnutCharts/>}/>
        <Route path='/status-linechart' element={<UserSignupLineChart/>}/>
        <Route path='/status-scatterchart' element={<UserSignupScatterChart/>}/>
        <Route path='/status-activechart' element={<UserActiveInactiveCharts/>}/>

        <Route path='/userprofile' element={<Userprofile/>}/>

      </Route>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
