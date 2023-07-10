import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosDashboard } from "../../../../Axios";
import { CategoriesForm } from "../CategoriesForm/CategoriesForm";
import MySwal from "sweetalert2";
import { useFormik } from "formik";
import { initValues, validation } from "../CategoriesForm/validation";
import handleErrors from "../../../../Errors";
import {
  CardHeader,
  Navbar,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

const UpdateCategory = () => {
  const categoryId = useParams().id;
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const CategoriesURL = "api/v1/categories";
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (values) => {
      const categoryData = new FormData();
      categoryData.append("name_en", values.name_en);
      categoryData.append("name_ar", values.name_ar);
      categoryData.append("image", values.image[0]);

      console.log(formik.values);
      axiosDashboard
        .patch(`${CategoriesURL}/${categoryId}`, categoryData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "success!",
            text: "category updated successfully",
          });
          navigate("/admin/categories");
        })
        .catch((error) => handleErrors(error));
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      axiosDashboard
        .get(`${CategoriesURL}/${categoryId}`)
        .then((res) => {
          console.log(res.data.data);
          setCategory(res.data.data);
        })
        .catch((error) => handleErrors(error));
    };
    // Fetch the category data only if categoryId is provided
    if (categoryId) {
      fetchCategory();
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue("name_en", category.name_en);
    formik.setFieldValue("name_ar", category.name_ar);
    formik.setFieldValue("image", category.image);
  }, [category]);

  const handleImageFile = (event) => {
    formik.values.image = Array.from(event.target.files);
    console.log(formik.values.image);
  };

  return (
    <>
      <Navbar />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className=" btntitleproduct row col-12">
                  <h3 className="col-6 mb-0">Edit Category</h3>
                </div>
              </CardHeader>
              {category && (
                <CategoriesForm
                  formik={formik}
                  handleImageFile={handleImageFile}
                />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default UpdateCategory;
