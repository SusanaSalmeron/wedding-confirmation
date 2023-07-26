import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import OptionsForm from "./components/weddingForm/weddingForm";
import InfoMessage from "./components/infoMessage/infoMessage";
import Info from "./components/info/info";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/:id/welcome" element={<Home />} />
        <Route path="/" element={<Navigate to="/:id/welcome" />} />
        <Route path="/*" element={<Navigate to="/:id/welcome" />} />
        <Route path="/:id/form" element={<OptionsForm />} />
        <Route path="/message" element={<InfoMessage message=""
          image="" alt="" link="/info" email="bodatyj071023@gmail" />} />
        <Route path="/info" element={<Info />} />
        <Route path="/notFound" element={<InfoMessage message="Este grupo de asistentes no existe" image="https://media.giphy.com/media/3K0D1Dkqh9MOmLSjzW/giphy.gif" alt="destruction" link="" email="" />} />
        <Route path="/congrats" element={<InfoMessage message="Gracias por indicarnos que vas/vais a asistir" image="https://media.giphy.com/media/jd6TVgsph6w7e/giphy.gif" alt="happy" link="/info" email="" />} />
        <Route path="/thanks" element={<InfoMessage message={`Gracias por indicarnos que no vais a asistir, si cambiáis de opinión podéis escribir a `}
          image="https://media.giphy.com/media/l1uggWFeBZ47ZSGre/giphy.gif" alt="bye" link="" email="bodatyj071023@gmail" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
