import { useState } from "react";
import TermsAndConditions from "Dashboard/Components/TermsAndConditions/TermsAndConditions";
import WebsiteInfo from "Dashboard/Components/WebsiteInfo/WebsiteInfo";
import AboutUS from "../AboutUs/ShowAboutUs/ShowAboutUs";
import ContactUs from "../ContactUs/ShowContactUs/ShowContactUs";

import "./Setting.css";

import { Container, Navbar, Row } from "reactstrap";
import Btn from "Dashboard/SharedUI/Btn/Btn";

const Setting = () => {
  const [activeLink, setActiveLink] = useState("website-info");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <Navbar />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            {/*start website info*/}
            <span
              onClick={() => handleLinkClick("website-info")}
              style={{ cursor: "pointer" }}
              className={activeLink === "website-info" ? "active-link" : ""}
            >
              <Btn
                title="Website Information"
                className="btn"
                style={{
                  background:
                    activeLink === "website-info"
                      ? "linear-gradient(to bottom, lightgray, white)"
                      : "linear-gradient(to right, white, white)",
                }}
              />
              {/*end website info*/}
              {/*start terms-and-conditions */}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              onClick={() => handleLinkClick("terms-and-conditions")}
              style={{ cursor: "pointer" }}
              className={
                activeLink === "terms-and-conditions" ? "active-link" : ""
              }
            >
              <Btn
                title="Terms and Conditions"
                className="btn"
                style={{
                  background:
                    activeLink === "terms-and-conditions"
                      ? "linear-gradient(to bottom, lightgray, white)"
                      : "linear-gradient(to right, white, white)",
                }}
              />
            </span>
            {/*end terms-and-conditions */}
            {/*start AboutUS */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              onClick={() => handleLinkClick("about-us")}
              style={{ cursor: "pointer" }}
              className={activeLink === "about-us" ? "active-link" : ""}
            >
              <Btn
                title="About Us"
                className="btn"
                style={{
                  background:
                    activeLink === "about-us"
                      ? "linear-gradient(to bottom, lightgray, white)"
                      : "linear-gradient(to right, white, white)",
                }}
              />
            </span>
            {/*end AboutUS */}
            {/*start ContactUs */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span
              onClick={() => handleLinkClick("contact-us")}
              style={{ cursor: "pointer" }}
              className={activeLink === "contact-us" ? "active-link" : ""}
            >
              <Btn
                title="Contact Us"
                className="btn"
                style={{
                  background:
                    activeLink === "contact-us"
                      ? "linear-gradient(to bottom, lightgray, white)"
                      : "linear-gradient(to right, white, white)",
                }}
              />
            </span>
            {/*end ContactUs */}
            {activeLink === "website-info" && <WebsiteInfo />}
            {activeLink === "terms-and-conditions" && <TermsAndConditions />}
            {activeLink === "about-us" && <AboutUS />}
            {activeLink === "contact-us" && <ContactUs />}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Setting;
