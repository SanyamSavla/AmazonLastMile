import React from 'react';
import './Table.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
 // eslint-disable-next-line

const Table = ({ data, setData, onInputChange }) => {
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
  // const renderStatusIcon = (status) => {
  //   switch (status) {
  //     case 'Match':
  //       return <FontAwesomeIcon icon={faCheck} className="text-success" />;
  //     case 'Mismatch':
  //       return <FontAwesomeIcon icon={faTimes} className="text-danger" />;
  //     default:
  //       return ''; // Empty string for empty or undefined status
  //   }
  // };
  // const [isChecked, setIsChecked] = useState(false);

  // const toggleCheckbox = () => {
  //   setIsChecked(!isChecked);
  // };
  return (
    <table className="audit-table">
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Current Value</th>
          <th>Actual Value</th>
          {/* <th>Match Status</th> */}
          {/* <th>Audit Score</th> */}
          <th>Comments</th>
          <th>Flag as KDI</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.displayName}</td>
            <td>{item.currentValue}</td>
            <td>
              <input
                type="text"
                className="input"
                value={item.actualValue}
                // onChange={(e) => handleActualValueChange(index, e.target.value)}
                onChange={(e) => onInputChange(index, 'actualValue', e.target.value)}
              />
            </td>
            {/* <td className="status-cell">
              {item.matchStatus ? '✔️' : ''}
            </td>
            <td className="score-cell">
              {item.auditScore || ''}
            </td> */}
            {/* <td>{renderStatusIcon(item.matchStatus)}</td> */}

            <td>
              <input
                type="text"
                className="input"
                value={item.comments}
                // onChange={(e) => handleCommentChange(index, e.target.value)}
                onChange={(e) => onInputChange(index, 'comments', e.target.value)}
              />
            </td>
            {/* <td>
              <input
                type="checkbox"
                className="checkbox"
                checked={item.flagAsKDI}
                // onChange={() => handleFlagAsKDIChange(index)}
                // onChange={(e) => onInputChange(index, 'flagAsKDI', e.target.value)}
                onChange={(e) => onInputChange(index, 'flagAsKDI', e.target.checked)}

              />
            </td> */}
            <td>
              {['pick_cart_staging', 'pickcartsperroute', 'inductstations_manual','induct_stations_asl','loading_spots','manualfingers','adtafingers',].includes(item.attribute) && (
                <input
                  type="checkbox"
                  checked={item.flagAsKDI}
                  onChange={(e) => onInputChange(index, 'flagAsKDI', e.target.checked)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
