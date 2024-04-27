import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AuditPage from './components/AuditPage/AuditPage'; 
import Newpage from './components/Newpage/Newpage'; 
import Home from './components/Home/Home';
import './App.css'; // Your global styles

const App = () => {

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
        <nav>
          <Link to="/">Home</Link> | <Link to="/audit">Audit Page</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<AuditPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

