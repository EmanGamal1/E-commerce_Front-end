import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../../Axios";
import MySwal from "sweetalert2";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const LoginURL = "login";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const LoginData = {
        email: values.email,
        password: values.password,
      };
      axiosInstance
        .post(LoginURL, LoginData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            icon: "error",
            title: "error!",
            text: err.response.data.error,
          });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    },
  });
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user){ navigate("/");}
  }, []);
  return (
    <>
     <Container fluid>
      <Row className="mt-5">
    <Col lg="5" md="5" className="m-auto">
      <Card className=" shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
        <div className="text-center text-muted mb-4">
            <h2>تسجيــل الدخــول</h2>
          </div>
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  placeholder="البريد الالكتروني..."
                  type="email"
                />
                </InputGroup>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </FormGroup>
              <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                  <Input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  placeholder="كلمــة المرور"
                  type="password"
                 />
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </FormGroup>
              <div className=" text-center">
              <button
                onClick={formik.handleSubmit}
                className="btn btn-outline-primary mt-4"
                type="submit"
              >
                تسجيل الدخول
              </button>
              <label className="my-4">
              ليس لديك حساب ؟{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span style={{ cursor: "pointer" }} className="text-primary">
                  اضغط هنا
                </span>
              </Link>
            </label>

            <label className="my-4">
              <Link
                to="/forgot-password"
                style={{ textDecoration: "none" }}
                className="text-primary"
              >
                هل نسيت كلمه المـرور؟
              </Link>
            </label>
            
              </div>
            </Form>
            </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {/*<FooterSite />*/}
    </>
  );
};

export default Login;
