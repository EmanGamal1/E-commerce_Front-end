import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosDashboard } from "./../../../Axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ConfirmNewPassword = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();
  const { token, email } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      password_confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required")
        .min(8, "Confirm Password must be at least 8 characters"),
    }),
    onSubmit: async (values) => {
      try {
        // Verify the reCAPTCHA response
        if (!recaptchaValue) {
          setErrorMsg("Please complete the reCAPTCHA verification.");
          return;
        }

        // Send a request to update the password
        const g_recaptcha_response = recaptchaValue;
        const response = await axiosDashboard.post("/admin/reset-password", {
          email,
          token,
          password: values.password,
          password_confirm: values.password_confirm,
          g_recaptcha_response,
        });
        Swal.fire({
          title: "Success",
          text: "Password Changed Successfully",
          icon: "success",
          confirmButtonText: "Login",
        }).then(() => {
          navigate("/admin/login");
        });
      } catch (err) {
        // Error handling
      }
    },
  });

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Confirm New Password</small>
          </div>
          <Form role="form" onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="New Password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  autoComplete="off"
                />
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <div className="error text-danger">{formik.errors.password}</div>
              )}
            </FormGroup>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  {...formik.getFieldProps("password_confirm")}
                  autoComplete="off"
                />
              </InputGroup>
              {formik.touched.password_confirm && formik.errors.password_confirm && (
                <div className="error text-danger">{formik.errors.password_confirm}</div>
              )}
            </FormGroup>
            <FormGroup>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6Lf-I8AmAAAAAKea9mqOXIxiwQ851MY396G8RVeX"
                onChange={handleRecaptchaChange}
              />
            </FormGroup>
            <div className="text-center">
                  {errorMsg && <p>{errorMsg}</p>}
                  <Btn
                    className="btn btn-info"
                    title="Confirm Password"
                    type="submit"
                    disabled={formik.isSubmitting}
                  />
             
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ConfirmNewPassword;
