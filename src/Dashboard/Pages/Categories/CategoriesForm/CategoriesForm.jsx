import { FormGroup, Input } from "reactstrap";
import { FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

export const CategoriesForm = ({ formik, handleImageFile }) => {
  return (
    <>
      <form className="container" onSubmit={formik.handleSubmit}>
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
            Category Image : Browse
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
        <div className="col-lg-12 mt-3">
          <div className="form-group">
            <button className="btn btn-success" type="submit">
              Save
            </button>
            <Link to="/admin/categories" className="btn btn-danger">
              Back
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};
