import {
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import React, { useEffect } from "react";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosDashboard } from "Axios.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const ForgetPssword = () => {
  const navigate = useNavigate();

  const ResetPassword_URL = "admin/reset-password-token";
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
      axiosDashboard
        .post(ResetPassword_URL, { email })
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: "Password reset email sent!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/admin/login");
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },    
  });

  useEffect(() => {
    if (formik.touched.email && formik.errors.email) {
      navigate("/error-page"); // Navigate to an error page if there are validation errors
    }
  }, [formik.touched.email, formik.errors.email, navigate]);

  return (
    <Col lg="5" md="7" className="m-auto" style={{paddingTop:"10%"}}>
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <small>Forget Password</small>
          </div>
          <Form role="form" onSubmit={formik.handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
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
                <Btn
                  className="btn btn-info"
                  title="Reset Password"
                  type="submit"
                />
              </div>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ForgetPssword;
