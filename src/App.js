
import './App.css';
import Login from './pages component/Login';
import Signup from './pages component/Signup';
import Home from './pages component/Home'
import './style.scss';
import { BrowserRouter as Router, Routes,  Route } from 'react-router-dom';
import { Authcontext } from './Context Api/Authcontext';
import { useContext } from 'react';

function App() {
  const { currentUser } = useContext(Authcontext);
  console.log(currentUser);
  return (
    <>
     
      <Router>
        <Routes>
          <Route exact path="/" element={currentUser ? <Home /> : <Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </Router>


    </>

  );
}

export default App;
