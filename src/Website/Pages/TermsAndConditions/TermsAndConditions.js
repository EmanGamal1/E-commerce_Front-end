import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { axiosInstance } from "../../../Axios";
import "./../../../website.css";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/terms")
      .then((response) => {
        setTerms(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <img
            src="https://assets-global.website-files.com/6152b2d34ca06b6d275dd66e/615e78b99d4c8d84eeb0edd4_digi-shopping-catalogue.png"
          alt="terms and conditions banner"
          className="settingBanner"
        />
        <h1 className="settingTitle">الشــروط والأحكـــام</h1>
      </Row>
      <Row className="row settingContent">
        <div dangerouslySetInnerHTML={{ __html: terms }} />
      </Row>
    </Container>
  );
};

export default TermsAndConditions;
