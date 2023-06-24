import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Axios";

export const AllCategoriesHook = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const getAllCategories = (page = 1, limit = 1000) => {
    axiosInstance
      .get(`categories?page=${page}&limit=${limit}`)
      .then((categories) => {
        console.log(categories.data.data);
        setCategories(categories.data.data);
        setPagination(categories.data.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {}, [categories]);

  const getPage = (page) => {
    getAllCategories(page);
  };
  return [categories, loading, pagination, getPage];
};
