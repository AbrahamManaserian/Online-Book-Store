import * as React from 'react';
import './App.css';
import { Link,Outlet } from "react-router-dom";
import HomePage from '/Users/abraham/projects/online-boock-store/src/components/HomePage.jsx';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SearchPage from './components/SearchPage'
import ResponsiveAppBar from './components/AppBar'
import {SearchMenu} from "./components/About"
import UserRegisterMenu from './components/UserRegisterMenu'


function App() {
  
  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<HomePage/>}></Route>
         <Route path='/Home' element={<HomePage/>}></Route>
         <Route path='/Contacts' element={<UserRegisterMenu/>}></Route>
         <Route path='/About' element={<SearchMenu/>}></Route>
         <Route path='/search/:search' element={<SearchPage/>} />
         <Route path='/asd' element={<div>Abraham</div>} >
           
         </Route>
         
       </Routes>

    </BrowserRouter>
  );
}   
export default App;
  
  
