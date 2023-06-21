import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";
import { Col, Container, Form, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "../../../Axios";
import MySwal from "sweetalert2";

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const ForgetPasswordURL = "forgot-password";

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const forgetPasswordData = new FormData();
      forgetPasswordData.append("email", values.email);
      axiosInstance
        .post(ForgetPasswordURL, forgetPasswordData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate("/reset-password");
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            icon: "error",
            title: "error!",
            text: err.response.data.error,
          });
        });
    },
  });

  return (
    <>
      {/*<NavBar />*/}
      <Container style={{ minHeight: "690px" }}>
        <Row className="py-5 d-flex justify-content-center ">
          <Col sm="12" className="d-flex flex-column ">
            <label className="mx-auto title-login">نسيت كلمة السر</label>
            <Form>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                placeholder="ادخل الايميل..."
                type="email"
                className="user-input my-3 text-center mx-auto"
              />

              <button
                onClick={formik.handleChange}
                className="btn-login mx-auto mt-2"
              >
                ارسال الكود
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
      {/*<FooterSite />*/}
    </>
  );
};
