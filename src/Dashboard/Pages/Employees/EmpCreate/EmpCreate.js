import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Row,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";
import { axiosDashboard } from "../../../../Axios";
import handleErrors from "../../../../Errors";

const EmpCreate = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axiosDashboard
      .get("/api/v1/roles?fields=name&limit=1000")
      .then((res) => {
        setRoles(res.data.data); // Assuming the response contains an array of roles
      })
      .catch((error) => handleErrors(error));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, "Invalid name format")
        .required("Enter the name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter the email"),
      phone: Yup.string()
        .matches(/^[0-9]{11}$/, "Invalid phone number")
        .required("Enter the phone number"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password must be less than 20 characters")
        .required("Enter the password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (values.password !== values.confirmPassword) {
        console.log(values.password);
        console.log(values.passwordConfirm);

        formik.setFieldError("confirmPassword", "Passwords must match");
        return;
      }
      console.log(values);
      const empData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        role_id: values.role_id,
      };

      axiosDashboard
        .post("/api/v1/employees", empData)
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "Success!",
            text: "Your changes have been saved successfully.",
          });
          navigate("/admin/employees");
        })
        .catch((error) => handleErrors(error));
    },
  });

  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>Create Employee</CardHeader>
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
                        className="form-control"
                      />
                      {formik.errors.name && formik.touched.name && (
                        <span className="text-danger">
                          {formik.errors.name}
                        </span>
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
                        className="form-control"
                      />
                      {formik.errors.email && formik.touched.email && (
                        <span className="text-danger">
                          {formik.errors.email}
                        </span>
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
                        className="form-control"
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <span className="text-danger">
                          {formik.errors.phone}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.password && formik.touched.password && (
                        <span className="text-danger">
                          {formik.errors.password}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formik.values.passwordConfirm}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      />
                      {formik.errors.passwordConfirm &&
                        formik.touched.passwordConfirm && (
                          <span className="text-danger">
                            {formik.errors.passwordConfirm}
                          </span>
                        )}
                    </div>
                  </Col>
                  <Col>
                    <FormGroup>
                      <label>Role</label>
                      <select
                        name="role_id"
                        id="role_id"
                        value={formik.values.role_id}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="form-control"
                      >
                        <option value="">Select a role</option>
                        {roles.map((role) => (
                          <option key={role._id} value={role._id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      {formik.errors.role_id && formik.touched.role_id && (
                        <span className="text-danger">
                          {formik.errors.role_id}
                        </span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Create
                  </button>
                  <Link to="/admin/employees" className="btn btn-secondary">
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

export default EmpCreate;
