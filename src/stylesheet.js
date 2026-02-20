import './App.css';
import sideLemonOutline from "./img/sideLemonOutline.png";
import starsMask from "./img/stars.png";
import starWidthBar from "./img/starWidthBar.png";

export const TestamonialSheet = (props) => {
    return (
        <div
            className="TestamonialSheet"
            style={{
                position: "relative",
                zIndex: 0,
                isolation: "isolate",
                background: "var(--fourthly)",
                overflow: "hidden",
                padding: "0.5rem var(--padding)",
                borderRadius: "var(--borderRadius)",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "calc(var(--padding) / 3)"
            }}
        >
            <img
                style={{
                    borderRadius: "100%",
                    width: "var(--profile)",
                    height: "var(--profile)",
                    objectFit: "cover",
                    objectPosition: "50% 50%",
                    position: "relative",
                    zIndex: 2,
                }}
                src={props.imgSrc || sideLemonOutline}
                alt=""
            />

            <div
                className="testimonialStarsMask"
                style={{
                    background: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    zIndex: 2,
                }}
            >
                <img src={starWidthBar} />
            </div>

            <span style={{ position: "relative", zIndex: 2 }}>
                <p
                    style={{
                        fontFamily: "LobsterTwo",
                        color: "var(--primary)",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                        fontSize: "1.5rem",
                    }}
                >
                    {props.cusName}
                </p>
                <p style={{ color: "var(--primary)", textAlign: "center" }}>{props.role || "Costumer"}</p>
            </span>

            <span
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    height: "100%"
                }}
            >
                <p style={{ color: "var(--primary)", fontSize: "0.75rem" }}>
                    {props.testamonial}
                </p>
                <span
                    style={{
                        zIndex: -1,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "min-content",
                        height: "min-content",
                        lineHeight: "50%",
                        fontSize: "10rem",
                        WebkitTextStroke: "2px var(--thirdly)",
                        transform: "translateX(-40px)",
                        opacity: 0.5,
                        color: "transparent",
                    }}
                >
                    "
                </span>
            </span>

            <img
                src={sideLemonOutline}
                style={{
                    transform: "scale(2) rotate(-45deg) translate(-50%, 25%)",
                    position: "absolute",
                    left: 0,
                    bottom: "25%",
                    width: "100%",
                    zIndex: -1,
                    opacity: 0.5
                }}
                alt=""
            />
        </div>
    );
};

export const SpecialsSheet = (props) => {
    return (
        <div className="SpecialsSheet" style={{ flexGrow: 2, position: "relative", background: `${props.background}`, overflow: "hidden", borderRadius: "var(--borderRadius)" }}>
            <img style={{ height: "6rem", width: "100%", objectFit: "cover", objectPosition: "50% 50%" }} src={props.imgSrc} />

            <span style={{ display: "flex", justifyContent: "space-between", flexDirection: "column", position: "relative", padding: "0.5rem var(--padding)" }}>
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "calc(var(--padding) / 2)" }}>
                    <h2 style={{ color: "var(--fourthly)" }}>{props.dish}</h2>
                    <h2 style={{ color: "var(--fifthly)", whiteSpace: "nowrap" }}>{props.price || "{$ PRICE}"}</h2>
                </span>
                <p style={{ color: "var(--thirdly)" }}>{props.description}</p>
            </span>
        </div>
    )
}

export default function init() {
    return (
        <>
            <TestamonialSheet imgSrc="" cusName="" testamonial="" />
            <SpecialsSheet background="" imgSrc="" dish="" price="" description="" />
        </>
    )
}
