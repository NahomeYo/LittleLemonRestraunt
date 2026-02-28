import { FallingLemonsColored, LittleLemonLogo } from "./fallingLemons";
import Skyline from "./img/skyline.svg";
import Thumbnail001 from "./img/restrauntFood.png";
import { TestamonialSheet, SpecialsSheet } from "./stylesheet.js";
import Workers from "./img/Mario and Adrian b 2.png";
import Chef from "./img/restaurant chef B 1.png";
import Food from "./img/restaurant 3.png";
import Interior from "./img/restaurant 4.png";
import sherryHeadShot from "./img/sherryHeadShot.png";
import johnHeadshot from "./img/johnHeadshot.png";
import trishHeadShot from "./img/trishHeadShot.png";
import josephHeadshot from "./img/josephHeadshot.png";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";

import "./App.css";

export function Home() {
    const navigate = useNavigate();

    const Box = () => {
        return (
            <div className="homeHero" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 9.583vw", borderRadius: "var(--borderRadius)", overflow: "hidden", background: "var(--secondary)", position: "relative", padding: "var(--padding)", gap: "var(--sectionSpacing)" }}>
                <span className="homeHeroContent" style={{ zIndex: 1, width: "50%" }}>
                    <LittleLemonLogo color="var(--thirdly)" />

                    <p><span className="dropCap">W</span>e are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>

                    <button type="button" className="secondaryButton" onClick={() => navigate("/Reserve")}>
                        Reserve a Table
                    </button>
                </span>

                <span className="homeHeroImageWrap" style={{ display: "flex", justifyContent: "center", zIndex: 1 }}>
                    <img src={Thumbnail001} alt="Little Lemon plated dish" style={{ width: "100%", height: "450px", borderRadius: "var(--borderRadius)", objectFit: "cover" }} />
                </span>

                <img style={{ position: "absolute", width: "100%", left: 0, bottom: 0, zIndex: 0 }} src={Skyline} alt="" />
                <div style={{ position: "absolute", right: "-10%", bottom: "-40%" }}>
                    <FallingLemonsColored />
                </div>
            </div>
        )
    }

    const TestamonialBox = () => {
        return (
            <div className="TestamonialBox" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", margin: "var(--margin)", borderRadius: "var(--borderRadius)", overflow: "hidden", position: "relative", padding: "var(--padding) calc(var(--padding) * 2)", gap: "var(--padding)" }}>
                <span className="boxTopRow" style={{ gap: "var(--sectionSpacing)" }}>
                    <button type="button" style={{ flexGrow: 2 }} className="secondaryButton">View All</button>
                    <h1 className="boxHeader" style={{ flexGrow: 0 }}>Testamonials</h1>
                </span>

                <span className="testimonialGrid" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", width: "100%", gap: "var(--padding)" }}>
                    <TestamonialSheet imgSrc={sherryHeadShot} cusName="Sherry S." role="Costumer" rating="100%" testamonial="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
                    <TestamonialSheet imgSrc={johnHeadshot} cusName="John C." role="Costumer" rating="80%" testamonial="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." />
                    <TestamonialSheet imgSrc={trishHeadShot} cusName="Trish A." role="Costumer" rating="100%" testamonial="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." />
                    <TestamonialSheet imgSrc={josephHeadshot} cusName="Joseph J." role="Costumer" rating="100%" testamonial="Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
                </span>

                <div style={{ borderRadius: "var(--borderRadius)", overflow: "hidden", background: "var(--secondary)", position: "absolute", zIndex: 0, width: "100%", height: "90%", left: 0, top: 0 }}>
                    <img style={{ position: "absolute", width: "100%", left: 0, bottom: 0 }} src={Skyline} alt="" />
                    <div style={{ position: "absolute", left: "-10%", bottom: "-20%", transform: "scaleX(-1)" }}>
                        <FallingLemonsColored />
                    </div>
                </div>
            </div>
        )
    }

    const SpecialsBox = () => {
        return (
            <div className="SpecialsBox" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", margin: "var(--margin)", overflow: "hidden", position: "relative", gap: "var(--padding)" }}>
                <span className="boxTopRow" style={{ gap: "var(--sectionSpacing)" }}>
                    <h1 className="sectionHeader" style={{ flexGrow: 0 }}>Specials</h1>
                    <button type="button" style={{ flexGrow: 2 }} className="thirdlyButton" onClick={() => navigate("/Menu")}>Online Menu</button>
                </span>

                <span className="specialsGrid" style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", width: "100%", gap: "var(--padding)" }}>
                    <SpecialsSheet background="var(--secondary)" imgSrc={Thumbnail001} dish="000" price="{$ PRICE}" description="000" />
                    <SpecialsSheet background="var(--primary)" imgSrc={Thumbnail001} dish="000" price="{$ PRICE}" description="000" />
                    <SpecialsSheet background="var(--secondary)" imgSrc={Thumbnail001} dish="000" price="{$ PRICE}" description="000" />
                </span>
            </div>
        )
    }

    const InfoBox = () => {
        return (
            <div id="info-box" className="infoBox" style={{ display: "flex", margin: "var(--margin)", overflow: "visible", position: "relative", gap: "var(--sectionSpacing)" }}>
                <span className="infoColumn" style={{ gap: "calc(var(--padding) / 2)", display: "flex", flexDirection: "column", position: "relative", flexBasis: "50%", flexGrow: 0 }}>
                    <div className="infoLogoWrap" style={{ width: "430px", height: "200px" }}>
                        <LittleLemonLogo color="var(--primary)" secondaryFill="var(--fourthly)" />
                    </div>

                    <p style={{ color: "var(--primary)" }}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>

                    <span style={{ display: "flex", flexGrow: 1, gap: "calc(var(--padding) / 2)" }}>
                        <img style={{ width: "50%", objectFit: "cover", boxShadow: "var(--boxShadowEffect)" }} src={Workers} alt="Little Lemon founders" />
                        <img style={{ width: "50%", objectFit: "cover", boxShadow: "var(--boxShadowEffect)" }} src={Chef} alt="Little Lemon chef" />
                    </span>
                </span>

                <span className="infoColumn" style={{ gap: "calc(var(--padding) / 2)", display: "flex", flexDirection: "column", position: "relative", flexBasis: "50%", flexGrow: 0 }}>
                    <span style={{ display: "flex", width: "100%", flexGrow: 2, gap: "calc(var(--padding) / 2)", alignItems: "end" }}>
                        <img src={Food} alt="Little Lemon menu plating" style={{ width: "30%", height: "80%", objectFit: "cover", boxShadow: "var(--boxShadowEffect)" }} />
                        <img src={Interior} alt="Little Lemon interior dining area" style={{ width: "70%", height: "100%", objectFit: "cover", boxShadow: "var(--boxShadowEffect)" }} />
                    </span>

                    <p style={{ flexGrow: 0, color: "var(--primary)" }}>At Little Lemon, our passion is to embrace the timeless flavors of the Mediterranean, infusing them with a modern twist. We're a family-owned establishment dedicated to bringing you the heartwarming traditions of our heritage, one delectable dish at a time.</p>
                </span>
            </div>
        )
    }

    return (
        <div style={{ height: "100%" }}>
            <Box />
            <SpecialsBox />
            <TestamonialBox />
            <InfoBox />
            <Footer />
        </div>
    )
}

export default Home;
