import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import { axiosDashboard } from "Axios.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Btn from "../../../SharedUI/Btn/Btn";
import MySwal from "sweetalert2";
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";
import DataTable from "../../../SharedUI/DataTable/DataTable";
import handleErrors from "../../../../Errors";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  // For pagination
  const [search, setSearch] = useState(""); // Search keyword
  const [rows, setRows] = useState(5); // Number of rows per page
  const [page, setPage] = useState(1); // Current page number
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: null,
    totalPages: null,
    limit: null,
    total: null,
  });

  const CategoriesURL = "api/v1/categories";

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [rows, page, search]);

  const fetch = () => {
    axiosDashboard
      .get(`${CategoriesURL}?page=${page}&limit=${rows}`, {
        params: {
          keyword: search,
        },
      })
      .then((response) => {
        console.log(response.data);
        const { data, pagination } = response.data;
        setCategories(data);

        setPagination({
          currentPage: pagination.current_page,
          totalPages: pagination.total_pages,
          limit: pagination.limit,
          total: pagination.total,
        });
      })
      .catch((error) => handleErrors(error));
  };

  const handleDeleteCategory = (id, name) => {
    MySwal.fire({
      title: "Are you sure?",
      text: `You want delete ${name} category!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          callApiToDelete(id);
        }
      })
      .catch((error) => handleErrors(error));
  };

  const callApiToDelete = (id) => {
    axiosDashboard
      .delete(`${CategoriesURL}/${id}`)
      .then((response) => {
        setCategories(categories.filter((category) => category.id !== id));
        MySwal.fire({
          icon: "success",
          title: "success!",
          text: "category deleted successfully",
        });
      })
      .catch((error) => handleErrors(error));
  };
  const handleActivate = async (userId) => {
    await axiosDashboard
      .post(`${CategoriesURL}/${userId}/ban`)
      .then((res) => {
        // Update the user data
        setCategories((prevData) => {
          const updatedData = [...prevData];
          const userIndex = updatedData.findIndex(
            (user) => user._id === userId
          );
          if (userIndex !== -1) {
            updatedData[userIndex] = {
              ...updatedData[userIndex],
              is_active: false,
            };
          }
          return updatedData;
        });
      })

      .catch((error) => handleErrors(error));
  };

  const handleDeactivate = async (userId) => {
    await axiosDashboard
      .post(`${CategoriesURL}/${userId}/unban`)
      .then((res) => {
        // Update the user data
        setCategories((prevData) => {
          const updatedData = [...prevData];
          const userIndex = updatedData.findIndex(
            (user) => user._id === userId
          );
          if (userIndex !== -1) {
            updatedData[userIndex] = {
              ...updatedData[userIndex],
              is_active: true,
            };
          }
          return updatedData;
        });
      })
      .catch((error) => handleErrors(error));
  };
  const handleEditCategory = (id) => {
    navigate(`/admin/editcategory/${id}`);
  };

  const handlePageChange = async (event) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };
  return (
    <>
      <DataTable
        title="Categories"
        setSearch={setSearch}
        addBtn={
          <Link to="/admin/addCategory" className="d-flex">
            <Btn className="btn btn-primary ml-auto" title="Add Category" />
          </Link>
        }
        data={categories}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        columns={[
          { header: "Name", field: "name_en" },
          { header: "الاسم", field: "name_ar" },
          {
            header: "Image",
            body: (product) => (
              <img
                className="img-thumbnail"
                /*style={{ maxWidth: "200px", width: "50%", maxHeight: "100px", height: "50%", objectFit: "cover" }}*/
                style={{
                  maxWidth: "100px",
                  maxHeight: "50px",
                  objectFit: "cover",
                }}
                src={product.image}
                alt={product.name}
              />
            ),
          },

          {
            header: "Actions",
            body: (category) => {
              return (
                <div className="d-flex justify-content-around">
                  {!category.is_active ? (
                    <button
                      title={"Activate"}
                      className="btn-danger btn fa fa-lock"
                      onClick={() => handleDeactivate(category._id)}
                    />
                  ) : (
                    <button
                      title={"Deactivate"}
                      className="btn-success btn fa fa-lock-open"
                      onClick={() => handleActivate(category._id)}
                    />
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditCategory(category._id)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDeleteCategory(category._id, category.name_en)
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
};

export default Categories;
