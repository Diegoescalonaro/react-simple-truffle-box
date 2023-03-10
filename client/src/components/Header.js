import React from "react";

import "./Header.css";

export default class Header extends React.Component {

    render() {
        return (
            <div className="Header">
                <h1>Ready to go! 🚀</h1>
                <p> Your Truffle Box has been succesfully installed ⚙️ </p>
                <p> The default Smart Contract has been compiled and deployed on testnet 🧪 </p>
                <br />
            </div>
        )
    }
}