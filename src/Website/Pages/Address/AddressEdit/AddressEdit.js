import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import SideBar from "Website/SharedUI/SideBar/SideBar";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import addressIMG from '../../../../Website/Assests/travel.png';

const AddressEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOldValues = async () => {
      try {
        const response = await axiosInstance.get(`/profile/address/${id}`);
        const oldData = response.data.data[0];
        formik.setValues(oldData);
      } catch (error) {
        console.error("Failed to fetch old values:", error);
      }
    };
    fetchOldValues();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      area: "",
      city: "",
      governorate: "",
      country: "",
    },
    validationSchema: Yup.object({
      area: Yup.string().required("يجب إدخال المنطقة"),
      city: Yup.string().required("يجب إدخال المدينة"),
      governorate: Yup.string().required("يجب إدخال المحافظة"),
      country: Yup.string().required("يجب إدخال الدولة"),
    }),
    onSubmit: async (values) => {
      const updatedValues = {
        city: values.city,
        governorate: values.governorate,
        country: values.country,
        area: values.area,
      };

      try {
        await axiosInstance.patch(`/profile/address/${id}`, updatedValues);
        navigate("/address");
        Swal.fire({
          icon: "success",
          title: "تم التحديث بنجاح",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error("Failed to update address:", error);
      }
    },
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
                تعديل العنوان
              </h2>
            </CardHeader>
            <CardBody>
              <Card>
                <CardBody className="row addressEditForm">
                  <form className="form col-lg-6 col-md-6 col-xs-12" onSubmit={formik.handleSubmit}>
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المنطقــة"
                      name="area"
                      value={formik.values.area}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.area && formik.errors.area && (
                      <div className="error-message">{formik.errors.area}</div>
                    )}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المدينــة"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="error-message">{formik.errors.city}</div>
                    )}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="المحافظــة"
                      name="governorate"
                      value={formik.values.governorate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.governorate && formik.errors.governorate && (
                      <div className="error-message">{formik.errors.governorate}</div>
                    )}
                    <input
                      className="form-control w-75 mb-3"
                      placeholder="الدولــــة"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="error-message">{formik.errors.country}</div>
                    )}
                    <input
                      type="submit"
                      className="btn btn-outline-warning"
                      value="حفــظ التعــديلات"
                    />
                  </form>
                  <div className="col-6">
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

export default AddressEdit;
