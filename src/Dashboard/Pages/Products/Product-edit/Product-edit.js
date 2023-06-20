import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../../Axios";
import { ProductsForm } from "../Products-form/ProductsForm";
import { useFormik } from "formik";
import MySwal from "sweetalert2";
import { initValues, validation } from "../Products-form/validation";
import handleErrors from "../../../../Errors";

const UpdateProduct = () => {
  const [categories, setCategories] = useState(null);
  const [product, setProduct] = useState({});
  const productID = useParams().id;
  const navigate = useNavigate();

  const ProductsURL = "api/v1/products";
  const CategoriesURL = "api/v1/categories?limit=1000";

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (values) => {
      const productData = new FormData();
      console.log(values);
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
        .patch(`${ProductsURL}/${productID}`, productData, {
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
  const fetchProduct = async () => {
    axiosInstance
      .get(`${ProductsURL}/${productID}`)
      .then((response) => {
        console.log(response.data.data);
        setProduct(response.data.data);
      })
      .catch((error) => handleErrors(error));
  };
  const fetchCategories = async () => {
    axiosInstance
      .get(CategoriesURL)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => handleErrors(error));
  };
  useEffect(() => {
    // Fetch the product data based on the categoryId

    // Fetch the category data only if categoryId is provided
    if (productID) {
      fetchProduct();
      fetchCategories();
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue("name_en", product.name_en);
    formik.setFieldValue("name_ar", product.name_ar);
    formik.setFieldValue("descriptionEn", product.desc_en);
    formik.setFieldValue("descriptionAr", product.desc_ar);
    formik.setFieldValue("category", product.category_id?._id);
    formik.setFieldValue("price", product.price);
    formik.setFieldValue("quantity", product.quantity);
    formik.setFieldValue("image", product.image);
    formik.setFieldValue("images", product.images);
  }, [product]);

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          {product && categories && (
            <ProductsForm
              formik={formik}
              handleImageFile={handleImageFile}
              handleFileChange={handleFileChange}
              categories={categories}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
