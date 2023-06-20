import { Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";
import * as Yup from "yup";
import { FormLabel } from "react-bootstrap";
import { axiosInstance } from "../../../Axios";
import MySwal from "sweetalert2";
import { useEffect } from "react";

const Registration = () => {
  const navigate = useNavigate();
  const RegistrationURL = "register";
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/home");
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      bio: "",
      image: "",
      address: {
        area: "",
        governorate: "",
        country: "",
        city: "",
      },
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^0[0125][0-9]{9}$/, "Invalid phone number")
        .required("Phone is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      bio: Yup.string().required("Bio is required"),
      image: Yup.mixed().required("Please select  image"),
      address: Yup.object().shape({
        area: Yup.string().required("Area is required"),
        governorate: Yup.string().required("Governorate is required"),
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
      }),
    }),
    onSubmit: (values) => {
      console.log(values);
      const registrationData = new FormData();
      registrationData.append("name", values.name);
      registrationData.append("email", values.email);
      registrationData.append("phone", values.phone);
      registrationData.append("password", values.password);
      registrationData.append("confirmPassword", values.confirmPassword);
      registrationData.append("bio", values.bio);
      registrationData.append("address[area]", values.address.area);
      registrationData.append(
        "address[governorate]",
        values.address.governorate
      );
      registrationData.append("address[country]", values.address.country);
      registrationData.append("address[city]", values.address.city);

      registrationData.append("image", values.image[0]);

      axiosInstance
        .post(RegistrationURL, registrationData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "success!",
            text: "account created successfully",
          });
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          MySwal.fire({
            icon: "error",
            title: "error!",
            text: Object.entries(err.response.data.error),
          });
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        });
    },
  });

  const handleImageFile = (event) => {
    formik.values.image = Array.from(event.target.files);
    console.log(formik.values.image);
  };
  return (
    <>
      <NavBar />
      <Container style={{ minHeight: "680px" }}>
        <Row className="py-5 d-flex justify-content-center hieght-search">
          <Col sm="12" className="d-flex flex-column ">
            <label className="mx-auto title-login">تسجيل حساب جديد</label>
            <Form onSubmit={formik.handleSubmit}>
              <Col xs="6" className="mx-auto">
                <FormGroup>
                  <Input
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                    placeholder="اسم المستخدم..."
                    type="text"
                    className="mt-3 text-center mx-auto"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-danger">{formik.errors.name}</p>
                  )}
                </FormGroup>
                <Input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  placeholder="الايميل..."
                  type="email"
                  className="my-3 text-center mx-auto"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
                <Input
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                  placeholder="الهاتف..."
                  type="phone"
                  className="text-center mx-auto"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-danger">{formik.errors.name}</p>
                )}
                <Input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  placeholder="كلمه السر..."
                  type="password"
                  className="text-center mt-3 mx-auto"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
                <Input
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="confirmPassword"
                  placeholder="تاكيد كلمه السر..."
                  type="password"
                  className="text-center mt-3 mx-auto"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-danger">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
                <Input
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="bio"
                  type="textarea"
                  placeholder="عن نفسك"
                  className="text-center mt-3 mx-auto"
                />
                {formik.touched.bio && formik.errors.bio && (
                  <p className="text-danger">{formik.errors.bio}</p>
                )}
              </Col>
              <FormGroup>
                <FormGroup>
                  <FormLabel>الصوره الشخصيه </FormLabel>
                  <FormLabel
                    htmlFor="userImage"
                    className="btn btn-primary mt-2"
                    style={{ cursor: "pointer" }}
                  >
                    اختار صوره
                  </FormLabel>
                  <Input
                    id="userImage"
                    type="file"
                    name="image"
                    onChange={handleImageFile}
                    style={{ display: "none" }}
                  />
                  {formik.touched.image && formik.errors.image && (
                    <p className="text-danger">{formik.errors.image}</p>
                  )}
                </FormGroup>
                <FormLabel className="mt-2 text-right"> العنوان</FormLabel>
                <Container>
                  <Row>
                    <Col xs="6">
                      <Input
                        value={formik.values.address.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="address.country"
                        placeholder="دولة..."
                        type="text"
                        className="text-center mt-3 "
                      />
                      {formik.touched.address?.country &&
                        formik.errors.address?.country && (
                          <p className="text-danger">
                            {formik.errors.address?.country}
                          </p>
                        )}
                    </Col>
                    <Col xs="6">
                      <Input
                        value={formik.values.address.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="address.city"
                        placeholder="مدينة..."
                        type="text"
                        className="text-center mt-3"
                      />
                      {formik.touched.address?.city &&
                        formik.errors.address?.city && (
                          <p className="text-danger">
                            {formik.errors.address?.city}
                          </p>
                        )}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6">
                      <Input
                        value={formik.values.address.governorate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="address.governorate"
                        placeholder="محافظة..."
                        type="text"
                        className="text-center mt-3"
                      />
                      {formik.touched.address?.governorate &&
                        formik.errors.address?.governorate && (
                          <p className="text-danger">
                            {formik.errors.address?.governorate}
                          </p>
                        )}
                    </Col>
                    <Col xs="6">
                      <Input
                        value={formik.values.address.area}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="address.area"
                        placeholder="منطقة..."
                        type="text"
                        className="text-center mt-3"
                      />
                      {formik.touched.address?.area &&
                        formik.errors.address?.area && (
                          <p className="text-danger">
                            {formik.errors.address?.area}
                          </p>
                        )}
                    </Col>
                  </Row>
                </Container>
              </FormGroup>
              <button
                type="submit"
                className="btn-login mx-auto mt-4 "
                onClick={formik.handleSubmit}
              >
                تسجيل الحساب
              </button>
            </Form>
            <label className="mx-auto my-4">
              لديك حساب بالفعل؟{" "}
              <Link to="/auth/login" style={{ textDecoration: "none" }}>
                <span style={{ cursor: "pointer" }} className="text-danger">
                  اضغط هنا
                </span>
              </Link>
            </label>
          </Col>
        </Row>
      </Container>
      <FooterSite />
    </>
  );
};

export default Registration;
