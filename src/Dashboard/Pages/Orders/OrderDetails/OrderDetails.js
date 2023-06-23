import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Col,
  Row,
  Navbar,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";

import "../OrderDetails/OrderDetails";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosDashboard } from "../../../../Axios";
import Swal from "sweetalert2";
import handleErrors from "../../../../Errors";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderdata, setOrderData] = useState({});
  const [productData, setProductData] = useState([]);

  const handleCancelOrder = async (id, status) => {
    try {
      if (
        status === "Processing" ||
        status === "Completed" ||
        status === "Cancelled"
      ) {
        return; // Disable cancel button if order status is processing or completed
      }

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
        const res = await axiosDashboard.patch(`/api/v1/orders/${id}/cancel`);
        setOrderData({ ...orderdata, status: "Cancelled" });
        Swal.fire("Cancelled!", "The order has been cancelled.", "success");
      }
    } catch (error) {
      console.log(error);
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
        const res = await axiosDashboard.patch(`/api/v1/orders/${id}/confirm`);
        setOrderData({ ...orderdata, status: "Processing" });
        Swal.fire(
          "Updated!",
          "The order status has been updated to processing.",
          "success"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axiosDashboard
      .get(`/api/v1/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data.data);
        fetchProductData(res.data.data.products);
      })
      .catch((error) => handleErrors(error));
  }, [id]);

  const fetchProductData = async (products) => {
    const productId = products.map((product) => product.id);
    const productResponse = await axiosDashboard.get("/api/v1/products");
    console.log(productResponse.data); // Add this line to check the structure of the response
    const productDataWithImage = productResponse.data.data.map((product) => {
      if (productId.includes(product.id)) {
        const productImage = product.images[0] || "";
        return { ...product, image: productImage };
      }
      return product;
    });
    setProductData(productDataWithImage);
  };

  const getProductImageById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.image : "";
  };

  const getProductNameById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.name_en : "";
  };

  return (
    <>
      <Navbar />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            {orderdata && (
              <Card className="shadow">
                <CardHeader className="border-0 ">
                  {/*<h1 className="mb-0">Order Details</h1>*/}
                  <div className=" justify-content-around">
                    <h3>
                      Order Status:{" "}
                      <b className={"text-info"}>{orderdata.status}</b>
                    </h3>
                    <h3>
                      Order ID: <b>{orderdata._id}</b>
                    </h3>
                    <h3>
                      User:{" "}
                      <b>
                        <Link to={`/admin/UserDetail/${orderdata.user_id}`}>
                          {orderdata.user?.name}
                          {/*{orderdata.user_id}*/}
                        </Link>
                      </b>
                    </h3>
                  </div>
                </CardHeader>
                <div className="container">
                  <CardBody className="border-0 shadow">
                    <div>
                      <h2>Order Products</h2>
                      {orderdata.products?.map((product) => (
                        <div key={product.product_id}>
                          <Row>
                            <Col xs="3">
                              <img
                                src={getProductImageById(product.product_id)}
                                alt="Product"
                                style={{ width: "100%", height: "100%" }}
                              />
                            </Col>
                            <Col xs="9">
                              <h5>
                                Product ID:{" "}
                                <b className={"text-primary"}>
                                  {product.product_id}
                                </b>
                              </h5>
                              <h5>
                                Product Name:{" "}
                                <b className={"text-primary"}>
                                  {getProductNameById(product.product_id)}
                                </b>
                              </h5>
                              <h5>
                                Quantity:{" "}
                                <b className={"text-primary"}>
                                  {product.quantity}
                                </b>
                              </h5>
                              <h5>
                                Price:{" "}
                                <b className={"text-primary"}>
                                  {product.price.toFixed(2)}$
                                </b>
                              </h5>
                              <h5>
                                Total:{" "}
                                <b className={"text-primary"}>
                                  {(product.quantity * product.price).toFixed(
                                    2
                                  )}
                                  $
                                </b>
                              </h5>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: "left" }}>
                      {orderdata && (
                        <>
                          <Card>
                            <CardHeader>
                              <i className="fa fa-sack-dollar mr-3 text-warning"></i>{" "}
                              Payment Details:
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                  <h4>
                                    Total Price:{" "}
                                    <b className={"text-primary"}>
                                      {orderdata.total_price} $
                                    </b>
                                  </h4>
                                  <h4>
                                    Order Status :{" "}
                                    <b className={"text-primary"}>
                                      {orderdata.status}
                                    </b>
                                  </h4>
                                </Col>
                                <Col>
                                  <h4>
                                    Payment Method:{" "}
                                    <b className={"text-primary"}>
                                      {orderdata.payment_method}
                                    </b>
                                  </h4>
                                  {orderdata.payment_id && (
                                    <h4>
                                      Payment Id:{" "}
                                      <b className={"text-primary"}>
                                        {orderdata.payment_id}
                                      </b>
                                    </h4>
                                  )}
                                </Col>
                              </Row>
                              {orderdata.status === "Pending" && (
                                <Row>
                                  <button
                                    title={"Confirm order"}
                                    onClick={() =>
                                      confirmOrder(
                                        orderdata._id,
                                        orderdata.status
                                      )
                                    }
                                    style={{
                                      opacity:
                                        orderdata.status !== "Pending"
                                          ? 0.5
                                          : 1,
                                    }}
                                    disabled={orderdata.status !== "Pending"}
                                    className="btn-success btn fa fa-circle-check"
                                  >
                                    {" "}
                                    Confirm
                                  </button>
                                  <button
                                    title={"Cancel order"}
                                    className={"btn-danger btn fa fa-ban"}
                                    style={{
                                      opacity:
                                        orderdata.status !== "Pending"
                                          ? 0.5
                                          : 1,
                                    }}
                                    onClick={() =>
                                      handleCancelOrder(
                                        orderdata._id,
                                        orderdata.status
                                      )
                                    }
                                    disabled={orderdata.status !== "Pending"}
                                  >
                                    {" "}
                                    Cancel
                                  </button>
                                </Row>
                              )}
                            </CardBody>
                          </Card>
                          <Card className="mt-3">
                            <CardHeader>
                              <i className=" fa fa-truck  mr-3 text-danger"></i>{" "}
                              Delivery Address:
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                  {orderdata.address ? (
                                    <>
                                      <h4>
                                        Area:{" "}
                                        <b className={"text-primary"}>
                                          {orderdata.address.area}
                                        </b>
                                      </h4>
                                      <h4>
                                        City:{" "}
                                        <b className={"text-primary"}>
                                          {orderdata.address.city}
                                        </b>
                                      </h4>
                                      <h4>
                                        Governorate:{" "}
                                        <b className={"text-primary"}>
                                          {orderdata.address.governorate}
                                        </b>
                                      </h4>
                                      <h4>
                                        Country:{" "}
                                        <b className={"text-primary"}>
                                          {orderdata.address.country}
                                        </b>
                                      </h4>
                                    </>
                                  ) : (
                                    <p>No address found</p>
                                  )}
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="mt-3">
                            <CardHeader>
                              <i className=" fa fa-list-check  mr-3 text-danger"></i>{" "}
                              Order Status:
                            </CardHeader>
                            <CardBody>
                              {orderdata.status_history?.map((status) => (
                                <Card className="mt-3">
                                  <CardHeader>
                                    <i className=" fa fa-check  mr-3 text-warning"></i>{" "}
                                    {status.status} :{" "}
                                    {new Date(status.date).toLocaleString()}
                                  </CardHeader>
                                </Card>
                              ))}
                            </CardBody>
                          </Card>
                        </>
                      )}
                    </div>
                  </CardBody>
                </div>
              </Card>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetail;
