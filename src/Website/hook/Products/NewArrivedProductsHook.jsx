import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Axios";

export const NewArrivedProductsHook = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const NewArrivedProductsURL = "products";
  useEffect(() => {
    getNewArrivedProducts();
  }, []);
  const getNewArrivedProducts = (page = 1) => {
    axiosInstance
      .get(`${NewArrivedProductsURL}?page=${page}&limit=4&sort=-createdAt`)
      .then((products) => {
        console.log("products", products.data.data);
        setProducts(products.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return [products, loading];
};
