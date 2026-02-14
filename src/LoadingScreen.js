import { useEffect } from "react";
import './App.css';
import lemonLeft from "./img/lemonLeftHalf.svg";
import lemonRight from "./img/lemonLeftRight.svg";

export function LoadingScreen({ loading, setLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 2500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div
      className={`loadingContainer ${loading ? "fadeout" : ""}`}
      style={{
        zIndex: 999,
        opacity: loading ? 0 : 1,
        pointerEvents: "none",
        background: "var(--thirdly)",
        width: "100%",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        transition: "opacity 1s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div className = "lemonLoad" style={{ background: "red", display: "flex", justifyContent: "center", height: "min-content", alignItems: "center" }}>
        <img style={{ marginLeft: "0px" }} src={lemonRight} />
        <img style={{ marginLeft: "-140px" }} src={lemonLeft} />
      </div>
    </div>
  );
}
