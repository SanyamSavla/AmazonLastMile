import React from 'react';
import './Table.css';

const Table = ({ data, setData }) => {
  // Assuming each item in data has keys that match the table columns

  const handleInputChange = (index, name, value) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setData(updatedData);
  };

  // Generate table headers based on the first item's keys, if data is not empty
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <table className="audit-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header.replace(/([A-Z])/g, ' $1').trim()}</th> // Format the header
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={`${header}-${index}`}>
                {header.toLowerCase().includes('value') || header === 'comments' ? (
                  <input
                    type={header === 'comments' ? 'text' : 'number'}
                    className="input"
                    value={item[header]}
                    onChange={(e) => handleInputChange(index, header, e.target.value)}
                  />
                ) : header === 'flagAsKDI' ? (
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={item[header]}
                    onChange={(e) => handleInputChange(index, header, e.target.checked)}
                  />
                ) : (
                  item[header]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
