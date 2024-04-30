import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom" 
import Form from './components/Register';
import Login from './components/LoginPage';
import Home from './components/Home';
import Products from './components/Products';
import Admin from './components/Admin';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Form />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
