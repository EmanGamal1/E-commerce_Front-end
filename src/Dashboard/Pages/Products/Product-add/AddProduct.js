import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Container, Navbar, Row } from "reactstrap";
import { axiosInstance } from "../../../../Axios";
import { useFormik } from "formik";
import MySwal from "sweetalert2";
import { ProductsForm } from "../Products-form/ProductsForm";
import { initValues, validation } from "../Products-form/validation";
import handleErrors from "../../../../Errors";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const CategoriesURL = "api/v1/categories";
  const ProductsURL = "api/v1/products";
  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (values) => {
      const productData = new FormData();

      productData.append("name_en", values.name_en);
      productData.append("name_ar", values.name_ar);
      productData.append("image", values.image[0]);
      values.images.forEach((image) => {
        productData.append("images", image);
      });
      productData.append("category_id", values.category);
      productData.append("desc_en", values.descriptionEn);
      productData.append("desc_ar", values.descriptionAr);
      productData.append("price", values.price);
      productData.append("quantity", values.quantity);
      console.log(productData);
      axiosInstance
        .post(ProductsURL, productData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          MySwal.fire({
            icon: "success",
            title: "success!",
            text: "product created successfully",
          });
          navigate("/admin/products");
        })
        .catch((error) => handleErrors(error));
    },
  });
  const handleImageFile = (event) => {
    formik.values.image = Array.from(event.target.files);
    console.log(formik.values.image);
  };
  const handleFileChange = (event) => {
    formik.values.images = Array.from(event.target.files);
    console.log(formik.values.images);
  };

  async function getCategories() {
    try {
      const res = await axiosInstance.get(CategoriesURL);
      console.log(res.data);
      setCategories(res.data.data);
    } catch (error) {
      handleErrors(error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Navbar />
      <Container className="mt-7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className=" btntitleproduct row col-12">
                  <h3 className="col-6 mb-0">Add products</h3>
                </div>
              </CardHeader>

              <ProductsForm
                formik={formik}
                categories={categories}
                handleFileChange={handleFileChange}
                handleImageFile={handleImageFile}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddProduct;
