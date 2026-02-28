import { useEffect, useState } from "react";
import './App.css';
import lemonLeft from "./img/lemonLeftHalf.svg";
import lemonRight from "./img/lemonLeftRight.svg";
import lemonInside from "./img/insideLemon.png";

const SPLASH001_D =
  "M56.04113 0 H77.48831 C96.7368 0 112.5216 9.1 97.8277 13 C79.7422 17.79994 83.1331 26 56.04113 26 C33.42527 26 31.16491 20.8 7.41644 13 L7.41644 13 C-11.57226 6.76 9.67536 0 56.04113 0 Z";

const SPLASH002_D =
  "M28.1504 0.15973H55.1501C88.6501 0.15973 101.777 -1.38918 84.65 5.15967C67.65 11.6599 151.15 25.66 60.65 25.66C-55.8499 25.66 34.6494 10.1602 16.65 5.15991L16.6495 5.15979C9.90475 3.28609 -1.34926 0.15973 28.1504 0.15973Z";

export function LoadingScreen({ loading, setLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 2500);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div
      className={`loadingContainer ${loading ? "fadeout" : ""}`}
      style={{
        opacity: loading ? 0 : 1,
        pointerEvents: "none",
        background: "var(--thirdly)",
        width: "100%",
        height: "100vh",
        position: "fixed",
        zIndex: "9998",
        left: 0,
        top: 0,
        transition: "opacity 1s ease",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <div className="loadingVisual">
        <div
          className="lemonLoad"
          style={{ display: "flex", justifyContent: "center", height: "min-content", alignItems: "center" }}
        >
          <img style={{ marginLeft: "0px" }} src={lemonRight} alt="" />
          <img style={{ marginLeft: "-140px" }} src={lemonLeft} alt="" />
        </div>

        <div className="splashMorph" aria-hidden="true">
          <svg viewBox="0 0 104 26" className="splashMorphSvg">
            <path d={SPLASH001_D} fill="#EAD26E">
              <animate
                attributeName="d"
                begin="0s"
                dur="1.9s"
                repeatCount="1"
                fill="freeze"
                values={`${SPLASH001_D};${SPLASH002_D}`}
                keyTimes="0;1"
                calcMode="spline"
                keySplines=".37 1.08 .64 1.13"
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function SecondaryLoadingScreen({ pageLoading }) {
  const [phase, setPhase] = useState("idle");
  const orbitLemons = Array.from({ length: 8 }, () => lemonInside);

  useEffect(() => {
    if (pageLoading) {
      setPhase("expand");
      return;
    }

    if (phase !== "idle") {
      setPhase("collapse");
    }
  }, [pageLoading, phase]);

  if (phase === "idle" && !pageLoading) {
    return null;
  }

  return (
    <div
      className={`secondaryLoadingContainer ${phase === "collapse" ? "is-collapse" : "is-expand"}`}
      aria-hidden="true"
    >
      <div
        className="secondaryLoadingCircle"
        onAnimationEnd={() => {
          if (!pageLoading) {
            setPhase("idle");
          }
        }}
      />

      <div className="OrbitInner" aria-hidden="true">
        <div className="OrbitSpinner">
          {orbitLemons.map((lemon, index) => (
            <div
              key={`secondary-orbit-lemon-${index}`}
              className="OrbitItemPath"
              style={{
                "--i": index,
                "--count": orbitLemons.length,
              }}
            >
              <img
                className="OrbitItem"
                src={lemon}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      <div className="OrbitOuter" aria-hidden="true">
        <div className="OrbitSpinner OrbitSpinnerReverse">
          {orbitLemons.map((lemon, index) => (
            <div
              key={`secondary-orbit-outer-lemon-${index}`}
              className="OrbitItemPath OrbitItemPathOuter"
              style={{
                "--i": index,
                "--count": orbitLemons.length,
              }}
            >
              <img
                className="OrbitItem"
                src={lemon}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function init() {
  return (
    <>
      <LoadingScreen />
      <SecondaryLoadingScreen />
    </>
  )
}
