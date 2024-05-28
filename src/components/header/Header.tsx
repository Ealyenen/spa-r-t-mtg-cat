import React from "react";
import Watch from "../UI/watch/Watch";
import LangSwitch from "./langSwitch/LangSwitch";

class Header extends React.Component<{}, {}> {
    render() {
        return (
            <section className="header-section">
                <img
                    className="header-img"
                    src="https://bogatyr.club/uploads/posts/2023-03/1679137718_bogatyr-club-p-volshebnii-kot-foni-instagram-12.jpg"
                    alt="cat-img"
                />
                <Watch />
                <LangSwitch/>
            </section>
        )
    }
}

export default Header