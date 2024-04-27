import React, { useState,useEffect } from 'react';
import Header from '../Header/Header'; // Corrected path
import Navigation from '../Navigation/Navigation'; // Corrected path
import Table from '../Table/Table'; // Corrected path
import Footer from '../Footer/Footer'; // Corrected path
import { useLocation } from 'react-router-dom';

const attributeTitles = {
  induct_mechanism: "Induct Mechanism",
  package_inbound_truck_type: "Package Inbound Truck Type",
  package_unload_medium: "Package Unload Medium",
  dockdoorsinbound: "Number of Inbound Dock Doors",
  dockdoorsgocartreturn: "Go-cart Return Dock Doors",
  dockdoorspalletremoval: "Pallet Removal Dock Doors",
  induct_stations_asl: "Induct Stations ASL",
  inductstations_manual: "Manual Induct Stations",
  inbound_staging: "Inbound Staging",
  inbound_staging_d: "Inbound Staging D",
  // ... more mappings as needed
};

const AuditPage = () => {
  const tabs = ['Inbound', 'Staging', 'Loading', 'Parking', 'Sort'];
  // const [activeTab, setActiveTab] = useState('Inbound');

  const [activeModule, setActiveModule] = useState('Inbound');
  const location = useLocation();
  const { siteId } = location.state || {};
  // const [data, setData] = useState([]); 
  const moduleData = {
    Inbound: [
      { attribute: 'induct_mechanism', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'package_inbound_truck_type', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'package_unload_medium', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'dockdoorsinbound', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'dockdoorsgocartreturn', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'dockdoorspalletremoval', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'induct_stations_asl', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'inductstations_manual', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'inbound_staging', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'inbound_staging_d', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
   ],
    Staging: [
      { attribute: 'wavesfordispatchstaging', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'pickcartsperroute', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'pick_cart_staging', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    ],
    Loading: [
      { attribute: 'loadingtype', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'loadingside', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'loadoutdooratgrade', currentValue: '',actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'canopyoverlaunchpads', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'demisingwallinpickstagearea', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'number_of_launchpads', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'loading_spots', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'queueing_spots', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'queueing_spots_for_parking', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'associate_parking_ratio', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'queueing_spots', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    
    
    ],
    Parking: [
      { attribute: 'vanparkingconfigurationonsite', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'total_van_parking_designed', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'total_personal_parking_designed', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    ],
    Sort: [
      { attribute: 'design_labor_ratio', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'sort_zones_per_row', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'systemfph', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'designpeakspr', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'designpeakspr_co', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'totalhconsite', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'manualfingers', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { attribute: 'adtafingers', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    ],

  };

  const [data, setData] = useState(moduleData[activeModule]);
  // const [data, setData] = useState([
  //   { attribute: 'induct_mechanism', currentValue: 14, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'package_inbound_truck_type', currentValue: 5, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'package_unload_medium', currentValue: 16, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'dockdoorsinbound', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'dockdoorsgocartreturn', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'dockdoorspalletremoval', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'induct_stations_asl', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'inductstations_manual', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'inbound_staging', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   { attribute: 'inbound_staging_d', currentValue: 24, actualValue: '', comments: '', flagAsKDI: false },
  //   // ... more rows
  // ]);
  const handleTabClick = (moduleName) => {
    console.log('Selected module:', moduleName); // Check which module was clicked
    console.log('Data for module:', moduleData[moduleName]); // Log out data for debugging
    setActiveModule(moduleName);
    setData(moduleData[moduleName]); // Update the state with the module-specific data
  };

  useEffect(() => {
    const fetchData = async () => {
      try { //${activeTab}
        const response = await fetch(`http://localhost:8000/get/${siteId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedData = await response.json();
        // console.log("fetchedData");
        // console.log(fetchedData);
        // Update the state with the new values from the fetched data
        // const updatedData = Object.keys(fetchedData).map(key => ({
        //   attribute: key,
        //   currentValue: fetchedData[key], // Assume the fetched data has the current values
        //   actualValue: '', // If your fetched data contains actual values, replace '' with fetchedData[key + '_actual'] or the correct key
        //   comments: '', // If your fetched data contains comments, replace '' with the correct value
        //   flagAsKDI: false, // Set this based on your fetched data if applicable
        // }));
        // console.log(updatedData);
        // setData(updatedData);
        setData(currentData =>
          currentData.map(item => ({
            ...item,
            currentValue: fetchedData[item.attribute] , // Replace with the new value, or fallback to the current value if undefined
            // actualValue: fetchedData[item.attribute] || item.actualValue,   // Replace with the new value, or fallback to the current value if undefined
            // You can add additional fields to update as needed
          }))
        );

      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };fetchData();
  }, [siteId, setData, activeModule]);
  // Handlers for Footer
  const handleHoldDeployment = () => {
    // Logic to hold deployment
  };

  // const handleSave = () => {
  //   // Logic to save data
  // };

  const handleComplete = () => {
    // Logic to mark as complete
  };

  const handleSubmit = async (attributeData) => {
    var csrfToken = getCookie('csrftoken');
    try {
      
      const response = await fetch(`http://localhost:8000/discrepancy/${siteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
          // Include CSRF token if needed, see previous examples
        },
        credentials: 'include',
        body: JSON.stringify({
          site_code: siteId, // Assuming siteId is stored in component state
          ...attributeData, // This contains new_value, comments, and flagAsKDI
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // Handle the response - e.g., show a success message, update state, etc.
      console.log(result);

    } catch (error) {
      console.error('There has been a problem with your POST operation:', error);
    }
  };

  const [formData, setFormData] = useState({});

  const handleInputChange = (index, field, value) => {
    // Update the specific item by index
    setData(currentData =>
      currentData.map((item, itemIndex) =>
        index === itemIndex ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleSave = async () => {
    // Map your state to the format expected by your API
     const payload = data.map(item => ({
      primary_site_code: siteId, // This assumes the siteId is consistent for all items
      attribute: item.attribute,
      actualValue: item.actualValue,
      comments: item.comments,
      flagAsKDI: item.flagAsKDI,
    }));
    console.log("payload data:",payload)
    // Perform the POST request to your API endpoint
    try {
      const response = await fetch(`http://localhost:8000/discrepancy/${siteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
          // Include CSRF token if needed, see previous examples
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle success response
      const result = await response.json();
      console.log(result);
      // TODO: Add any post-save actions here, e.g., notifications to the user
      
    } catch (error) {
      // Handle errors
      console.error('Error saving discrepancies:', error);
      // TODO: Add error handling UI feedback here
    }
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

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  return (
    <>
      <Header />
      {/* <Navigation tabs={tabs} activeTab={activeTab} setAciiitiveTab={setActiveTab} /> */}
      <Navigation tabs={tabs} activeTab={activeModule} onTabClick={handleTabClick} />
      
      <div className="content">
        {/* Pass the data array directly to the Table component */}
        <Table data={data} setData={setData} onInputChange={handleInputChange} />
      </div>
      <Footer handleSave={handleSave}/>
    </>
  );
};

export default AuditPage;
