import Tables from "../../../SharedUI/Table/Tables";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { axiosDashboard } from "../../../../Axios";
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import DataTable from "../../../SharedUI/DataTable/DataTable";
import handleErrors from "../../../../Errors";

const Users = () => {
  const [userData, setUserData] = useState([]);
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

  const fetch = async () => {
    await axiosDashboard
      .get(`/api/v1/users?page=${page}&limit=${rows}`, {
        params: {
          keyword: search,
        },
      })
      .then((res) => {
        const { data, pagination } = res.data;
        setUserData(data);

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

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axiosDashboard
          .delete(`/api/v1/users/${id}`)
          .then((res) => {
            console.log(res);
            setUserData((prevUser) =>
              prevUser.filter((user) => user.id !== id)
            );
            Swal.fire("Deleted!", "The User has been deleted.", "success");
          })
          .catch((error) => handleErrors(error));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleActivate = async (userId) => {
    await axiosDashboard
      .post(`/api/v1/users/${userId}/ban`)
      .then((res) => {
        // Update the user data
        setUserData((prevData) => {
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
      .post(`/api/v1/users/${userId}/unban`)
      .then((res) => {
        // Update the user data
        setUserData((prevData) => {
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

  const handlePageChange = async (event) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };
  return (
    <>
      <DataTable
        title="Users"
        setSearch={setSearch}
        addBtn={
          <Link to="/admin/users/create" className="d-flex">
            <Btn className="btn btn-primary ml-auto" title="Add User" />
          </Link>
        }
        data={userData}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        columns={[
          {
            header: "Name",
            body: (user) =>
              user.name?.length > 25
                ? user.name.substring(0, 25) + "..."
                : user.name,
          },
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
          { header: "Email", field: "email" },
          { header: "Phone", field: "phone" },
          {
            header: "Bio",
            body: (user) =>
              user.bio?.length > 30
                ? user.bio.substring(0, 30) + "..."
                : user.bio,
          },

          {
            header: "Actions",
            body: (user) => {
              return (
                <div className="d-flex justify-content-around">
                  <Link to={`/admin/UserDetail/${user.id}`}>
                    <Btn className="btn-info btn fa fa-circle-info"></Btn>
                  </Link>
                  {!user.is_active ? (
                    <button
                      title={"Activate"}
                      className="btn-danger btn fa fa-lock"
                      onClick={() => handleDeactivate(user._id)}
                    />
                  ) : (
                    <button
                      title={"Deactivate"}
                      className="btn-success btn fa fa-lock-open"
                      onClick={() => handleActivate(user._id)}
                    />
                  )}
                  <Link to={`/admin/UserEdit/${user.id}`}>
                    <Btn className="btn-primary btn fa fa-edit"></Btn>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
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

export default Users;
