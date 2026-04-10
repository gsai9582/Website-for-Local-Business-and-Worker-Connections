import './App.css'
import Home from './components/home';
import Shop_login from './components/logins/shop_login';
import Worker_login from './components/logins/worker_login';
import Shop_register from './components/register/shop_register';
import Worker_register from './components/register/worker_register';
import Profile from "./components/Profile";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './components/About';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/shop_login' element={<Shop_login/>}/>
      <Route path='/worker_login' element={<Worker_login/>}/>
      <Route path='/shop_register' element={<Shop_register/>}/>
      <Route path='/worker_register' element={<Worker_register/>}/>
<Route path="/profile" element={<Profile />} />
<Route path="/about" element={<About/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
