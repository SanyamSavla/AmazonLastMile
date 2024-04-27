import React from 'react';
import './Navigation.css';

const Navigation = ({ activeTab, onTabClick, tabs }) => {
  return (
    <div className="navigation">
      {tabs.map((tabName) => (
      <button
        key={tabName}
        className={activeTab === tabName ? 'active' : ''}
        onClick={() => onTabClick(tabName)}
      >
        {tabName}
      </button>
    ))}
    </div>
  );
};

export default Navigation;
