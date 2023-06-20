import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
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
          navigate("/home");
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
    if (user) navigate("/home");
  }, []);
  return (
    <>
      <NavBar />
      <Container style={{ minHeight: "690px" }}>
        <Row className="py-5 d-flex justify-content-center ">
          <Col sm="12" className="d-flex flex-column ">
            <label className="mx-auto title-login">تسجيل الدخول</label>
            <Form onSubmit={formik.handleSubmit} className="mx-auto">
              <FormGroup>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  placeholder="الايميل..."
                  type="email"
                  className="user-input my-3 text-center mx-auto"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </FormGroup>
              <FormGroup>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  placeholder="كلمه السر..."
                  type="password"
                  className="user-input text-center mx-auto"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </FormGroup>
              <button
                onClick={formik.handleSubmit}
                className="btn-login mx-auto mt-4"
                type="submit"
              >
                تسجيل الدخول
              </button>
            </Form>
            <label className="mx-auto my-4">
              ليس لديك حساب ؟{" "}
              <Link to="/auth/register" style={{ textDecoration: "none" }}>
                <span style={{ cursor: "pointer" }} className="text-danger">
                  اضغط هنا
                </span>
              </Link>
            </label>

            <label className="mx-auto my-4">
              <Link
                to="/forgot-password"
                style={{ textDecoration: "none", color: "red" }}
              >
                هل نسيت كلمه السر
              </Link>
            </label>
          </Col>
        </Row>
      </Container>
      <FooterSite />
    </>
  );
};

export default Login;
