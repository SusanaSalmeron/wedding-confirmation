import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import OptionsForm from './components/weddingForm/weddingForm';


function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/:id/welcome" element={<Home />} />
          <Route path="/" element={<Navigate to="/123/welcome" />} />
          <Route path="/*" element={<Navigate to="/123/welcome" />} />
          <Route path="/form" element={<OptionsForm />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
