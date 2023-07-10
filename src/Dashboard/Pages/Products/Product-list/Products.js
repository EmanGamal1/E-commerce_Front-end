import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import { axiosDashboard } from "Axios.js";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Btn from "../../../SharedUI/Btn/Btn";
import Swal from "sweetalert2";
import MySwal from "sweetalert2";
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";
import DataTable from "../../../SharedUI/DataTable/DataTable";
import handleErrors from "../../../../Errors";

const Products = () => {
  const navigate = useNavigate();
  const Product_URL = "api/v1/products";
  const [product, setProduct] = useState([]);
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

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [rows, page, search]);

  const fetch = () => {
    axiosDashboard
      .get(`${Product_URL}?page=${page}&limit=${rows}`, {
        params: {
          keyword: search,
        },
      })
      .then((response) => {
        console.log(response.data);
        const { data, pagination } = response.data;
        setProduct(data);

        setPagination({
          currentPage: pagination.current_page,
          totalPages: pagination.total_pages,
          limit: pagination.limit,
          total: pagination.total,
        });
      })
      .catch((error) => handleErrors(error));
    setLoading(false);
  };

  const handleDeleteProduct = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want delete ${name} Product!`,
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
      .delete(`${Product_URL}/${id}`)
      .then((response) => {
        // Update the component's state or perform any other necessary actions
        setProduct(product.filter((product) => product.id !== id));
        MySwal.fire({
          icon: "success",
          title: "success!",
          text: "Product deleted successfully",
        });
      })
      .catch((error) => handleErrors(error));
  };
  const handleActivate = async (userId) => {
    await axiosDashboard
      .post(`${Product_URL}/${userId}/ban`)
      .then((res) => {
        // Update the user data
        setProduct((prevData) => {
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
      .post(`${Product_URL}/${userId}/unban`)
      .then((res) => {
        // Update the user data
        setProduct((prevData) => {
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
  const handleEditProduct = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };
  const handlePageChange = async (event) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };

  return (
    <>
      <DataTable
        title="Products"
        setSearch={setSearch}
        addBtn={
          <Link to="/admin/addProducts" className="d-flex">
            <Btn className="btn btn-primary ml-auto" title="Add Product" />
          </Link>
        }
        data={product}
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
          { header: "Category", field: "category_id.name_en" },
          { header: "Description", field: "desc_en" },
          { header: "Description", field: "desc_ar" },
          { header: "Price", field: "price" },
          { header: "Quantity", field: "quantity" },

          {
            header: "Actions",
            body: (product) => {
              return (
                <div className="d-flex justify-content-around">
                  {!product.is_active ? (
                    <Btn
                      className="btn-danger btn fa fa-lock"
                      onClick={() => handleDeactivate(product.id)}
                    />
                  ) : (
                    <Btn
                      className="btn-success btn fa fa-lock-open"
                      onClick={() => handleActivate(product.id)}
                    />
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditProduct(product._id)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      handleDeleteProduct(product._id, product.name_en)
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

export default Products;
