import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';


function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
