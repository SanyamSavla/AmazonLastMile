import React from 'react';
import './Footer.css';

const Footer = ({ handleSave,onHold, onSave, handleComplete }) => {
  return (
    <div className="footer">
      {/* <button className="button" onClick={onHold}>Hold Deployment</button> */}
      <button className="button button-primary" onClick={handleSave}>Save discrepency to Database</button>
      {/* <button className="button button-danger" onClick={handleComplete}>Mark as complete</button> */}
    </div>
  );
};

export default Footer;
