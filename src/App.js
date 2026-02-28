import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Nav } from "./nav";
import { Home } from "./Home";
import { Menu } from "./menu";
import { Reserve } from "./Reserve";
import { LoadingScreen, SecondaryLoadingScreen } from "./LoadingScreen";
import { FallingLemonsColored, FallingLemonsOutlineLeft, FallingLemonsOutlineRight } from "./fallingLemons";

export function AppContent() {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();
  const isReservePage = location.pathname === "/Reserve";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <SecondaryLoadingScreen pageLoading={pageLoading} setPageLoading={setPageLoading} />
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <Nav setPageLoading={setPageLoading} />
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
            <FallingLemonsColored />
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
      <Router basename={process.env.PUBLIC_URL}>
        <AppContent />
      </Router>
    </>
  );
}

export default App;
