import React from 'react';
import './Header.css'; // make sure to create a Header.css file for styling

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        {/* Insert Amazon logo image here. Replace `logo.png` with the path to your logo file. */}
        <img src="/Users/siddharthpurohit/logo.png" alt="Amazon" className="logo" />
      </div>
      <nav className="navigation-items">
        <ul>
          <li>Site Overview</li>
          <li>Key Learnings</li>
          <li>Audit Logs</li>
          <li>Admin Overview</li>
        </ul>
      </nav>
      <div className="header-section">
        <h1>DQQ1 - Interior Audit Checklist</h1>
        {/* Additional elements like a user profile or settings can be added here */}
      </div>
    </div>
  );
};

export default Header;
