import { axiosInstance } from "../../../Axios";
import { useEffect, useState } from "react";

export const HomeCategoriesHook = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllCategories = (page = 1, limit = 5) => {
      axiosInstance
        .get(`categories?page=${page}&limit=${limit}`)
        .then((categories) => {
          console.log(categories.data.data);
          setCategories(categories.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    };
    getAllCategories();
  }, []);
  useEffect(() => {}, [categories]);
  return [categories, loading];
};
