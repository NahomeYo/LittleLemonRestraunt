import { useEffect, useState } from "react";
import Footer from "./Footer.js";
import "./App.css";
import { FallingLemonsColored } from "./fallingLemons";
import Skyline from "./img/skyline.svg";
import {
    clearStoredAuth,
    fetchAvailabilityByDate,
    loginUserRequest,
    readStoredAuth,
    registerUserRequest,
    storeAuth,
    submitReservationWithRefresh,
} from "./apiClient";

const FALLBACK_TIMES = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
];

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

async function getTimesForDate(dateInput) {
    const date = toDate(dateInput);
    const dateValue = toDateInputValue(date);

    try {
        const response = await fetchAvailabilityByDate(dateValue);
        if (!response.ok) {
            throw new Error("Availability request failed");
        }

        const data = await response.json();
        return Array.isArray(data.times) ? data.times : [];
    } catch (_error) {
        if (typeof window.fetchAPI === "function") {
            return window.fetchAPI(date) ?? [];
        }

        return FALLBACK_TIMES;
    }
}

export function initializeTimes() {
    return FALLBACK_TIMES;
}

export async function updateTimes(selectedDate) {
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
    const [authData, setAuthData] = useState({ username: "", password: "" });
    const [accessToken, setAccessToken] = useState("");
    const [authUser, setAuthUser] = useState("");
    const [authFeedback, setAuthFeedback] = useState("");
    const [authBusy, setAuthBusy] = useState(false);

    useEffect(() => {
        const storedAuth = readStoredAuth();
        if (storedAuth.accessToken) {
            setAccessToken(storedAuth.accessToken);
            setAuthUser(storedAuth.username);
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        updateTimes(formData.date).then((times) => {
            if (!isMounted) {
                return;
            }

            setAvailableTimes(times);
            setFormData((previous) => ({
                ...previous,
                time: times.includes(previous.time) ? previous.time : (times[0] ?? ""),
            }));
        });

        return () => {
            isMounted = false;
        };
    }, [formData.date]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: name === "guests" ? Number(value) : value,
        }));
    }

    function handleAuthInputChange(event) {
        const { name, value } = event.target;
        setAuthData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    async function registerUser() {
        if (!authData.username || !authData.password) {
            setAuthFeedback("Add a username and password to register.");
            return;
        }

        setAuthBusy(true);
        setAuthFeedback("");

        try {
            const { response, body } = await registerUserRequest({
                username: authData.username,
                password: authData.password,
            });

            if (!response.ok) {
                const message = body.username?.[0] || body.password?.[0] || body.detail || "Registration failed.";
                setAuthFeedback(message);
                return;
            }

            setAuthFeedback("Account created. Now log in. Ask admin to assign Manager/Admin role for booking writes.");
        } catch (_error) {
            setAuthFeedback("Could not register. Check if backend is running.");
        } finally {
            setAuthBusy(false);
        }
    }

    async function loginUser() {
        if (!authData.username || !authData.password) {
            setAuthFeedback("Add username and password to log in.");
            return;
        }

        setAuthBusy(true);
        setAuthFeedback("");

        try {
            const { response, body } = await loginUserRequest({
                username: authData.username,
                password: authData.password,
            });

            if (!response.ok) {
                setAuthFeedback(body.detail || "Invalid credentials.");
                return;
            }

            storeAuth({
                access: body.access,
                refresh: body.refresh,
                username: authData.username,
            });
            setAccessToken(body.access);
            setAuthUser(authData.username);
            setAuthFeedback("Logged in successfully.");
        } catch (_error) {
            setAuthFeedback("Could not log in. Check if backend is running.");
        } finally {
            setAuthBusy(false);
        }
    }

    function logoutUser() {
        clearStoredAuth();
        setAccessToken("");
        setAuthUser("");
        setAuthFeedback("Logged out.");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let success = false;

        try {
            const response = await submitReservationWithRefresh(
                formData,
                accessToken,
                setAccessToken,
            );

            if (response.status === 401 || response.status === 403) {
                if (response.status === 401) {
                    logoutUser();
                    setAuthFeedback("Session expired. Please log in again.");
                }
                window.alert("Booking write access requires a logged-in user with Manager/Admin role.");
                return;
            }

            success = response.ok;
        } catch (_error) {
            if (typeof window.submitAPI === "function") {
                success = window.submitAPI(formData);
            }
        }

        if (success) {
            window.alert(`Reservation confirmed for ${formData.date} at ${formData.time} for ${formData.guests} guest(s).`);
            return;
        }

        window.alert("Reservation could not be submitted. Please try a different time.");
    }

    return (
        <div style={{ height: "100%" }}>
            <form className="reservationBox" onSubmit={handleSubmit}>
                <div className="reservationAuthPanel">
                    <p style={{ color: "var(--fourthly)" }} className="footerHeading">Account Access</p>
                    {authUser ? (
                        <div className="reservationAuthRow">
                            <p>Signed in as <strong>{authUser}</strong></p>
                            <button type="button" className="thirdlyButton" onClick={logoutUser}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <div className="reservationAuthFields">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    aria-label="Username"
                                    value={authData.username}
                                    onChange={handleAuthInputChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    aria-label="Password"
                                    value={authData.password}
                                    onChange={handleAuthInputChange}
                                />
                            </div>
                            <div className="reservationAuthActions">
                                <button type="button" className="thirdlyButton" onClick={loginUser} disabled={authBusy}>Login</button>
                                <button type="button" className="secondaryButton" onClick={registerUser} disabled={authBusy}>Register</button>
                            </div>
                        </>
                    )}
                    {authFeedback && <p className="reservationAuthFeedback">{authFeedback}</p>}
                </div>

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
