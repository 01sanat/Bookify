import 'bootstrap/dist/css/bootstrap.min.css'
import {Route,Routes} from 'react-router-dom'

//import components

import MyNavBar from './components/Navbar';


//import pages 

import RegisterPage from './pages/Register'; 
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import HomePage from './pages/Home';


function App() {
  return (
    <div>
      <MyNavBar/>
      <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/register' element = {<RegisterPage/>}/>
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path='/book/list' element = {<ListingPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
