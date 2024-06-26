import React from 'react';
import './Footer.css';

const Footer = ({ onHold, onSave, onComplete }) => {
  return (
    <div className="footer">
      <button className="button" onClick={onHold}>Hold Deployment</button>
      <button className="button button-primary" onClick={onSave}>Save</button>
      <button className="button button-danger" onClick={onComplete}>Mark as complete</button>
    </div>
  );
};

export default Footer;
