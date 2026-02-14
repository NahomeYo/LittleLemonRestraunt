import { useState } from "react";
import Footer from "./Footer.js";
import "./App.css";
import { FallingLemonsColored } from "./fallingLemons";
import Skyline from "./img/skyline.svg";

export function Reserve() {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: 1,
        occasion: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: name === "guests" ? Number(value) : value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        window.alert(`Reservation requested for ${formData.date} at ${formData.time} for ${formData.guests} guest(s).`);
    }

    return (
        <div style={{ height: "100%" }}>
            <form className="reservationBox" onSubmit={handleSubmit}>
                <span className="lineWrap">
                    <div className="line" aria-hidden="true"></div>
                    <h3>Choose Date</h3>
                    <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                    />
                </span>

                <span className="lineWrap">
                    <div className="line" aria-hidden="true"></div>
                    <h3>Choose Time</h3>
                    <input
                        type="time"
                        name="time"
                        required
                        step="900"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </span>

                <span className="lineWrap">
                    <div className="line" aria-hidden="true"></div>
                    <h3>Number Of Guests</h3>
                    <input
                        type="number"
                        name="guests"
                        min="1"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                    />
                </span>

                <span className="lineWrap">
                    <div className="line" aria-hidden="true"></div>
                    <h3>Occasion</h3>
                    <input
                        type="text"
                        name="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                    />
                </span>

                <button type="submit" className="reservationSubmit">
                    Make Your Reservation
                </button>

                <img className="reservationSkyline" src={Skyline} alt="" />
                <div className="reservationLemons">
                    <FallingLemonsColored />
                </div>
            </form>

            <Footer />
        </div>
    )
}

export default Reserve;
