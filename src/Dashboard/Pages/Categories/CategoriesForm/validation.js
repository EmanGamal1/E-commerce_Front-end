import * as Yup from "yup";

export const initValues = {
  name_en: "",
  name_ar: "",
  image: [],
};
export const validation = Yup.object({
  name_en: Yup.string()
    .min(3, "category name must be at lest 3 character")
    .matches(/^[a-zA-Z\s]*$/, "Invalid name format")
    .required("category name required"),
  name_ar: Yup.string()
    .min(3, "category name must be at lest 3 character")
    .matches(/^[\u0600-\u06ff\s]+$/, "accepts arabic character only")
    .required("category name in arabic  required"),
  image: Yup.mixed().required("Please select category image"),
});
