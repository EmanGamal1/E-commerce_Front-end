import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {Card, CardHeader, Container, Row, Col, CardBody, FormGroup, Input} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from 'sweetalert2';
import Btn from "Dashboard/SharedUI/Btn/Btn";
import input from "Dashboard/SharedUI/Input/Input";
import { axiosDashboard } from "../../../../Axios";
import {FormLabel} from "react-bootstrap";
import handleError from "../../../../Errors";
const UserCreate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      image: "",
      bio: "",
      country: "",
      city: "",
      governorate: "",
      area: "",
      // active: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z\s]*$/, "Invalid name format").required("Enter the name"),
      email: Yup.string().email("Invalid email address").required("Enter the email"),
      phone: Yup.string().matches(/^0[0125][0-9]{9}$/, "Invalid phone number").required("Enter the phone number"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Invalid password format")
        .required("Enter the password"),
      /*image: Yup.mixed()
        .test("fileFormat", "Unsupported file format", (value) => {
          if (value) {
            const supportedFormats = ["image/png", "image/jpg", "image/jpeg"];
            return supportedFormats.includes(value.type);
          }
          return true; // Allow empty field
        }),*/
      // is same as password

      confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref("password"), null], "Passwords must match"),
      image: Yup.mixed().required("Please select Valid image"),
      bio: Yup.string().required("Enter the bio"),
      country: Yup.string().required("Enter the country"),
      city: Yup.string().required("Enter the city"),
      governorate: Yup.string().required("Enter the governorate"),
      area: Yup.string().required("Enter the area"),
    }),
    onSubmit: (values) => {
        const userData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          confirmPassword: values.confirmPassword,
          image: values.image[0],
          bio: values.bio,
          address: {
            country: values.country,
            city: values.city,
            governorate: values.governorate,
            area: values.area,
          },
          // active: values.active,

          
        };
  
        axiosDashboard
        .post("/api/v1/users", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your changes have been saved successfully.',
          });
          navigate("/admin/users");
        })
        .catch((err) => {
          handleError(err);

        });
    },
    });

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>Create User</CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <span className="text-danger">{formik.errors.name}</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.email && formik.touched.email && (
                        <span className="text-danger">{formik.errors.email}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <span className="text-danger">{formik.errors.phone}</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Image</label>
                      <FormLabel
                          htmlFor="coverImage"
                          className="btn btn-primary"
                          style={{ cursor: "pointer" }}
                      >
                        Category Image : Browse
                      </FormLabel>
                      <Input
                          id="coverImage"
                          type="file"
                          name="image"
                          className="form-control"
                          style={{ display: "none" }}
                          onBlur={formik.handleBlur}
                          onChange={(event) => {
                            formik.values.image = Array.from(event.target.files);
                            console.log(formik.values.image);
                          }}
                      />
                      {formik.errors.image && formik.touched.image && (
                          <span className="text-danger">{formik.errors.image}</span>
                      )}
                    </FormGroup>
                  </Col>

                </Row>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                          type="password"
                          name="password"
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          className="form-control form-control-alternative"
                      />
                      {formik.errors.password && formik.touched.password && (
                          <span className="text-danger">{formik.errors.password}</span>
                      )}
                    </div>
                  </Col>
                <Col>
                    <div className="form-group">
                      <label>confirmPassword</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <span className="text-danger">{formik.errors.confirmPassword}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>

                  <Col>
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea
                        name="bio"
                        value={formik.values.bio}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      ></textarea>
                      {formik.errors.bio && formik.touched.bio && (
                        <span className="text-danger">{formik.errors.bio}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formik.values.country}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.country && formik.touched.country && (
                        <span className="text-danger">{formik.errors.country}</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.city && formik.touched.city && (
                        <span className="text-danger">{formik.errors.city}</span>
                      )}
                    </div>
                  </Col>
                
                  <Col>
                    <div className="form-group">
                      <label>Governate</label>
                      <input
                        type="text"
                        name="governorate"
                        value={formik.values.governorate}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.governorate && formik.touched.governorate && (
                        <span className="text-danger">{formik.errors.governorate}</span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <label>Area</label>
                      <input
                        type="text"
                        name="area"
                        value={formik.values.area}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      />
                      {formik.errors.area && formik.touched.area && (
                        <span className="text-danger">{formik.errors.area}</span>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* <div className="form-group">
                  <label>Active</label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formik.values.active}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="form-control "
                  />
                </div> */}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Create
                  </button>
                  <Link to="/admin/users" className="btn btn-secondary">
                    Cancel
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserCreate;
