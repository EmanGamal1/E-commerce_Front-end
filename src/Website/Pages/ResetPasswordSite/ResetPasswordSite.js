import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col, Container } from "reactstrap";
import { axiosInstance } from "../../../Axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ResetPasswordSite = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { token } = useParams();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8, "كلمة المرور يجب ألا تقل عن 8 أحرف").required("كلمـة المرور مطلوبـة"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "كلمة المرور وتأكيد كلمة المرور غير متطابقتين")
        .required("تأكيـد كلمـة المرور مطلوبة")
        .min(8, "تأكيـد كلمة المرور يجب ألا تقل عن 8 أحرف"),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.patch(`/reset-password/${token}`, {
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        Swal.fire({
          title: "تمــت",
          text: "تم تغييــر كلمة المرور بنجــاح",
          icon: "success",
          confirmButtonText: "اعـد الدخــول",
        }).then(() => {
          navigate("/login");
        });
      } catch (err) {
        console.log("error");
      }
    },
  });

  return (
    <Container fluid>
      <Row className="mt-5">
    <Col lg="5" md="5" className="m-auto">
      <Card className="shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="text-center text-muted mb-4">
            <h2>كلمــة المرور الجديدة</h2>
          </div>
          <Form role="form" onSubmit={formik.handleSubmit}>
            <FormGroup className=" mt-5">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="كلمة المرور الجديدة"
                  type="password"
                  {...formik.getFieldProps("password")}
                  autoComplete="off"
                />
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <div className="error text-danger">{formik.errors.password}</div>
              )}
            </FormGroup>
            <FormGroup className="mt-3 mb-5">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="تأكيد كلمة المرور الجديدة"
                  type="password"
                  {...formik.getFieldProps("confirmPassword")}
                  autoComplete="off"
                />
              </InputGroup>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="error text-danger">{formik.errors.confirmPassword}</div>
              )}
            </FormGroup>
            <div className="text-center">
              {errorMsg && <p>{errorMsg}</p>}
              <button
                className="btn btn-outline-primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                حفــظ
              </button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
    </Row>
    </Container>
  );
};

export default ResetPasswordSite;
