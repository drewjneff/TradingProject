import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faCircle } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "./helpers/AppContext";
import {checkServerStatus} from "./helpers/ServerHealthCheck";
import Gallery from "./components/Gallery/Gallery";
import "./Main.less";

function Main() {
    const { sidebarTab, setSidebarTab, serverStatus, setServerStatus } = useContext(AppContext);

    useEffect(() => {
        const updateServerStatus = () => {
            checkServerStatus().then(status => {
                setServerStatus(status);
            });
        };
        const intervalId = setInterval(updateServerStatus, 60000);
        updateServerStatus();
        return () => { clearInterval(intervalId)};
    }, []);

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
                    <div className='app-details'>
                        SERVER STATUS
                        <div className='server-status'>
                            <div className={`icon ${serverStatus ? '' : 'inactive'}`}>
                                <FontAwesomeIcon icon={faCircle} />
                            </div>
                            {serverStatus ? 'ACTIVE' : 'INACTIVE'}
                        </div>
                    </div>
                    <div className='sidebar-menu'>
                        <div
                            className={`menu-item ${sidebarTab == "Dashboard" ? "active" : ""
                                }`}
                            onClick={() => setSidebarTab("Dashboard")}
                        >
                            Dashboard
                        </div>
                        <div
                            className={`menu-item ${sidebarTab == "Portfolio" ? "active" : ""
                                }`}
                            onClick={() => setSidebarTab("Portfolio")}
                        >
                            Portfolio
                        </div>
                        <div
                            className={`menu-item ${sidebarTab == "Gallery" ? "active" : ""
                                }`}
                            onClick={() => setSidebarTab("Gallery")}
                        >
                            Gallery
                        </div>
                    </div>
                </div>
                <div className="main-content">
                    {renderMainContent(sidebarTab)}
                </div>
            </div>
            <div className="footer">
                Drew Neff 2024.&nbsp;&nbsp;&nbsp;All Rights Reserved.
            </div>
        </div>
    );
}

export default Main;
