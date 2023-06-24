import Btn from "Dashboard/SharedUI/Btn/Btn";
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import EditTermsAndConditions from "./EditTermsAndConditions/EditTermsAndConditions";
import { axiosDashboard } from "../../../Axios";

const TermsAndConditions = () => {
  const [showEditCard, setShowEditCard] = useState(false);
  const [termsAndConditionsData, setTermsAndConditionsData] = useState("");

  useEffect(() => {
    fetchTermsAndConditionsData();
  });

  const fetchTermsAndConditionsData = async () => {
    await axiosDashboard
      .get("/api/v1/settings")
      .then((res) => {
        setTermsAndConditionsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleEditCard = () => {
    setShowEditCard(!showEditCard);
  };

  const handleTermsAndConditionsUpdate = (newData) => {
    setTermsAndConditionsData(newData);
  };

  return termsAndConditionsData ? (
    <>
      {showEditCard ? (
        <EditTermsAndConditions onUpdate={handleTermsAndConditionsUpdate} />
      ) : (
        <Card className="shadow">
          <CardHeader className="border-0"></CardHeader>
          <CardBody>
            <div
              dangerouslySetInnerHTML={{
                __html: termsAndConditionsData.terms_and_conditions,
              }}
            />
          </CardBody>
          <CardFooter className="py-4">
            <Btn
              title="Edit"
              className="btn btn-primary"
              onClick={toggleEditCard}
            />
          </CardFooter>
        </Card>
      )}
    </>
  ) : (
    <Card>
      <CardBody>
        <p>Loading...</p>
      </CardBody>
    </Card>
  );
};

export default TermsAndConditions;
