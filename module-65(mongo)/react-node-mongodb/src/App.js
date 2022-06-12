import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddUser from './pages/AddUser/AddUser';
import Home from "./pages/Home/Home";
import Header from './pages/shared/Header/Header';
import UpdateUser from './pages/UpdateUser/UpdateUser';
function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/adduser' element={<AddUser></AddUser>}/>
        <Route path='/updateuser/:id' element={<UpdateUser></UpdateUser>}/>
      </Routes>
    </div>
  );
}

export default App;
