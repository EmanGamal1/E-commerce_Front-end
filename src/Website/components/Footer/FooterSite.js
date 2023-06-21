import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "reactstrap";
import "./FooterSite.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "./../../../Axios";

const FooterSite = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/info")
      .then((response) => {
        setFooterData(response.data.data);
        console.log(response.data.data.social_media);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <footer id="footerWebsite">
        <Container>
          <Row>
            <Col lg="6">
              <h3>تواصــل معنــا :</h3>
              <br />
              <Row>
                <Col lg="4">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="socialMediaIcons"
                  />
                  البريد الالكتروني :
                </Col>
                <Col lg="5" className="EnglishWords">
                  {footerData.email}
                </Col>
              </Row>
              <Row>
                <Col lg="4">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="socialMediaIcons"
                  />
                  رقم الهاتف :
                </Col>
                <Col dir="ltr" lg="5" className="EnglishWords">
                  {footerData.phone}
                </Col>
              </Row>
            </Col>
            <Col lg="4">
              <h3>تابعنــا على :</h3>
              <br />
              <Row>
                {Array.isArray(footerData.social_media) &&
                  footerData.social_media.map((item, index) => (
                    <div key={index}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          className={
                            "FollowUsSocialMedia fa-brands fa-" + item.name
                          }
                        ></div>
                      </a>
                    </div>
                  ))}
              </Row>
            </Col>
            <Col lg="2">
              <h3>المزيد عنـا :</h3>
              <br />
              <Link to="/termsAndConditions">
                <p className="more">الشروط والأحكــام</p>
              </Link>
              <Link to="/aboutus">
                <p className="more">عنَــا</p>
              </Link>
            </Col>
          </Row>
          <hr className="hrFooter" />
          <Row className="copyrightsLine">
            <p className="copyRights">
              &copy; E-commerce2023. جميع الحقوق محفوظة
            </p>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default FooterSite;
