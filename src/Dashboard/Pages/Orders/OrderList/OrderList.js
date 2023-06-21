import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Tables from "../../../SharedUI/Table/Tables";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosInstance } from "../../../../Axios";
import PaginationAdmin from "../../../SharedUI/PaginationAdmin/PaginationAdmin";
import DataTable from "../../../SharedUI/DataTable/DataTable";
import handleErrors from "../../../../Errors";

const Orders = () => {
  const [orderdata, setOrderData] = useState([]);

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

  // check that there is no page as argument and the url is clearly using pagination
  const fetch = async () => {
    setLoading(true);
    axiosInstance
      .get(`/api/v1/orders?page=${page}&limit=${rows}`, {
        params: {
          keyword: search,
        },
      })
      .then((res) => {
        setOrderData(res.data.data);
        setPagination({
          currentPage: res.data.pagination.current_page,
          totalPages: res.data.pagination.total_pages,
          limit: res.data.pagination.limit,
          total: res.data.pagination.total,
        });
      })
      .catch((error) => handleErrors(error));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch();
  }, [rows, page, search]);

  const handleCancelOrder = async (id, status) => {
    console.log("cancel", id, status);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to cancel this order!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        const res = await axiosInstance.patch(`/api/v1/orders/${id}/cancel`);
        setOrderData((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === id) {
              return {
                ...order,
                status: res.data.data.status,
                payment_status: res.data.data.payment_status,
              };
            }
            return order;
          })
        );
        Swal.fire("Cancelled!", "The order has been cancelled.", "success");
      }
    } catch (error) {
      handleErrors(error);
    }
  };
  const confirmOrder = async (id, status) => {
    try {
      if (status === "Cancelled" || status === "Processing") {
        return; // Disable the button if the order is already cancelled
      }

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You are about to update the order status!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        const res = await axiosInstance.patch(`/api/v1/orders/${id}/confirm`);
        setOrderData((prevOrders) =>
          prevOrders.map((order) => {
            if (order._id === id) {
              return {
                ...order,
                status: res.data.data.status,
                payment_status: res.data.data.payment_status,
              };
            }
            return order;
          })
        );
        Swal.fire(
          "Updated!",
          "The order status has been updated to processing.",
          "success"
        );
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handlePageChange = async (event) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };

  const setSortBy = async (event) => {
    setPage(1);
    setRows(5);
    setSearch(event.target.value);
  };

  return (
    <>
      <DataTable
        title="Orders"
        /*addBtn={
                    <Link to="/admin/employees/create" className='d-flex'>
                        <Btn
                            className="btn btn-primary ml-auto"
                            title="Add Employee"
                        />
                    </Link>
                }*/
        data={orderdata}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSort={setSortBy}
        setSearch={setSearch}
        columns={[
          { header: "Order Id", field: "id" },
          {
            header: "Date",
            body: (order) => {
              const date = new Date(order.createdAt);
              return date.toLocaleDateString();
            },
          },
          { header: "Quantity", field: "products.length" },
          { header: "Total Price", field: "total_price" },
          { header: "Payment Status", field: "payment_status" },
          { header: "Payment Method", field: "payment_method" },
          { header: "Status", field: "status" },
          {
            header: "Actions",
            body: (order) => {
              return (
                <div className="d-flex justify-content-around">
                  <Link to={`/admin/OrderDetails/${order._id}`}>
                    <button
                      title={"view order"}
                      className="btn-primary btn fa fa-circle-info mr-2"
                    />
                  </Link>
                  <button
                    title={"Confirm order"}
                    onClick={() => confirmOrder(order._id, order.status)}
                    style={{
                      opacity:
                        order.status !== "Pending" ||
                        order.payment_method !== "Cash"
                          ? 0.5
                          : 1,
                    }}
                    disabled={
                      order.status !== "Pending" ||
                      order.payment_method !== "Cash"
                    }
                    className="btn-success btn fa fa-circle-check"
                  />
                  <button
                    title={"Cancel order"}
                    className={"btn-danger btn fa fa-ban"}
                    style={{
                      opacity:
                        order.status !== "Pending" ||
                        order.payment_method !== "Cash"
                          ? 0.5
                          : 1,
                    }}
                    disabled={
                      order.status !== "Pending" ||
                      order.payment_method !== "Cash"
                    }
                    onClick={() => handleCancelOrder(order._id, order.status)}
                  />
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
};

export default Orders;
