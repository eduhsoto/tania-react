import { Navigate, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Home from './pages/Home';
import Path from './pages/Path';
import Portafolio from './pages/Portafolio';
import Footer from './components/Footer';
import './assets/index.css';

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/my-path' element={<Path />} />
        <Route path='/portafolio' element={<Portafolio />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
