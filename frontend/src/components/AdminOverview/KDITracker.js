import React from 'react';
import './KDITracker.css';

const KDITracker = () => {
  return (
    <div className="kdi-tracker">
      <table>
        <thead>
          <tr>
            <th>Site ID</th>
            <th>Ticket ID</th>
            <th>Description</th>
            <th>Ticket Status</th>
            <th>Raised On</th>
            <th>Owner</th>
            <th>ETA</th>
            <th>Location</th>
            <th>Auditor</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
};

export default KDITracker;
