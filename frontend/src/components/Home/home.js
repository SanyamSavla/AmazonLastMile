import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header'; // Corrected path
import Navigation from '../Navigation/Navigation'; // Corrected path
import Table from '../Table/Table'; // Corrected path
import Footer from '../Footer/Footer'; // Corrected path
import Modal from '../Modal/Modal';

const SiteIdForm = () => {
  const [siteId, setSiteId] = useState('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  const [formData, setFormData] = useState({
    auditor_first_name: '',
    auditor_last_name: '',
    site_code: '',
    site_type: '',
    city: '',
    state: '',
    review_type: '',
    review_date: '',
    site_id: ''
  });

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    var csrfToken = getCookie('csrftoken');
    console.log(formData)
    e.preventDefault();
    try {
      // console.log(siteId);
      const response = await fetch(`http://localhost:8000/post/${siteId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        
        credentials: 'include',
        // body: JSON.stringify(formData)
        body: JSON.stringify([{ ...formData, site_id: siteId }]) // Send as array and include site_id
     
       
      });
      const data = await response.json();
      if (data.success) {
        // Redirect to the home page or another page based on the response
        navigate(`/`, { state: { siteId: siteId} });
      } else {
        // Handle error response
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
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
      {/* <Navigation tabs={tabs}  /> */}

      {showModal && (
      <Modal show={showModal} onClose={handleCloseModal}>
        <div>
          <h2>Design Audit Session Information</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-section">
      <h3>Auditor details</h3>
      <input type="text" name="auditor_first_name" placeholder="Auditor First name" value={formData.auditor_first_name} onChange={handleChange} />
      <input type="text" name="auditor_last_name" placeholder="Auditor Last name" value={formData.auditor_last_name} onChange={handleChange} />
              
    </div>
    <div className="form-section">
      <h3>Site details</h3>
      {/* <input type="text" name="site_code" placeholder="Site code" value={formData.site_code} onChange={handleChange} /> */}
      <input type="text" name="site_id" placeholder="Site code" value={siteId} onChange={(e) => setSiteId(e.target.value)} />
      
      <input type="text" name="site_type" placeholder="Type" value={formData.site_type} onChange={handleChange} />
              
    </div>
    <div className="form-section">
      <h3>Location details</h3>
      <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
     <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            
     </div>
    <div className="form-section">
      <h3>Revision/review</h3>
      <input type="text" name="review_type" placeholder="Type" value={formData.review_type} onChange={handleChange} />
      <input type="date" name="review_date" value={formData.review_date} onChange={handleChange} />
            
    </div>
    <label>
        
        {/* <input type="text" value={siteId} onChange={(e) => setSiteId(e.target.value)} /> */}
       
      </label>
      
    <button className="button button-primary" type="submit">Submit</button>

  </form>
        </div>
      </Modal>
      )}
    <form >
      
    </form>
    {/* <Footer/> */}
    </>
  );
};

export default SiteIdForm;
