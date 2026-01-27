import Footer from "./Footer.js";
import "./App.css";
import { FallingLemonsColored } from "./fallingLemons";
import Skyline from "./img/skyline.svg";

export function Reserve() {
    return (
        <div style={{ height: "100%" }}>
            <form className="reservationBox" style={{ gap: "var(--padding)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", margin: "0 9.583vw 5rem 9.583vw", borderRadius: "var(--borderRadius)", overflow: "hidden", background: "var(--secondary)", position: "relative", padding: "var(--padding) calc(var(--padding) * 2)" }}>

                <div className="line">
                    <h3>Date</h3>
                    <input type="date" style={{
                        height: "100%", flexBasis: "100%", flexGrow: 2, borderRadius: "20px", textAlign: "start",
                        padding: "10px",
                        boxSizing: "border-box",
                        resize: "none"
                    }} />
                </div>

                <div className="line">
                <h3>Time</h3>
                    <input type="time" style={{
                        height: "100%", flexBasis: "100%", flexGrow: 2, borderRadius: "20px", textAlign: "start",
                        padding: "10px",
                        boxSizing: "border-box",
                        resize: "none"
                    }} />
                </div>

                <div className="line">
                <h3># of Guests</h3>
                    <input type="number" style={{
                        height: "100%", flexBasis: "100%", flexGrow: 2, borderRadius: "20px", textAlign: "start",
                        padding: "10px",
                        boxSizing: "border-box",
                        resize: "none"
                    }} />
                </div>

                <div className="line">
                <h3>Occasion</h3>
                    <input type="text" style={{
                        height: "100%", flexBasis: "100%", flexGrow: 2, borderRadius: "20px", textAlign: "start",
                        padding: "10px",
                        boxSizing: "border-box",
                        resize: "none"
                    }} />
                </div>

                <div className="secondaryButton" style={{ flexGrow: 0 }}>
                    Make Your Reservation
                </div>

                <img style={{ position: "absolute", width: "100%", left: 0, bottom: 0, zIndex: -1 }} src={Skyline} />
                <div style={{ position: "absolute", right: "-10%", bottom: "-40%", zIndex: -1 }}>
                    <FallingLemonsColored />
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default Reserve;