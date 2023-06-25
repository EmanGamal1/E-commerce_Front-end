import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Buttons from "Website/SharedUI/Buttons/Buttons";
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { axiosInstance } from "./../../../Axios";
import { useState } from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/info")
      .then((response) => {
        setContactData(response.data.data);
        console.log(response.data.data.social_media);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const initialValues = {
    name: "",
    email: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("الاســم مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكترونـي مطلوب"),
    comment: Yup.string().required("التعليق مطلـوب"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("onSubmit called");
    try {
      const response = await axiosInstance.post("/contact-us", values);
      console.log(response.data.data);
      Swal.fire({
          icon: "success",
          title: "تم إرسـال تعليقك بنجـاح",
          confirmButtonText: "تـم",
       })
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container className="mt-5">
      <Card className="p-3 shadow">
        <CardBody className="row">
          <form onSubmit={formik.handleSubmit} className="col-6">
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="email"
                  placeholder="البريد الالكتروني"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </InputGroup>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </FormGroup>

            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-single-02" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="name"
                  placeholder="الاســم"
                  type="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </InputGroup>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </FormGroup>

            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-notification-70 mt--7" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  name="comment"
                  placeholder="التعليــق"
                  type="textarea"
                  style={{ height: "150px" }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.comment}
                />
              </InputGroup>
              {formik.touched.comment && formik.errors.comment ? (
                <div className="text-danger">{formik.errors.comment}</div>
              ) : null}
            </FormGroup>

            <Buttons
              type="submit"
              title="إرســال"
              className="btn btn-outline-warning"
              disabled={
                Object.keys(formik.touched).length === 0 ||
                Object.keys(formik.errors).length !== 0
              }
            />
          </form>
          <div className="col-4 text-center mr-5" style={{ color: "#adb5bd" }}>
            <h3 style={{ color: "#adb5bd" }}>تواصــل معنـا مباشــرة</h3>
            <div className="mt-5" style={{ marginRight: "30px" }}>
              <Row>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="socialMediaIcons text-warning"
                />
                <h4 className="text-warning"> رقــم الهـاتــــف :</h4>
              </Row>
              <Row className="EnglishWords mr-2">{contactData.phone}</Row>
              <br />
              <br />
              <Row>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="socialMediaIcons text-warning"
                />
                <h4 className="text-warning">البريد الإلكترونـي:</h4>
              </Row>
              <Row className="EnglishWords mr-2">{contactData.email}</Row>
            </div>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ContactUs;
