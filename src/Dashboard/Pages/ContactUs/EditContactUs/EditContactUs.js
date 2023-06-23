import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Btn from 'Dashboard/SharedUI/Btn/Btn';
import { axiosDashboard } from '../../../../Axios';
import ContactUs from '../ShowContactUs/ShowContactUs';
import MySwal from 'sweetalert2';

const EditContactUs = ({onUpdate}) => {
  const [showTerms, setShowTerms] = useState(false);
  const [editTermsAndConditionsData, setTermsAndConditionsData] = useState("");

  useEffect(() => {
    const fetchTermsAndConditionsData = async () => {
      try {
        const response = await axiosDashboard.get("/api/v1/settings");
        setTermsAndConditionsData(response.data.data.contact_us);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTermsAndConditionsData();
  }, []);

  const handleSave = async () => {
   try {
      const response = await axiosDashboard.patch("/api/v1/settings", {
        contact_us: editTermsAndConditionsData
      });
      console.log(response);
      MySwal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your changes have been saved successfully.',
      });    } catch (error) {
      console.log(error);
    }
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  const handleSaveAndToggle = async () => {
    await handleSave();
    onUpdate(editTermsAndConditionsData);
    toggleTerms();
  };

  return (
    <div className="App">
      {showTerms ? (
        <ContactUs />
      ) : (
        
        <div className='card shadow'>
          <div className="card-header">Edit</div>
          <div className='card-body'>
        <CKEditor
        editor={ClassicEditor}
        data={editTermsAndConditionsData || ''}
        onChange={(event, editor) => {
          const data = editor.getData();
          setTermsAndConditionsData(data);
        }}
      />
   </div>
   <div className='card-footer'>
      <Btn
      title="Save"
      className="btn btn-primary mt-3"
      onClick={handleSaveAndToggle}
   />
   </div>
   </div>
      )}
    </div>
  );
};

export default EditContactUs;