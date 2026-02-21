import { useEffect, useState } from "react";
import Footer from "./Footer.js";
import "./App.css";
import { FallingLemonsColored } from "./fallingLemons";
import Skyline from "./img/skyline.svg";

const FALLBACK_TIMES = ["17:00", "18:00", "19:00", "20:00", "21:00"];

function toDate(dateInput) {
    if (dateInput instanceof Date) {
        return dateInput;
    }

    if (typeof dateInput === "string" && dateInput) {
        const [year, month, day] = dateInput.split("-").map(Number);
        return new Date(year, month - 1, day);
    }

    return new Date();
}

function toDateInputValue(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getTimesForDate(dateInput) {
    const date = toDate(dateInput);

    if (typeof window.fetchAPI === "function") {
        return window.fetchAPI(date) ?? [];
    }

    return FALLBACK_TIMES;
}

export function initializeTimes() {
    return getTimesForDate(new Date());
}

export function updateTimes(selectedDate) {
    return getTimesForDate(selectedDate);
}

export function Reserve() {
    const today = toDateInputValue(new Date());
    const [availableTimes, setAvailableTimes] = useState(() => initializeTimes());
    const [formData, setFormData] = useState({
        date: today,
        time: "",
        guests: 1,
        occasion: "",
    });

    useEffect(() => {
        const times = updateTimes(formData.date);
        setAvailableTimes(times);
        setFormData((previous) => ({
            ...previous,
            time: times.includes(previous.time) ? previous.time : (times[0] ?? ""),
        }));
    }, [formData.date]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: name === "guests" ? Number(value) : value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const success = typeof window.submitAPI === "function"
            ? window.submitAPI(formData)
            : true;

        if (success) {
            window.alert(`Reservation confirmed for ${formData.date} at ${formData.time} for ${formData.guests} guest(s).`);
            return;
        }

        window.alert("Reservation could not be submitted. Please try a different time.");
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
                    <select
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                    >
                        {availableTimes.map((time) => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
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

                <button type="submit" style={{ zIndex: 1, width: "100%" }} className="secondaryButton">
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
