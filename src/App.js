import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from "./nav";
import { Home } from "./Home";
import { Menu } from "./menu";
import { Reserve } from "./Reserve";
import { LoadingScreen } from "./LoadingScreen";
import LowerRightLemon from "./img/lowerRightLemon.svg";
import { FallingLemons, FallingLemonsOutlineLeft, FallingLemonsOutlineRight } from "./fallingLemons";

export function AppContent() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isReservePage = location.pathname === "/Reserve";

  return (
    <>
      <LoadingScreen loading={loading} setLoading={setLoading} /> 
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Reserve" element={<Reserve />} />
      </Routes>

      <div className="lemonBkg">
        <span className="lol" style={{ display: "grid", height: "100%", gridTemplateRows: "repeat(4, 25%)", gridTemplateColumns: "repeat(1, auto)", flexBasis: "50%" }}>
          <span></span>

          <span>
            <FallingLemonsOutlineLeft />
          </span>

          <span></span>

          <span></span>
        </span>

        <span className="lol" style={{ display: "grid", height: "100%", gridTemplateRows: "repeat(4, 25%)", gridTemplateColumns: "repeat(1, auto)", flexBasis: "50%" }}>

          <span style={{ overflow: "visible" }}>
            <FallingLemons />
          </span>

          <span></span>

          {!isReservePage && 
          <span>
            <FallingLemonsOutlineRight />
          </span>
          }

        </span>
      </div>
    </>
  )
}

export function App() {
  return (
    <>
      <Router>
        <AppContent />
      </Router>
    </>
  );
}

export default App;