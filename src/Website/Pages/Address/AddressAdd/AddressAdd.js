import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SideBar from "Website/SharedUI/SideBar/SideBar";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import { Link, useNavigate } from "react-router-dom";
import addressIMG from '../../../../Website/Assests/travel.png';
import './AddressAdd.css';

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  
  if(!user){
    navigate("/login");
  }
  useEffect(() => {
    axiosInstance
      .get("profile/address")
      .then((response) => {
        if (response.data.status === "success") {
          setAddresses(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      area: "",
      city: "",
      governorate: "",
      country: ""
    },
    validationSchema: Yup.object({
      area: Yup.string().required("يجــب إدخــال المنطقــة"),
      city: Yup.string().required("يجــب إدخــال المدينــة"),
      governorate: Yup.string().required("يجــب إدخــال المحافظــة"),
      country: Yup.string().required("يجــب إدخــال الدولــــة")
    }),
    onSubmit: (values, { setSubmitting }) => {
      axiosInstance
        .post("profile/address", values)
        .then((response) => {
          if (response.data.status === "success") {
            setAddresses([...addresses, response.data.data]);
            formik.resetForm();
            navigate("/address");
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  });

  return (
    <Container fluid className="mt-4">
      <Row>
        <SideBar />
        <Col lg="8">
          <Card className="shadow pr-4">
            <CardHeader>
              <h2>
                <Link to="/address">
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                إضافــة عنـــوان جديد{" "}
              </h2>
            </CardHeader>
            <CardBody>
              <Card>
                <CardBody className="row addressAddForm">
                  <form className="form col-lg-6 col-md-6 col-xs-6" onSubmit={formik.handleSubmit}>
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المنطقــة"
                      name="area"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.area && formik.errors.area ? (
                      <div className="text-danger">{formik.errors.area}</div>
                    ) : null}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المدينــة"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <div className="text-danger">{formik.errors.city}</div>
                    ) : null}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المحافظــة"
                      name="governorate"
                      value={formik.values.governorate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.governorate && formik.errors.governorate ? (
                      <div className="text-danger">{formik.errors.governorate}</div>
                    ) : null}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="الدولــــة"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className="text-danger">{formik.errors.country}</div>
                    ) : null}
                    <input
                      type="submit"
                      className="btn btn-outline-warning"
                      value="إضافة"
                      disabled={formik.isSubmitting}
                    />
                  </form>
                  <div className="col-lg-6 col-md-6">
                    <img src={addressIMG} alt="address" className="addressIMG" />
                  </div>
                </CardBody>
              </Card>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Address;