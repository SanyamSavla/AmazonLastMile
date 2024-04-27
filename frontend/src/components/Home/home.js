import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header'; // Corrected path
import Navigation from '../Navigation/Navigation'; // Corrected path
import Table from '../Table/Table'; // Corrected path
import Footer from '../Footer/Footer'; // Corrected path

const SiteIdForm = () => {
  const [siteId, setSiteId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    var csrfToken = getCookie('csrftoken');
    
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
        body: JSON.stringify({ primary_site_code: siteId })
       
      });
      const data = await response.json();
      if (data.success) {
        // Redirect to the home page or another page based on the response
        navigate(`/`, { state: { siteId: siteId } });
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
    <form onSubmit={handleSubmit}>
      <label>
        Site ID:
        <input type="text" value={siteId} onChange={(e) => setSiteId(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
    <Footer/>
    </>
  );
};

export default SiteIdForm;
