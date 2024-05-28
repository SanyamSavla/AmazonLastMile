// import React, { useState } from 'react';
import './AdminOverview.css';
import React, { useEffect, useState } from 'react';

const AdminOverview = () => {
    // useEffect(() => {
    //     fetch('http://localhost:8000/admin') // Ensure this is the correct endpoint
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => setData(data))
    //         .catch(error => setError(error));
    // }, []);

    // useEffect(() => {
    //     fetch('/admin')
    //         .then(response => response.json())
    //         .then(data => setData(data));
    // }, []);
    const [activeTab, setActiveTab] = useState('kdiTracker');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10); // You can make this configurable

    const fetchData = (page) => {
        setLoading(true);
        fetch(`http://localhost:8000/admin?page=${page}&per_page=${perPage}`) // Ensure this is the correct endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data.data);
                setTotalPages(data.pages);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);
  const renderContent = () => {
    switch (activeTab) {
       case 'kdiTracker':
        return (
          <div className="kdi-tracker">
            <h2>KDI Tracker</h2>
            {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
            <table>
              <thead>
                <tr>
                  <th>Site ID</th>
                  {/* <th>Ticket ID</th> */}
                  <th>Attribute Logs</th>
                  {/* <th>Ticket Status</th> */}
                  <th>Audit Date</th>
                  <th>Auditor Name</th>
                  {/* <th>Existing Value</th> */}
                  <th>Location</th>
                  <th>New Value</th>
                </tr>
              </thead>
              <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.site_id}</td>
                            <td>{item.attribute_logs}</td>
                            <td>{new Date(item.audit_date).toLocaleString()}</td>
                            <td>{item.auditor_name}</td>
                            {/* <td>{item.existing_value}</td> */}
                            <td>{item.location}</td>
                            <td>{item.new_value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                                    <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button>
                                    <span>Page {page} of {totalPages}</span>
                                    <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>Next</button>
                                </div>
          </div>
        );
      case 'trendsMetrics':
        return <div className="trends-metrics">Trends & Metrics content goes here...</div>;
      case 'auditLogs':
        return <div className="audit-logs">Audit Logs content goes here...</div>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-overview">
      <h2>Admin Overview</h2>
      <nav className="sub-nav">
        <ul>
          <li className={activeTab === 'kdiTracker' ? 'active' : ''} onClick={() => setActiveTab('kdiTracker')}>KDI Tracker</li>
          {/* <li className={activeTab === 'trendsMetrics' ? 'active' : ''} onClick={() => setActiveTab('trendsMetrics')}>Trends & Metrics</li> */}
          <li className={activeTab === 'auditLogs' ? 'active' : ''} onClick={() => setActiveTab('auditLogs')}>Audit Logs</li>
        </ul>
      </nav>
      {renderContent()}
    </div>
  );
};

export default AdminOverview;