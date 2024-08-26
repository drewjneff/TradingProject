import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "./helpers/AppContext";
import Gallery from "./components/Gallery/Gallery";
import "./Main.less";

function Main() {
    const { sidebarTab, setSidebarTab } = useContext(AppContext);

    const renderMainContent = () => {
        const contentMap = {
            Dashboard: <div>DASHBOARD</div>,
            Portfolio: <div>PORTFOLIO</div>,
            Gallery: <Gallery />,
        };

        return contentMap[sidebarTab] || null;
    };

    return (
        <div className="layout">
            <div className="header">
                <div className="title">Algo Trading Workshop 2024</div>
                <FontAwesomeIcon icon={faArrowTrendUp} />
            </div>
            <div className="layout-cols">
                <div className="sidebar">
                    <div
                        className={`menu-item ${
                            sidebarTab == "Dashboard" ? "active" : ""
                        }`}
                        onClick={() => setSidebarTab("Dashboard")}
                    >
                        Dashboard
                    </div>
                    <div
                        className={`menu-item ${
                            sidebarTab == "Portfolio" ? "active" : ""
                        }`}
                        onClick={() => setSidebarTab("Portfolio")}
                    >
                        Portfolio
                    </div>
                    <div
                        className={`menu-item ${
                            sidebarTab == "Gallery" ? "active" : ""
                        }`}
                        onClick={() => setSidebarTab("Gallery")}
                    >
                        Gallery
                    </div>
                </div>
                <div className="main-content">
                    {renderMainContent(sidebarTab)}
                    {/* <div className="chart-container">Chart</div> */}
                </div>
            </div>
            <div className="footer">
                Drew Neff 2024.&nbsp;&nbsp;&nbsp;All Rights Reserved.
            </div>
        </div>
    );
}

export default Main;
