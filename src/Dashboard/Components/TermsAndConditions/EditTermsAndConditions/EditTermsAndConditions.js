import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosDashboard } from "../../../../Axios";
import TermsAndConditions from "../TermsAndConditions";
import Swal from "sweetalert2";

const EditTermsAndConditions = ({ onUpdate }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [editTermsAndConditionsData, setTermsAndConditionsData] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchTermsAndConditionsData = async () => {
      try {
        const response = await axiosDashboard.get("/api/v1/settings");
        setTermsAndConditionsData(response.data.data.terms_and_conditions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTermsAndConditionsData();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axiosDashboard.patch("/api/v1/settings", {
        terms_and_conditions: editTermsAndConditionsData,
      });
      console.log(response);
    } catch (error) {
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

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setTermsAndConditionsData(data);
    setHasChanges(true);
  };

  const showSweetAlert = () => {
    Swal.fire({
      title: "Changes Saved!",
      text: "Your changes have been saved successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="App">
      {showTerms ? (
        <TermsAndConditions />
      ) : (
        <div className="card shadow">
          <div className="card-header">Edit</div>
          <div className="card-body">
            <CKEditor
              editor={ClassicEditor}
              data={editTermsAndConditionsData || ""}
              onChange={handleEditorChange}
            />
          </div>
          <div className="card-footer">
            <Btn
              title="Save"
              className="btn btn-primary mt-3"
              onClick={() => {
                handleSaveAndToggle();
                if (hasChanges) {
                  showSweetAlert();
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTermsAndConditions;
