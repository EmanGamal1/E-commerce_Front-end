import { FormGroup, Input } from "reactstrap";
import { FormLabel, FormSelect } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

export const ProductsForm = ({
  formik,
  categories,
  handleImageFile,
  handleFileChange,
}) => {
  return (
    <>
      <form className="container mt-2" onSubmit={formik.handleSubmit}>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name_en"
            placeholder="name"
            value={formik.values.name_en}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name_en && formik.touched.name_en && (
            <span className="text-danger">{formik.errors.name_en}</span>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>الاسم</FormLabel>
          <Input
            type="text"
            placeholder="الاسم"
            name="name_ar"
            value={formik.values.name_ar}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.name_ar && formik.touched.name_ar && (
            <span className="text-danger">{formik.errors.name_ar}</span>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>Description</FormLabel>
          <Input
            type="textarea"
            rows="3"
            name="descriptionEn"
            value={formik.values.descriptionEn}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.descriptionEn && formik.touched.descriptionEn && (
            <span className="text-danger">{formik.errors.descriptionEn}</span>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>الوصف</FormLabel>
          <Input
            type="textarea"
            rows="3"
            name="descriptionAr"
            value={formik.values.descriptionAr}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.descriptionAr && formik.touched.descriptionAr && (
            <span className="text-danger">{formik.errors.descriptionAr}</span>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>Category</FormLabel>
          <FormSelect
            className="form-control"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            onBlur={formik.handleBlur}
            defaultValue={formik.values.category}
          >
            <option>Select Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name_en}
                </option>
              ))}
          </FormSelect>
          {formik.errors.category && formik.touched.category && (
            <span className="text-danger">{formik.errors.category}</span>
          )}
        </FormGroup>

        <FormGroup>
          {formik.values.image != "" && (
            <>
              <img
                src={formik.values.image}
                alt="category"
                width="200"
                height="200"
                style={{ objectFit: "cover" }}
              />
              <br />
            </>
          )}
          <FormLabel
            htmlFor="coverImage"
            className="btn btn-primary"
            style={{ cursor: "pointer" }}
          >
            Cover Image : Browse
          </FormLabel>
          <Input
            id="coverImage"
            type="file"
            name="image"
            className="form-control"
            style={{ display: "none" }}
            onBlur={formik.handleBlur}
            onChange={handleImageFile}
          />
          {formik.errors.image && formik.touched.image && (
            <span className="text-danger">{formik.errors.image}</span>
          )}
        </FormGroup>
        <FormGroup>
          {formik.values.images &&
            formik.values.images.map((image, index) => (
              <img
                className={"m-2"}
                key={index}
                src={image}
                alt="product"
                width="200"
                height="200"
                style={{ objectFit: "cover" }}
              />
            ))}
          <br />
          <FormLabel
            htmlFor="images"
            className="btn btn-primary"
            style={{ cursor: "pointer" }}
          >
            Images : Browse
          </FormLabel>
          <Input
            type="file"
            name="images"
            id="images"
            style={{ display: "none" }}
            onBlur={formik.handleBlur}
            onChange={handleFileChange}
            multiple={true}
          />
          {formik.errors.images && formik.touched.images && (
            <span className="text-danger">{formik.errors.images}</span>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>Price</FormLabel>
          <Input
            type="text"
            name="price"
            placeholder="Price"
            value={formik.values.price}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.price && formik.touched.price && (
            <span className="text-danger">{formik.errors.price}</span>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="text"
            name="quantity"
            placeholder="quantity"
            value={formik.values.quantity}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <span className="text-danger">{formik.errors.quantity}</span>
          )}
        </FormGroup>
        <div className="col-lg-12 mt-3">
          <div className="form-group">
            <button className="btn btn-success" type="submit">
              Save
            </button>
            <Link to="/admin/products" className="btn btn-danger">
              Back
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};
