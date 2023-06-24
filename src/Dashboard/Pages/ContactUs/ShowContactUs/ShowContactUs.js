import Btn from "Dashboard/SharedUI/Btn/Btn";
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import EditContactUs from "./../EditContactUs/EditContactUs";
import { axiosDashboard } from "../../../../Axios";

const ContactUs = () => {
  const [showEditCard, setShowEditCard] = useState(false);
  const [contactUsData, setContactUsData] = useState("");

  useEffect(() => {
    fetchContactUsData();
  });

  const fetchContactUsData = async () => {
    await axiosDashboard
      .get("/api/v1/settings")
      .then((res) => {
        setContactUsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleEditCard = () => {
    setShowEditCard(!showEditCard);
  };

  const handleContactUpdate = (newData) => {
    setContactUsData(newData);
  };

  return contactUsData ? (
    <>
          {showEditCard ? (
            <EditContactUs onUpdate={handleContactUpdate} />
          ) : (
            <Card className="shadow">
            <CardHeader className="border-0">Contact Us</CardHeader>
        <CardBody>
            <div dangerouslySetInnerHTML={{ __html: contactUsData.contact_us }} />
        </CardBody>
        <CardFooter className="py-4">
            <Btn title="Edit" className="btn btn-primary" onClick={toggleEditCard} />
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

export default ContactUs;
