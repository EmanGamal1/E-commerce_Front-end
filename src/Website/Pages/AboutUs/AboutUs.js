import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { axiosInstance } from "../../../Axios";

const AboutUS = () => {
  const [aboutus, setAboutus] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/about-us")
      .then((response) => {
        setAboutus(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <img
          src="https://assets-global.website-files.com/6152b2d34ca06b6d275dd66e/6152b2d34ca06b8ff65dddde_digi-auto-billing.png"
          alt="about us banner"
          className="settingBanner"
        />
        <h1 className="settingTitle">من نحــن؟</h1>
      </Row>
      <Row className="row settingContent">
        <div dangerouslySetInnerHTML={{ __html: aboutus }} />
      </Row>
    </Container>
  );
};

export default AboutUS;
