import { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import axios from "axios";

const ContactUsForm = () => {
  const [contactUsData, setContactUsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/data");
        setContactUsData(response.data);
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
