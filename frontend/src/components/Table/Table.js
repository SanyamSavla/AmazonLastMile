import React from 'react';
import './Table.css';

const Table = ({ data, setData }) => {
  // Function to handle changes in the 'Actual Value' inputs
  const handleActualValueChange = (index, value) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, actualValue: value } : item
    );
    setData(updatedData);
  };

  // Function to handle changes in the 'Comments' inputs
  const handleCommentChange = (index, value) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, comments: value } : item
    );
    setData(updatedData);
  };

  // Function to handle changes in the 'Flag as KDI' checkboxes
  const handleFlagAsKDIChange = (index) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, flagAsKDI: !item.flagAsKDI } : item
    );
    setData(updatedData);
  };

  return (
    <table className="audit-table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Current Value</th>
          <th>Actual Value</th>
          <th>Match Status</th>
          <th>Audit Score</th>
          <th>Comments</th>
          <th>Flag as KDI</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.attribute}</td>
            <td>{item.currentValue}</td>
            <td>
              <input
                type="text"
                className="input"
                value={item.actualValue}
                onChange={(e) => handleActualValueChange(index, e.target.value)}
              />
            </td>
            <td className="status-cell">
              {item.matchStatus ? '✔️' : ''}
            </td>
            <td className="score-cell">
              {item.auditScore || ''}
            </td>
            <td>
              <input
                type="text"
                className="input"
                value={item.comments}
                onChange={(e) => handleCommentChange(index, e.target.value)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="checkbox"
                checked={item.flagAsKDI}
                onChange={() => handleFlagAsKDIChange(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
