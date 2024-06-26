import React, { useState,useEffect } from 'react';
import Header from '../Header/Header'; // Corrected path
import Navigation from '../Navigation/Navigation'; // Corrected path
import Table from '../Table/Table'; // Corrected path
import Footer from '../Footer/Footer'; // Corrected path
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';


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

const getModuleDataWithMatchStatus = (moduleData) => {
  Object.keys(moduleData).forEach(module => {
    moduleData[module] = moduleData[module].map(item => {
      const isMatch = item.actualValue && item.currentValue.toString() === item.actualValue.toString();
      const matchStatus = item.actualValue === '' ? '' : isMatch ? 'Match' : 'Mismatch';
      // console.log
      return {
        ...item,
        matchStatus: matchStatus
      };
    });
  });
  return moduleData;
};



const AuditPage = () => {
  const tabs = ['Inbound', 'Staging', 'Loading', 'Parking', 'Sort'];
  // const [activeTab, setActiveTab] = useState('Inbound');

  const [activeModule, setActiveModule] = useState('Inbound');
  const location = useLocation();
  const { siteId } = location.state || {};
  // const [data, setData] = useState([]); 
   // eslint-disable-next-line
  const initialModuleData = {
    Inbound: [
      { displayName: 'Induct Mechanism',attribute: 'induct_mechanism', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      {displayName: 'Package Inbound Truck Type',attribute: 'package_inbound_truck_type', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Package Unload Medium',attribute: 'package_unload_medium', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Dock Doors Inbound',attribute: 'dockdoorsinbound', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Dock Doors Go Cart Return',attribute: 'dockdoorsgocartreturn', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Dock Doors Pallet Removal',attribute: 'dockdoorspalletremoval', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Induct Stations ASL',attribute: 'induct_stations_asl', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Induct Stations Manual',attribute: 'inductstations_manual', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      {displayName: 'Induct Staging', attribute: 'inbound_staging', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Induct Staging D',attribute: 'inbound_staging_d', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
   ],
    Staging: [
      { displayName: 'Waves for Dispatch',attribute: 'wavesfordispatchstaging', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      {displayName: 'Pick carts per route', attribute: 'pickcartsperroute', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Pick cart Staging',attribute: 'pick_cart_staging', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    ],
    Loading: [
      { displayName: 'Loading Type', attribute: 'loadingtype', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      {displayName: 'Loading Side', attribute: 'loadingside', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Load out Door at Grade',attribute: 'loadoutdooratgrade', currentValue: '',actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Canopy over Launchpads',attribute: 'canopyoverlaunchpads', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Demising Wall in Picks',attribute: 'demisingwallinpickstagearea', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Number of Launchpads',attribute: 'number_of_launchpads', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Loading Spots',attribute: 'loading_spots', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Queuing Spots',attribute: 'queueing_spots', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Queuing Spots Park',attribute: 'queueing_spots_for_parking', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Associate Parking ratio',attribute: 'associate_parking_ratio', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Queuing Spots',attribute: 'queueing_spots', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    
    
    ],
    Parking: [
      { displayName: 'Van Parking Configuration ', attribute: 'vanparkingconfigurationonsite', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      {displayName: 'Total Van parking Designed', attribute: 'total_van_parking_designed', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Total Personal parking Designed', attribute: 'total_personal_parking_designed', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    ],
    Sort: [
      {displayName: 'Design Labor ratio', attribute: 'design_labor_ratio', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Sort zones per row', attribute: 'sort_zones_per_row', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'System_fph', attribute: 'systemfph', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Design Peaks pr',attribute: 'designpeakspr', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Design Peaks PRCo',attribute: 'designpeakspr_co', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Total_h_conSite',attribute: 'totalhconsite', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      {displayName: 'Manual fingers', attribute: 'manualfingers', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
      { displayName: 'Adta Fingers',attribute: 'adtafingers', currentValue: '', actualValue: '', comments: '', flagAsKDI: false },
    ],

  };

  const [moduleData, setModuleData] = useState(initialModuleData);
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
        console.log("fetchedData",fetchedData);
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
        setModuleData(prev => {
          return Object.keys(prev).reduce((acc, moduleName) => {
            // console.log(moduleName)
            acc[moduleName] = prev[moduleName].map(item => ({
              ...item,
              currentValue: fetchedData[item.attribute] || item.currentValue, // Assuming the fetched data is structured by module
            }));
            // console.log("acc",acc);
            return acc;
          }, {});
        });
        // setData(currentData =>
        //   currentData.map(item => ({
        //     ...item,
        //     currentValue: fetchedData[item.attribute] , // Replace with the new value, or fallback to the current value if undefined
        //     // actualValue: fetchedData[item.attribute] || item.actualValue,   // Replace with the new value, or fallback to the current value if undefined
        //     // You can add additional fields to update as needed
        //   }))
        // );

      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };fetchData();
  }, [siteId]); //, setData, activeModule
  // Handlers for Footer
  const handleHoldDeployment = () => {
    // Logic to hold deployment
  };

  // const handleSave = () => {
  //   // Logic to save data
  // };
  const handleComplete = async () => {
    // await exportAllDataToPDF(); // Call the PDF export function directly if it's ready to handle everything
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
    setData(currentData =>
      currentData.map((item, itemIndex) =>
        index === itemIndex ? { ...item, [field]: value, flagAsKDI: field === 'actualValue' && item.currentValue !== value } : item
      )
    );
  };

  useEffect(() => {
    setModuleData(prev => ({
      ...prev,
      [activeModule]: data,
    }));
  }, [data, activeModule]);

  // const handleInputChange = (index, field, value) => {
  //   // Update the specific item by index
  //   setData(currentData =>
  //     currentData.map((item, itemIndex) =>
  //       index === itemIndex ? { ...item, [field]: value } : item
  //     )
  //   );
  // };
  // useEffect(() => {
  //   // Sync changes back to the moduleData when 'data' changes
  //   setModuleData(prev => ({
  //     ...prev,
  //     [activeModule]: data,
  //   }));
  // }, [data, activeModule]);

  const handleSave = async () => {
    // Map your state to the format expected by your API
    //  const payload = data.map(item => ({
    //   primary_site_code: siteId, // This assumes the siteId is consistent for all items
    //   attribute: item.attribute,
    //   actualValue: item.actualValue,
    //   comments: item.comments,
    //   flagAsKDI: item.flagAsKDI,
    // }));
    const payload = Object.values(moduleData).flat().map(item => ({
      primary_site_code: siteId,
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
      alert('Saved to the Database!');
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

  

  //PDF 

const generatePDF = async () => {

  
  for (const moduleName of Object.keys(moduleData)) {
    const element = document.getElementById(`module-${moduleName}`);
    element.style.display = "block"; 
    const canvas = await html2canvas(element);
    
    // const canvas = await html2canvas(element, {
    //   scale: 2,
    //   useCORS: true
    // });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new  jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4'
    });
    const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const date = new Date();
    const dateString = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`; // Format: YYYYMMDD
   
    pdf.save(`${dateString}-Report-${moduleName}.pdf`);
    element.style.display = 'none';  // Hide the container again
    // // element.style.visibility = 'hidden';
    element.style.position = '';
    element.style.left = '';
    element.style.top = '';
    // element.style.display = originalDisplayStyles[moduleName];
  
  }
};


//blob:
// const generatePDFBlob = async () => {
//   const pdf = new  jsPDF({
//     orientation: 'landscape',
//     unit: 'px',
//     format: 'a4'
//   });
  
//   for (const moduleName of Object.keys(moduleData)) {
//     const element = document.getElementById(`module-${moduleName}`);
//     element.style.display = "block"; 
//     const canvas = await html2canvas(element);
    
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({
//       orientation: 'landscape',
//       unit: 'px',
//       format: 'a4'
//     });
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     // pdf.addPage();
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     const date = new Date();
//     const dateString = `${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`; // Format: YYYYMMDD
//     pdf.save(`${dateString}-Report-${moduleName}.pdf`);
//     // const pdfBlob = pdf.output('blob');
//     // zip.file(`${dateString}-Report-${moduleName}.pdf`, pdfBlob);
//     element.style.display = 'none';
//     element.style.position = '';
//     element.style.left = '';
//     element.style.top = '';
//   }

//   // const zipBlob = await zip.generateAsync({ type: 'blob' });
//   // return zipBlob;
//   const pdfBlob = pdf.output('blob');
//   return pdfBlob;

  
// };
const generatePDFBlob = async () => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: 'a4'
  });

  for (const moduleName of Object.keys(moduleData)) {
    const element = document.getElementById(`module-${moduleName}`);
    const originalDisplay = element.style.display;
    const originalPosition = element.style.position;
    const originalLeft = element.style.left;
    const originalTop = element.style.top;

    element.style.display = "block"; 
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '0';

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    if (moduleName !== Object.keys(moduleData)[0]) {
      pdf.addPage();
    }
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    element.style.display = originalDisplay;
    element.style.position = originalPosition;
    element.style.left = originalLeft;
    element.style.top = originalTop;
  }

  return pdf.output('blob');
};


// Sending email :


const handleSendEmail = async () => {
  const dataToEmail = Object.values(moduleData).flat().filter(item => item.flagAsKDI);
  console.log(dataToEmail);
  try {
      const pdfBlob = await generatePDFBlob();
      console.log(pdfBlob);
      const formData = new FormData();
      // formData.append('pdf', pdfBlob, 'Report.zip');
      formData.append('email', 'tphoenix318@gmail.com'); // Change this to the recipient's email
      // formData.append('data', dataToEmail);
      formData.append('data', new Blob([JSON.stringify(dataToEmail)], { type: 'application/json' }));
      // const pdfBlob = await generatePDF();
      formData.append('pdf', pdfBlob, 'report.pdf');
      
    const response = await fetch('http://localhost:8000/send-email/', {
      method: 'POST',
      headers: {
       
        'X-CSRFToken': getCookie('csrftoken'),
      },
      credentials: 'include',
      // body: JSON.stringify({
      //   email: 'tphoenix318@gmail.com',
      //   data: dataToEmail
      // }),
      body:formData
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    console.log('Email sent:', result);
    alert('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    alert('Error sending email');
  }
};


  return (
    <> 
    
      <Header />
      {/* <Navigation tabs={tabs} activeTab={activeTab} setAciiitiveTab={setActiveTab} /> */}
      <Navigation tabs={tabs} activeTab={activeModule} onTabClick={handleTabClick} />
      
      <div className="content" id="main-content">
      
      {tabs.map(tab => (
      <div className="content" key={tab} id={`module-${tab}`} style={{ display: tab === activeModule ? 'block' : 'none' }}>
        {/* Pass the data array directly to the Table component */}
        {/* <Table data={data} setData={setData} onInputChange={handleInputChange} /> */}
        <Table data={moduleData[tab]} setData={(updatedData) => {
        setModuleData({ ...moduleData, [tab]: updatedData });
      }} onInputChange={handleInputChange} />
        
        </div>
      ))}
      </div>

     
      <button className="button button-primary"  onClick={generatePDF}>Download All Modules as PDF</button>
      <button className="button button-danger" onClick={handleSendEmail}>Send Email</button>

      <Footer handleSave={handleSave} handleComplete={handleComplete}/>
{/* 
      <div id="pdf-container" style={{ display: 'none', width: '100%', height: 'auto' }}>
      {Object.keys(moduleData).map(moduleName => (
        <div key={moduleName}>
          <h2>{moduleName}</h2>
          <Table data={moduleData[moduleName]} />
        </div>
      ))}
      </div> */}
    </>
  );
};

export default AuditPage;
