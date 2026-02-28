import Footer from "./Footer.js";
import "./App.css";
import Bread from "./menuItems/bread.png";
import ChickenPasta from "./menuItems/chicken pasta.png";
import Chicken from "./menuItems/chicken.png";
import GreekSalad from "./menuItems/greek salad.png";
import LemonCake from "./menuItems/lemon cake.png";
import LemonTea from "./menuItems/lemon tea.png";
import Lemonade from "./menuItems/lemonade.png";
import Pancake from "./menuItems/pancake.png";
import Pasta from "./menuItems/pasta.png";
import Pizza from "./menuItems/pizza.png";
import RedWine from "./menuItems/red wine.png";
import Salmon from "./menuItems/salmon.png";
import StrawberryCake from "./menuItems/strawberry cake.png";
import StrawberryLemonade from "./menuItems/strawberry lemonade.png";
import Tomato from "./menuItems/tomato.png";
import VanillaCake from "./menuItems/vanilla cake.png";
import Waffle from "./menuItems/waffle.png";
import starWidthBar from "./img/starWidthBar.png";

export function Menu() {
    const sections = [
        {
            title: "Appetizers",
            items: [
                { name: "Bread", description: "Fresh baked bread served warm with herb butter.", percentage: 82, img: Bread },
                { name: "Tomato", description: "Marinated tomatoes with olive oil, basil, and sea salt.", percentage: 76, img: Tomato },
                { name: "Greek Salad", description: "Crisp greens, feta, olives, and lemon vinaigrette.", percentage: 91, img: GreekSalad },
            ],
        },
        {
            title: "Main Courses",
            items: [
                { name: "Chicken", description: "Roasted chicken with lemon, garlic, and thyme.", percentage: 88, img: Chicken },
                { name: "Salmon", description: "Pan-seared salmon with citrus glaze and herbs.", percentage: 90, img: Salmon },
                { name: "Chicken Pasta", description: "Creamy pasta with grilled chicken and parmesan.", percentage: 85, img: ChickenPasta },
                { name: "Pasta", description: "Classic pasta tossed with olive oil and basil.", percentage: 80, img: Pasta },
                { name: "Pizza", description: "Stone-baked pizza with fresh mozzarella and tomato.", percentage: 87, img: Pizza },
            ],
        },
        {
            title: "Drinks",
            items: [
                { name: "Lemonade", description: "House lemonade with a bright citrus finish.", percentage: 78, img: Lemonade },
                { name: "Strawberry Lemonade", description: "Sweet strawberries blended into fresh lemonade.", percentage: 83, img: StrawberryLemonade },
                { name: "Lemon Tea", description: "Iced tea infused with lemon and mint.", percentage: 74, img: LemonTea },
                { name: "Red Wine", description: "Bold red blend with a smooth finish.", percentage: 81, img: RedWine },
            ],
        },
        {
            title: "Desserts",
            items: [
                { name: "Lemon Cake", description: "Soft lemon sponge with a zesty glaze.", percentage: 94, img: LemonCake },
                { name: "Strawberry Cake", description: "Light cake layered with strawberries and cream.", percentage: 89, img: StrawberryCake },
                { name: "Vanilla Cake", description: "Classic vanilla cake with whipped buttercream.", percentage: 86, img: VanillaCake },
                { name: "Pancake", description: "Fluffy pancakes with syrup and berries.", percentage: 84, img: Pancake },
                { name: "Waffle", description: "Golden waffles with citrus honey drizzle.", percentage: 88, img: Waffle },
            ],
        },
    ];

    return (
        <>
            <div className="menuPage">
                {sections.map((section) => (
                    <section key={section.title} className="menuSection" style = {{ overflow: "visible" }}>
                        <div className="menuSec" style={{ position: "relative", display: "flex" }}>
                            <t style = {{ textTransform: "none", color: "var(--fourthly)"}}>{section.title}</t>
                            <t className="sectionCenter" style = {{ color: "var(--secondary)" }}>{section.title}</t>
                        </div>
                        <div className="menuRow">
                            <div className="menuRowTrack" style = {{ overflow: "visible" }}>
                                {[...section.items, ...section.items].map((item, index) => (
                                    <article key={`${item.name}-${index}`} className="menuItem">
                                        <div className="menuItemThumb">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="menuItemBody">
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                            <div className="menuItemRating">
                                                <div
                                                    className="testimonialStarsMask"
                                                    style={{
                                                        width: "7.3rem",
                                                        height: "1.4rem",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <img
                                                        src={starWidthBar}
                                                        alt=""
                                                        style={{
                                                            width: `${item.percentage}%`,
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            objectPosition: "left center",
                                                            filter: "brightness(1.25)"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <Footer />
        </>
    )
}

export default Menu;
