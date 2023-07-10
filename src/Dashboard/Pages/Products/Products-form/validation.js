import * as Yup from "yup";

export const initValues = {
  name_en: "",
  name_ar: "",
  descriptionEn: "",
  descriptionAr: "",
  image: [],
  images: [],
  category: "",
  price: "",
  quantity: "",
};

export const validation = Yup.object({
  name_en: Yup.string()
    .min(3, "product name must be at lest 3 character")
    .matches(/^[a-zA-Z,0-9\s\-]*$/, "Invalid name format")
    .required("product name required"),
  name_ar: Yup.string()
    .min(3, "product name must be at lest 3 character")
    .matches(/^[\u0600-\u06ff\s0-9]+$/, "accepts arabic character only")
    .required("product name in arabic  required"),
  descriptionEn: Yup.string()
    .min(10, "product description must be at least 10 character")
    .matches(/^[a-zA-Z,0-9\s,'\-\.]*$/, "Invalid name format")
    .required("product description required"),
  descriptionAr: Yup.string()
    .min(10, "product description must be at least 10 character")
    .matches(/^[\u0600-\u06ff\s\-,]+$/, "accepts arabic character only")
    .required("product description in arabic required"),
  image: Yup.mixed().required("Please select image image"),
  // image: Yup.array().min(1, "Please select at least one image"),
  images: Yup.array().min(1, "Please select at least one image"),
  category: Yup.string().required("product category required"),
  price: Yup.string()
    .matches(/^[0-9,.]*$/, "numbers only allowed")
    .required("product price required"),
  quantity: Yup.string()
    .matches(/^[0-9]*$/, "numbers only allowed")
    .default(0)
    .optional(),
});
