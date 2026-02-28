import aboutIcon from "./img/about.svg";
import homeIcon from "./img/home.svg";
import menuIcon from "./img/menu.svg";
import reserveIcon from "./img/reserve.svg";
import leafIcon from "./img/leaf.png";
import logo from "./img/littleLemonIcon.svg"
import './App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

export const Nav = ({ setPageLoading = () => { } }) => {
    const [pageNum, setPageNum] = useState(0);
    const [pageTitle, setPageTitle] = useState("home");
    const [leafArray, setLeafArray] = useState([]);
    const [isReverse, setIsReverse] = useState(false);
    const logoRef = useRef(null);
    const hasNavInteraction = useRef(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const buttons = Array.from(document.querySelectorAll(".leaveBtn"));
        setLeafArray(buttons);
    }, []);

    useEffect(() => {
        const handlers = leafArray.map((btn, index) => {
            const handler = () => {
                hasNavInteraction.current = true;
                const isHomeOrAbout = index === 0 || index === 1;
                const isAlreadyOnHomeRoute = location.pathname === "/";
                const isSamePageSectionNav = isAlreadyOnHomeRoute && isHomeOrAbout;

                setPageLoading(!isSamePageSectionNav);
                setPageNum(index);
            };
            btn.addEventListener("click", handler);
            return { btn, handler };
        });

        return () => {
            handlers.forEach(({ btn, handler }) => {
                btn.removeEventListener("click", handler);
            });
        };
    }, [leafArray, location.pathname, setPageLoading]);

    useEffect(() => {
        if (!hasNavInteraction.current) {
            return;
        }

        const routes = [
            "/",
            "/",
            "/Menu",
            "/Reserve",
        ];

        const runNavigation = () => {
            if (pageNum === 1) {
                navigate("/");
                setPageLoading(false);

                const scrollToInfo = () => {
                    const infoBox = document.querySelector(".infoBox");
                    if (infoBox) {
                        infoBox.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                };

                if (location.pathname === "/") {
                    scrollToInfo();
                } else {
                    setTimeout(scrollToInfo, 120);
                }
                return;
            }

            if (pageNum === 0 && location.pathname === "/") {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                setPageLoading(false);
                return;
            }

            navigate(routes[pageNum] || "/");
            setPageLoading(false);
        };

        const isSamePageHomeAbout = location.pathname === "/" && (pageNum === 0 || pageNum === 1);
        const timeoutId = setTimeout(runNavigation, isSamePageHomeAbout ? 0 : 2000);

        switch (pageNum) {
            case (0):
                setPageTitle("home");
                break;
            case (1):
                setPageTitle("home");
                break;
            case (2):
                setPageTitle("menu");
                break;
            case (3):
                setPageTitle("reserve");
                break;
            default:
                break;
        }

        return () => clearTimeout(timeoutId);
    }, [location.pathname, pageNum, navigate, setPageLoading]);

    useEffect(() => {
        const handleScroll = () => {
            setIsReverse(window.scrollY >= 100);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
                        src={logo}
                        ref={logoRef}
                        alt="Little Lemon logo"
                        className={`littleLemonLogo${isReverse ? " reverse" : ""}`}
                        style={{ zIndex: 999 }}
                        onClick={() => setIsReverse((prev) => !prev)}
                    />
                    <span style={{ position: "absolute" }}>
                        {leaveBtn("Home", homeIcon)}
                        {leaveBtn("About", aboutIcon)}
                        {leaveBtn("Menu", menuIcon)}
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
