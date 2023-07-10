import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import React, { useEffect } from "react";
import { axiosInstance } from "Axios.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Buttons from "Website/SharedUI/Buttons/Buttons";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const ResetPassword_URL = "/forgot-password";
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email required"),
    }),
    onSubmit: function (values) {
      const { email } = values;
      axiosInstance
        .post(ResetPassword_URL, { email })
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: "Password reset email sent!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/login");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },    
  });

  useEffect(() => {
    if (formik.touched.email && formik.errors.email) {
      navigate("/error-page");
    }
  }, [formik.touched.email, formik.errors.email, navigate]);

  return (
    <Container fluid>
      <Row className="mt-5">
    <Col lg="5" md="5" className="m-auto">
      <Card className=" shadow border-0" style={{height:"300px"}}>
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h2>نسيـت كلمـة المـرور</h2>
          </div>
          <Form role="form" onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-5 mt-5">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="البريد الالكترونــي"
                  type="email"
                  id="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              {formik.errors.email && formik.touched.email && (
                <span className="text-danger">{formik.errors.email}</span>
              )}
            </FormGroup>
            <div className="text-center">
              <div className="text-center">
                <Buttons
                  className="btn btn-outline-primary"
                  title="ارســال"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
    </Row>
    </Container>
  );
};

export default ForgetPassword;
