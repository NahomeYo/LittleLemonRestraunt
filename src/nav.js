import aboutIcon from "./img/about.svg";
import homeIcon from "./img/home.svg";
import menuIcon from "./img/menu.svg";
import orderIcon from "./img/order.svg";
import reserveIcon from "./img/reserve.svg";
import leafIcon from "./img/leaf.png";
import logo from "./img/littleLemonIcon.svg"
import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

export const Nav = () => {
    const [pageNum, setPageNum] = useState(0);
    const [pageTitle, setPageTitle] = useState("home");
    const [leafArray, setLeafArray] = useState([]);
    const [isReverse, setIsReverse] = useState(false);
    const logoRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const buttons = Array.from(document.querySelectorAll(".leaveBtn"));
        setLeafArray(buttons);
    }, []);

    useEffect(() => {
        const handlers = leafArray.map((btn, index) => {
            const handler = () => setPageNum(index);
            btn.addEventListener("click", handler);
            return { btn, handler };
        });

        return () => {
            handlers.forEach(({ btn, handler }) => {
                btn.removeEventListener("click", handler);
            });
        };
    }, [leafArray]);

    useEffect(() => {
        setTimeout(() => {
            const routes = [
                "/",
                "/About",
                "/Menu",
                "/OrderOnline",
                "/Reserve",
            ];

            navigate(routes[pageNum] || "/");

        }, 2000);

        switch (pageNum) {
            case (0):
                setPageTitle("home");
                break;
            case (1):
                setPageTitle("about");
                break;
            case (2):
                setPageTitle("menu");
                break;
            case (3):
                setPageTitle("order");
                break;
            case (4):
                setPageTitle("reserve");
                break;
            default:
                break;
        }
    }, [pageNum]);

    useEffect(() => {
        const logo = logoRef.current;
        if (logo) {
            logo.classList.toggle("reverse", isReverse);
            logo.style.animation = "none";
            logo.offsetHeight;
            logo.style.animation = "";
        }
    }, [isReverse]);

    function leafHover(event) {
        let btn = event.currentTarget;

        if (btn) {
            let leafSize = window.getComputedStyle(btn).getPropertyValue("scale");
            btn.style.scale = `calc(${leafSize} + 0.05)`;
        }
    }

    function leafLeave(event) {
        let btn = event.currentTarget;

        if (btn) {
            btn.style.scale = "";
        }
    }

    function leaveBtn(text, imgSrc) {
        return (
            <>
                <div className="leaveBtn" onMouseOver={leafHover} onMouseLeave={leafLeave} style={{ width: "min-content" }}>
                    <span style={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={imgSrc} alt="iconBtn" style={{ margin: 0, width: "var(--icon)", height: "var(--icon)", zIndex: 4 }} />
                        <p style={{ zIndex: 4 }}>{text}</p>
                    </span>
                    <img className="leafImg" style={{ overflow: "visible", left: 0, top: 0, objectFit: "cover", width: "100%", height: "100%", position: "absolute", zIndex: -1 }} src={leafIcon} alt="leafIcon" />
                </div>
            </>
        )
    }

    return (
        <>
            <div className={`navContainer${isReverse ? " reverse" : ""}`} style={{ position: "fixed", right: 0, background: "var(--fifthly)", borderBottomLeftRadius: "100%", zIndex: 999 }}>
                <ul>
                    <img
                        ref={logoRef}
                        src={logo}
                        className="littleLemonLogo"
                        style={{ zIndex: 999 }}
                        onClick={() => setIsReverse((prev) => !prev)}
                    />
                    <span style={{ position: "absolute" }}>
                        {leaveBtn("Home", homeIcon)}
                        {leaveBtn("About", aboutIcon)}
                        {leaveBtn("Menu", menuIcon)}
                        {leaveBtn("Order", orderIcon)}
                        {leaveBtn("Reserve", reserveIcon)}
                    </span>
                </ul>
            </div>

            <div style={{ position: "relative", display: "flex", justifyContent: "start", alignItems: "end", margin: "0 9.583vw" }}>
                <t>{pageTitle}</t>
            </div>
        </>
    )
}

export default function init() {
    return (
        <Nav />
    )
}
