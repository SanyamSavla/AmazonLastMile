
import React, { useState, useEffect } from 'react';
import './Header.css'; // make sure to create a Header.css file for styling
import { useLocation } from 'react-router-dom';
// const location = useLocation();

const Header = () => {
  const location = useLocation();
  const { siteId } = location.state || {};

  const [headerData, setHeaderData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/get/${siteId}`);
        const data = await response.json();
        console.log(data);
        setHeaderData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [siteId]);

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
      {headerData && (
      <div className="header-section">
        <h1>{headerData.primary_site_code}</h1>
        <h1>:Interior Audit Checklist</h1>
        {/* Additional elements like a user profile or settings can be added here */}
      </div>
      )}
    </div>
  );
};

export default Header;

