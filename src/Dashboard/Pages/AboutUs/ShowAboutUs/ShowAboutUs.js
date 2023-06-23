import Btn from "Dashboard/SharedUI/Btn/Btn";
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import EditAboutUs from "./../EditAboutUs/EditAboutUs";
import { axiosDashboard } from "../../../../Axios";
const AboutUS = () => {
  const [showEditCard, setShowEditCard] = useState(false);
  const [aboutUsData, setAboutUsData] = useState("");

  useEffect(() => {
    fetchAboutUsData();
  }, []);

  const fetchAboutUsData = async () => {
    await axiosDashboard
      .get("/api/v1/settings")
      .then((res) => {
        setAboutUsData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleEditCard = () => {
    setShowEditCard(!showEditCard);
  };

  const handleAboutUsUpdate = (newData) => {
    setAboutUsData(newData);
  };

  return aboutUsData ? (
    <>
      {showEditCard ? (
        <EditAboutUs onUpdate={handleAboutUsUpdate} />
      ) : (
        <Card className="shadow">
          <CardHeader className="border-0">About Us</CardHeader>
          <CardBody>
            <div dangerouslySetInnerHTML={{ __html: aboutUsData.about_us }} />
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
export default AboutUS;
