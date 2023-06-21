import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Axios";

const AllProductsCategoryHook = (categorySlug) => {
  const [items, setItems] = useState();
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = (catSlug = categorySlug, page = 1, limit = 8) => {
    axiosInstance
      .get(`categories/${catSlug}/products?page=${page}&limit=${limit}`)
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  //when click pagination
  const onPress = async (page) => {
    getProduct(categorySlug, page);
  };

  return [items, onPress];
};

export default AllProductsCategoryHook;
