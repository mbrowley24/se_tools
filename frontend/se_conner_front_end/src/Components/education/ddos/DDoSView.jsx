import React from "react";
import Header from "../../header/Header";
import DDoS from "./DDoS";
import "../../../css/ddos/ddos.css"
import HackerBot from "./HackerBot";


function DDoSView() {
    return (
        <div>
            <Header />
            <div className="ddos_container">
                <DDoS />
            </div>
        </div>
    );
}

export default DDoSView;