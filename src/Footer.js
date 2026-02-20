import { LittleLemonLogo } from "./fallingLemons";
import './App.css';
import Fiver from "./img/fiver.svg";
import Linkedln from "./img/linkedln.svg";
import Upwork from "./img/upwork.svg";
import sideLemon from "./img/sideLemonOutline.png";
import lemonBottom from "./img/lemonBkg.svg";

export function Footer() {
    return (
        <>
            <div className="Footer" style={{ background: "var(--primary)", padding: "4.7915vw 9.583vw" }}>
                <div className="content" style={{ position: "relative", display: "flex", gap: "var(--padding)", zIndex: 2 }}>
                    <span style={{ flexGrow: 0, flexBasis: "20%" }}>
                        <div style={{ width: "100%" }}>
                            <LittleLemonLogo color="var(--thirdly)" />
                        </div>
                        <p>331 E Chicago Ave Chicago, IL 60602 USA</p>
                    </span>

                    <span style={{ flexGrow: 0, position: "relative", flexBasis: "20%" }}>
                        <a>Sitemap</a>
                        <p>Home</p>
                        <p>About</p>
                        <p>Menu</p>
                        <p>Reservation</p>
                        <p>Order Online</p>
                    </span>

                    <span style={{ display: "flex", flexDirection: "column", flexGrow: 2, flexBasis: "60%" }}>
                        <p style={{ flexGrow: 0, display: "flex", alignItems: "flex-start", justifyContent: "flex-start", textAlign: "start" }}>Subscribe to our Email Newsletter</p>
                        <input type="text" style={{
                            height: "100%", flexBasis: "100%", flexGrow: 2, borderRadius: "20px", textAlign: "start",
                            padding: "10px",
                            boxSizing: "border-box",
                            resize: "none"
                        }} />
                        <div className="secondaryButton" style={{ flexGrow: 0 }}>
                            Subscribe
                        </div>
                    </span>
                </div>

                <div style={{ position: "relative", display: "flex", marginTop: "calc(var(--padding) / 2)", zIndex: 2 }}>
                    <p style={{ color: "var(--thirdly)", flexGrow: 1, flexBasis: "80%" }}>Copyright @2025 Little Lemon / All rights reserved / privacy</p>

                    <span className="iconRow" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexBasis: "20%" }}>
                        <img src={Fiver} />
                        <img src={Linkedln} />
                        <img src={Upwork} />
                    </span>
                </div>

                <img src={lemonBottom} style={{ position: "absolute", zIndex: 0, left: 0, bottom: 0, width: "100%" }} />
            </div>
        </>
    )
}

export default function init() {
    return (
        <>
            <Footer />
        </>
    )
}
