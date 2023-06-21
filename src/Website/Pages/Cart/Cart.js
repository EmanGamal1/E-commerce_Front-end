import React, { useState, useEffect } from "react";
import { axiosInstance } from "Axios.js";
import Swal from "sweetalert2";
import { Container, Row, Card, CardBody, Col, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import imageSrc from "../../Assets/img/OIUFKQ0.jpg";
import handleErrors from "../../../Errors";
const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [userData, setUserData] = useState({});
  // const [addressData, setAddressData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  // Other necessary state variables
  // ...

  const convertCurrency = (currency) => {
    return Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(currency);
  };
  const updateQuantity = async (quantity, productId) => {
    try {
      const response = await axiosInstance.patch(`/profile/cart/update`, {
        product_id: productId,
        quantity: quantity,
      });
      fetchCartData();
      Swal.fire({
        icon: "success",
        title: "تم تحديث الكمية",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      handleErrors(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get("/profile/cart");
      setCartData(response.data.data);
      calculateTotalPrice(response.data.data);
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };
  useEffect(() => {
    /*const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get("/profile");
                setUserData(response.data.data);
                setAddressData(response.data.data.address[0]);
            } catch (error) {
                console.log(error.message);
                // Handle error
            }
        };*/

    fetchCartData();
    // fetchUserData();
  }, []);
  const calculateTotalPrice = (cartData) => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.quantity * item.product_id.price;
    });
    setTotalPrice(total);
  };
  const handleDelete = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/profile/cart/remove`, {
        data: {
          product_id: productId,
        },
      });
      fetchCartData();
      Swal.fire({
        icon: "success",
        title: "تم حذف المنتج من العربة",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.message);
      // Handle error
    }
  };
  return (
    <Container fluid className="mt-4">
      <Row>
        <div className="col">
          <Card className="container shadow text-right p-2">
            <CardHeader className="border-0 ">
              <div className="d-flex justify-content-around">
                <h1 className="mb-0">عربة التسوق</h1>
                <h2 className="mb-0">
                  السعر الكلي: {convertCurrency(totalPrice)}
                </h2>
                {totalPrice !== 0 ? (
                  <Link to={`/checkout`}>
                    <h3 className={"text-light btn btn-primary"}>
                      تأكيد الطلب<i className="fa fa-arrow-left mr-3"></i>
                    </h3>
                  </Link>
                ) : (
                  <Link to={`/`}>
                    <h3 className={"text-light btn btn-primary"}>
                      تسوق الآن<i className="fa fa-arrow-left mr-3"></i>
                    </h3>
                  </Link>
                )}
              </div>
            </CardHeader>
            <div className="container">
              <CardBody className="border-0 shadow">
                <div>
                  <h2>المنتجات في العربة</h2>
                  <hr />
                  {cartData.length ? (
                    cartData?.map((product) => (
                      <div key={product.product_id._id}>
                        <Row>
                          <Col xs="3">
                            <img
                              src={product.product_id.image}
                              alt="Product"
                              style={{ width: "100%", height: "100%" }}
                            />
                          </Col>
                          <Col xs="7" className="text-right">
                            {/*<p>{product.product_id._id}</p>*/}
                            <p> اسم المنتج: {product.product_id.name.ar}</p>
                            <p>الكمية: {product.quantity}</p>
                            <p>
                              <label>الكمية: </label>
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  updateQuantity(
                                    e.target.value,
                                    product.product_id._id
                                  );
                                }}
                              >
                                {Array.from(
                                  {
                                    length: product.product_id.quantity,
                                  },
                                  (_, index) => (
                                    <option
                                      key={index + 1}
                                      value={index + 1}
                                      selected={index + 1 == product.quantity}
                                    >
                                      {index + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </p>

                            <p>
                              {" "}
                              سعر الوحدة:{" "}
                              {convertCurrency(product.product_id.price)}
                            </p>
                            <p>
                              السعر الكلي:{" "}
                              {convertCurrency(
                                product.quantity * product.product_id.price
                              )}
                            </p>
                          </Col>
                          <Col xs="2">
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                handleDelete(product.product_id._id)
                              }
                            >
                              حذف
                            </button>
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <div className="text-center mt-4 mb-4">
                      <h2>لا يوجد منتجات في العربة</h2>
                      <img
                        src={imageSrc}
                        alt="No Orders"
                        style={{ width: "250px", height: "250px" }}
                      />

                      {/*<Link to={`/`}>
                        <h3 className={"text-light btn btn-primary"}>
                          تسوق الآن<i className="fa fa-arrow-left mr-3"></i>
                        </h3>
                      </Link>*/}
                    </div>
                  )}

                  <h2>السعر الكلي: {convertCurrency(totalPrice)}</h2>
                  <button className="btn btn-primary w-100">
                    {totalPrice !== 0 ? (
                      <Link to={`/checkout`}>
                        <h3 className={"text-light"}>
                          تأكيد الطلب<i className="fa fa-arrow-left mr-3"></i>
                        </h3>
                      </Link>
                    ) : (
                      <Link to={`/`}>
                        <h3 className={"text-light"}>
                          تسوق الآن<i className="fa fa-arrow-left mr-3"></i>
                        </h3>
                      </Link>
                    )}
                  </button>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Cart;
