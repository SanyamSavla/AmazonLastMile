import React, { useState } from 'react';
import Header from '../Header/Header'; // Corrected path
import Navigation from '../Navigation/Navigation'; // Corrected path
import Table from '../Table/Table'; // Corrected path
import Footer from '../Footer/Footer'; // Corrected path

const AuditPage = () => {
  const tabs = ['Inbound', 'Staging', 'Loading', 'Parking'];
  const [activeModule, setActiveModule] = useState('Inbound');
  const moduleData = {
    Inbound: [
      { attribute: 'Type of induct mechanism', currentValue: 14, actualValue: '', comments: '', flagAsKDI: false },
    { attribute: 'No of induct stations', currentValue: 5, actualValue: '', comments: '', flagAsKDI: false },
    { attribute: 'No of staging locations', currentValue: 16, actualValue: '', comments: '', flagAsKDI: false },
    { attribute: 'No of dock doors', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
    ],
    Staging: [
      { attribute: 'Amount of staging lanes', currentValue: 20, actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'Amount of carts per lane', currentValue: 18, actualValue: '', comments: '', flagAsKDI: false },
    ],
    Loading: [
      { attribute: 'Type of loading', currentValue: 'Interior', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'No of launchpads', currentValue: 18, actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'No of rows in launchpads', currentValue: 5,actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'No of lanes in launchpads', currentValue: 18, actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'No of loading spots', currentValue: 31, actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'No of que pads', currentValue: 16, actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'No of que spots', currentValue: 18, actualValue: '', comments: '', flagAsKDI: false },
    ],
    Parking: [
      { attribute: 'Number of van parking spots', currentValue: 20, actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'Number of associate parking spots', currentValue: 18, actualValue: '', comments: '', flagAsKDI: false },
    ],
  };
  const [data, setData] = useState(moduleData[activeModule]);

  const handleTabClick = (moduleName) => {
    console.log('Selected module:', moduleName); // Check which module was clicked
    console.log('Data for module:', moduleData[moduleName]); // Log out data for debugging
    setActiveModule(moduleName);
    setData(moduleData[moduleName]); // Update the state with the module-specific data
  };
  

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
    <>
      <Header />
      <Navigation tabs={tabs} activeTab={activeModule} onTabClick={handleTabClick} />
      <div className="content">
        <Table data={data} setData={setData} />
      </div>
      <Footer />
    </>
  );
};

export default AuditPage;
