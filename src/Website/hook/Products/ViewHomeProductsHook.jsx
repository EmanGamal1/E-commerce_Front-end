import { axiosInstance } from "../../../Axios";
import { useEffect, useState } from "react";

export const ViewHomeProductsHook = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = (page = 1) => {
    axiosInstance
      .get(`products?page=${page}&sort=-total_orders&limit=4`)
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
