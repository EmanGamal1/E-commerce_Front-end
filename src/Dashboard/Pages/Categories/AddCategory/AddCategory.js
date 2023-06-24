import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosDashboard } from "../../../../Axios";
import "./AddCategory.css";
import { Card, CardHeader, Container, Navbar, Row } from "reactstrap";
import { useFormik } from "formik";
import MySwal from "sweetalert2";
import { CategoriesForm } from "../CategoriesForm/CategoriesForm";
import { initValues, validation } from "../CategoriesForm/validation";
import handleErrors from "../../../../Errors";

const AddCategory = () => {
  const navigate = useNavigate();
  const CategoryURL = "api/v1/categories";
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (values) => {
      const categoryData = new FormData();
      categoryData.append("name_en", values.name_en);
      categoryData.append("name_ar", values.name_ar);
      categoryData.append("image", values.image[0]);

      console.log(categoryData);
      axiosDashboard
        .post(CategoryURL, categoryData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "success!",
            text: "category created successfully",
          });
          navigate("/admin/categories");
        })
        .catch((error) => handleErrors(error));
    },
  });

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
                  <h3 className="col-6 mb-0">Add Category</h3>
                </div>
              </CardHeader>
              <CategoriesForm
                formik={formik}
                handleImageFile={handleImageFile}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AddCategory;
