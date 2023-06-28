import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import OptionsForm from './components/weddingForm/weddingForm';
import InfoMessage from './components/infoMessage/infoMessage';


function App() {
  return (
    <div className="App">
      <Header />
      <div className='container'>
        <Routes>
          <Route path="/:id/welcome" element={<Home />} />
          <Route path="/" element={<Navigate to="/:id/welcome" />} />
          <Route path="/*" element={<Navigate to="/:id/welcome" />} />
          <Route path="/:id/form" element={<OptionsForm />} />
          <Route path="/message" element={<InfoMessage message="" image="" alt="" />} />
          <Route path="/notFound" element={<InfoMessage message="Este grupo de asistentes no existe" image="https://media.giphy.com/media/3K0D1Dkqh9MOmLSjzW/giphy.gif" alt="destruction" />} />
          <Route path="/congrats" element={<InfoMessage message="Gracias por indicarnos que vas/vais a asistir" image="https://media.giphy.com/media/jd6TVgsph6w7e/giphy.gif" alt="happy" />} />
          <Route path="/thanks" element={<InfoMessage message="Gracias por indicarnos que no vais a asistir" image="https://media.giphy.com/media/l1uggWFeBZ47ZSGre/giphy.gif" alt="bye" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
