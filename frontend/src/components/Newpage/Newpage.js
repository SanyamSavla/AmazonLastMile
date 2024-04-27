import React, { useState,useEffect } from 'react';
import Header from '../Header/Header'; // Corrected path
import Navigation from '../Navigation/Navigation'; // Corrected path
import Table from '../Table/Table'; // Corrected path
import Footer from '../Footer/Footer'; // Corrected path


const startPage = () => {
  const tabs = ['Enter Details of Audit'];
  // const [activeTab, setActiveTab] = useState('Inbound');
  // const [data, setData] = useState([]); 
  
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

  // return (
  //   <>
      // <Header />
      // <Navigation tabs={['Inbound', 'Staging', 'Loading', 'Parking', 'Module 5', 'Module 6', 'Module 7']} activeTab={activeTab} setActiveTab={setActiveTab} />
      // <div className="content">
      //   <Table data={data} setData={setData} />
      // </div>
      // <Footer />
  //     {/* ... */}
  //   </>
  // );
  return (
    <>
      <Header />
      <Navigation tabs={tabs}  />
      <div className="content">
        {/* Pass the data array directly to the Table component */}
       
      </div>
      <Footer />
    </>
  );
};

export default startPage;
