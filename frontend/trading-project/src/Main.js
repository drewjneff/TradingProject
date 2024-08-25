import React, {useState} from "react";
import './Main.less';

function Main() {

  const [sidebarTab, setSidebarTab] = useState('Dashboard');

  return (
    <div className="layout">
      <div className="header">Algo Trading Workshop 2024</div>
      <div className="layout-cols">
        <div className="sidebar">
          <div 
            className={`menu-item ${sidebarTab == 'Dashboard' ? 'active' : ''}`} onClick={() => setSidebarTab('Dashboard')}>Dashboard
          </div>
          <div 
            className={`menu-item ${sidebarTab == 'Gallery' ? 'active' : ''}`}onClick={() => setSidebarTab('Gallery')}>Gallery
          </div>
        </div>
        <div className="main-content">
          <div className="chart-container">Chart</div>
          <div className="token-allocation">Token Allocation</div>
        </div>
      </div>
      <div className="footer">Drew Neff 2024.&nbsp;&nbsp;&nbsp;All Rights Reserved.</div>
    </div>
  );
}

export default Main;
