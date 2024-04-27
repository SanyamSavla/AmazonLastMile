// import React from 'react';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuditPage from './components/AuditPage/AuditPage'; // Update this path if necessary
import Newpage from './components/Newpage/Newpage'; // This path should be correct
import './App.css'; // Your global styles
import SiteIdForm from './components/Home/home'; // This path should be correct



const App = () => {
  // const tabs = ['Inbound', 'Staging', 'Loading', 'Parking', 'Module 5', 'Module 6', 'Module 7'];
  // const [activeTab, setActiveTab] = useState('Inbound');
  // const [data, setData] = useState([
  //   { attribute: 'Induct mechanisms', currentValue: 14, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'Induct stations', currentValue: 5, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'Staging locations', currentValue: 16, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'No of dock doors', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   // ... more rows
  // ]);

  // Handlers for Footer
  const handleHoldDeployment = () => {
    // Logic to hold deployment
  };

  const handleSave = () => {
    // Logic to save data
  };

  const handleComplete = () => {
    // Logic to mark as complete
  };

  return (
    <Router>
      <div className="App">
      {/* <nav>
          <Link to="/">Home</Link> | <Link to="/audit">Audit Page</Link>
        </nav> */}
        <Routes>
          <Route exact path="/" element={<AuditPage /> } />
          <Route path="/new_start" element={<Newpage />} />
          <Route path="/home" element={<SiteIdForm />} />
          {/* Add other routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

