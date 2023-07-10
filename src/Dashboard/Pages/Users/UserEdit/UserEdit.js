import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";
import { axiosDashboard } from "../../../../Axios";
import { FormLabel } from "react-bootstrap";
import handleErrors from "../../../../Errors";

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the user data based on the ID and populate the form fields
    axiosDashboard
      .get(`/api/v1/users/${id}`)
      .then((res) => {
        const userData = res.data.data;
        console.log(userData);
        formik.setValues(userData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: "",
      bio: "",
      country: "",
      city: "",
      governate: "",
      area: "",
      is_active: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Invalid name format")
        .required("Enter the name"),
      /*email: Yup.string().email("Invalid email address").required("Enter the email"),*/
      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Invalid phone number")
        .required("Enter the phone number"),
      /* password: Yup.string()
               .min(8, "Password must be at least 8 characters")
               .max(20, "Password must be less than 20 characters")
               .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "Invalid password format")
               .required("Enter the password"),*/
      /*image: Yup.mixed()
                .test("fileFormat", "Unsupported file format", (value) => {
                    if (value) {
                      console.log(value)
                      // check if url is valid
                        const url = value;
                        const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
                        if (regex.test(url)) {
                            return true;
                        }
                        const supportedFormats = ["image/png", "image/jpg", "image/jpeg", "image/PNG"];
                        return supportedFormats.includes(value.type);
                    }
                    return true; // Allow empty field
                }),*/
      image: Yup.mixed().required("Please select Valid image"),
      bio: Yup.string().required("Enter the bio"),
      /*country: Yup.string().required("Enter the country"),
            city: Yup.string().required("Enter the city"),
            governate: Yup.string().required("Enter the governate"),
            area: Yup.string().required("Enter the area"),*/
      // change is_active checkbox to boolean
      //   is_active: Yup.boolean().oneOf([true, false], "Select the status"),
    }),
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        // password: values.password,
        image: values.image[0],
        bio: values.bio,
        // country: values.country,
        // city: values.city,
        // governate: values.governate,
        // area: values.area,
        // is_active: values.is_active,
      };

      axiosDashboard
        .patch(`/api/v1/users/${id}`, userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "Success!",
            text: "Your changes have been saved successfully.",
          });
          navigate("/admin/users");
        })
        .catch((error) => handleErrors(error));
    },
  });

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>Edit User</CardHeader>
            <CardBody>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Name</label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control form-control-alternative"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.name && formik.touched.name}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <span className="text-danger">
                          {formik.errors.name}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Email</label>
                      <input
                        className="form-control form-control-alternative"
                        // readOnly={true}
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.email && formik.touched.email}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <span className="text-danger">
                          {formik.errors.email}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <label>Phone</label>
                      <input
                        className="form-control form-control-alternative"
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.phone && formik.touched.phone}
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <span className="text-danger">
                          {formik.errors.phone}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                  {/*<Col>
                                        <FormGroup>
                                            <label>Image</label>
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={(event) => {
                                                    formik.setFieldValue("image", event.currentTarget.files[0]);
                                                }}
                                                className="form-control form-control-alternative"
                                            />
                                            {formik.errors.image && formik.touched.image && (
                                                <span className="text-danger">{formik.errors.image}</span>
                                            )}
                                        </FormGroup>
                                    </Col>*/}
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
                        <span className="text-danger">
                          {formik.errors.image}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {/*<Col>
                    <FormGroup>
                      <label>Password</label>
                      <input
                       className="form-control form-control-alternative"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.errors.password && formik.touched.password}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <span className="text-danger">{formik.errors.password}</span>
                      )}
                    </FormGroup>
                  </Col>*/}
                  <Col>
                    <FormGroup>
                      <label>Bio</label>
                      <textarea
                        rows={5}
                        name="bio"
                        value={formik.values.bio}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control form-control-alternative"
                      ></textarea>
                      {formik.errors.bio && formik.touched.bio && (
                        <span className="text-danger">{formik.errors.bio}</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                {/*<Row>
                                    <Col>
                                        <FormGroup>
                                            <label>Country</label>
                                            <input
                                                className="form-control form-control-alternative"
                                                type="text"
                                                name="country"
                                                value={formik.values.country}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.errors.country && formik.touched.country}
                                            />
                                            {formik.errors.country && formik.touched.country && (
                                                <span className="text-danger">{formik.errors.country}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label>City</label>
                                            <input
                                                className="form-control form-control-alternative"
                                                type="text"
                                                name="city"
                                                value={formik.values.city}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.errors.city && formik.touched.city}
                                            />
                                            {formik.errors.city && formik.touched.city && (
                                                <span className="text-danger">{formik.errors.city}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label>Governate</label>
                                            <input
                                                className="form-control form-control-alternative"
                                                type="text"
                                                name="governate"
                                                value={formik.values.governate}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.errors.governate && formik.touched.governate}
                                            />
                                            {formik.errors.governate && formik.touched.governate && (
                                                <span className="text-danger">{formik.errors.governate}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <label>Area</label>
                                            <input
                                                className="form-control form-control-alternative"
                                                type="text"
                                                name="area"
                                                value={formik.values.area}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik.errors.area && formik.touched.area}
                                            />
                                            {formik.errors.area && formik.touched.area && (
                                                <span className="text-danger">{formik.errors.area}</span>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>*/}
                {/*<Row>
                                    <Col >
                                        <FormGroup>
                                            <label>Active</label>
                                            <input
                                                type="checkbox"
                                                name="is_active"
                                                TrueValue={true}
                                                FalseValue={false}
                                                checked={formik.values.is_active}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                className="h1 form-control"
                                            />
                                        </FormGroup>
                                    </Col>
                                  <Col/>
                                  <Col/>
                                  <Col/>
                                  <Col/>

                                </Row>*/}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Save Changes
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

export default UserEdit;
