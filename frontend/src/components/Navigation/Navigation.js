import React from 'react';
import './Navigation.css';

// const Navigation = ({ tabs, activeTab, setActiveTab }) => {

const Navigation = ({ activeTab, onTabClick, tabs }) => {
  return (
    <div className="navigation">
      {tabs.map(tab => ( 
        <button
          key={tab}
          className={`nav-item ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Navigation;
