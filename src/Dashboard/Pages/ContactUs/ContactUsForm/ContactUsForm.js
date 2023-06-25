import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { axiosDashboard } from "./../../../../Axios";

const ContactUsForm = () => {
  const [contactUsData, setContactUsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosDashboard.get("/api/v1/customers-contact");
        setContactUsData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <h2 className="ml-3">Contact Us Data</h2>
          </Row>
          <Row>
            {contactUsData.map((data) => (
              <Col lg="4" key={data.id}>
                <Card className="shadow">
                  <CardBody>
                    <h3>{data.name}</h3>
                    <h4>{data.email}</h4>
                    <p>{data.comment}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default ContactUsForm;
