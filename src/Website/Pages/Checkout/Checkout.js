import React, { useState, useEffect } from "react";
import { axiosInstance } from "Axios.js";
import Swal from "sweetalert2";
import { Container, Row, Card, CardBody, Col, Button, Input } from "reactstrap";
import { useNavigate } from "react-router";
import "./Checkout.css";
import VisaSrc from "../../Assets/img/visa.png";
import deliverySrc from "../../Assets/img/food.png";
import ordersSrc from "../../Assets/img/shopping-cart (1).png";

const Checkout = () => {
  const [cartData, setCartData] = useState([]);
  const [userData, setUserData] = useState({});
  const [addressData, setAddressData] = useState({});
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(""); // New state for payment method

  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const convertCurrency = (currency) => {
    return Intl.NumberFormat("ar-EG", {
      style: "currency",
      currency: "EGP",
    }).format(currency);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
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

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUserData(response.data.data);
        setAddressData(response.data.data.address[0]);
        setUserAddresses(response.data.data.address);
        setSelectedAddress(response.data.data.address[0]._id); // Set the selected address to the ID of the first address
      } catch (error) {
        console.log(error.message);
        // Handle error
      }
    };

    fetchCartData();
    fetchUserData();
  }, []);
  const calculateTotalPrice = (cartData) => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.quantity * item.product_id.price;
    });
    setTotalPrice(total);
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        address_id: selectedAddress,
        payment_method: paymentMethod,
      };

      if (paymentMethod === "Credit Card") {
        Swal.fire({
          title: "تم الطلب!",
          text: "اتمام اجراءات الدفع !",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "الدفع الآن",
          cancelButtonText: "إغلاق",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosInstance
              .post("/orders", orderData)
              .then((response) => {
                const paymentUrl = response.data.data.payment_url;
                window.location.href = paymentUrl;
              })
              .catch((error) => {
                console.log(error.message);
                Swal.fire("عذرا", "حدث خطأ برجاء المحاولة مرة أخرى.", "error");
              });
          }
        });
      } else {
        await axiosInstance.post("/orders", orderData);
        Swal.fire("تم الطلب!", "تم اتمام الطلب بنجاح !", "success");
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.error.address_id) {
        Swal.fire("عذرا", "برجاء اختيار عنوان التوصيل.", "error");
      } else if (error.response.data.error.payment_method) {
        Swal.fire("عذرا", "برجاء اختيار طريقة الدفع.", "error");
      } else if (typeof error.response.data.error === "string") {
        Swal.fire("عذرا", error.response.data.error, "error");
      } else {
        Swal.fire("عذرا", "حدث خطأ برجاء المحاولة مرة أخرى.", "error");
      }
    }
  };

  const handleAddressSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedAddress(selectedValue);

    // Use the selectedValue as needed
    console.log(selectedValue);
    // You can pass the selectedValue to any function or perform any other logic here
  };
  const handlePaymentMethodChange = (event) => {
    const selectedValue = event.target.value;
    setPaymentMethod(selectedValue);
    console.log(selectedValue);
  };
  return (
    <Container className="mt-4">
      <Row>
        <Col xs="12" lg="7">
          <h1 className="mb-3">
            مراجعة الطلب{" "}
            <img
              src={ordersSrc}
              style={{ width: "30px", marginRight: "10px" }}
            ></img>
          </h1>
          <Card className="container shadow text-right p-4">
            {cartData?.map((product) => (
              <div key={product.product_id._id}>
                <Row>
                  <Col xs="6" lg="3">
                    <img
                      src={product.product_id.image}
                      alt="Product"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Col>
                  <Col xs="6" lg="7" className="text-right">
                    {/*<p>{product.product_id._id}</p>*/}
                    <p> اسم المنتج: {product.product_id.name.ar}</p>
                    <p>الكمية: {product.quantity}</p>
                    <p>
                      {" "}
                      سعر الوحدة: {convertCurrency(product.product_id.price)}
                    </p>
                    <p>
                      السعر الكلي:{" "}
                      {convertCurrency(
                        product.quantity * product.product_id.price
                      )}
                    </p>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}
          </Card>
        </Col>
        <Col xs="12" lg="5">
          <h1 className="mb-3 ">
            معلومات التوصيل
            <img
              src={deliverySrc}
              style={{ width: "30px", marginRight: "10px" }}
            ></img>
          </h1>
          <Card className="container shadow text-right p-4 ">
            <Row>
              <Col>
                <h3>{userData.name}</h3>
              </Col>
              <Col>
                <p>
                  <i className="fa-solid fa-phone text-success ml-2"></i>
                  {userData.phone}
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <p>اختيار العنوان</p>
                <Input
                  type="select"
                  name="address"
                  id="address"
                  value={selectedAddress}
                  onChange={handleAddressSelect}
                  className="mb-3"
                >
                  {/* <option value="">اختر العنوان</option> */}
                  {userAddresses.length > 0 ? (
                    userAddresses.map((address) => (
                      <option key={address._id} value={address._id}>
                        {address.area}, {address.city}, {address.governorate},{" "}
                        {address.country}
                      </option>
                    ))
                  ) : (
                    <option disabled> لا يوجد عنوان </option>
                  )}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <p> طريقة الدفع :</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="d-flex">
                  <input
                    type="radio"
                    id="Cash"
                    name="payment_method"
                    value="Cash"
                    onChange={handlePaymentMethodChange}
                  />

                  <label htmlFor="Cash">
                    <i className="fa-solid fa-money-bill text-success m-3"></i>
                    كاش عند الاستلام
                  </label>
                </div>
              </Col>
              <Col>
                <div className="d-flex">
                  <input
                    type="radio"
                    id="Credit Card"
                    name="payment_method"
                    value="Credit Card"
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="Credit Card" className="mr-2">
                    <img src={VisaSrc} style={{ width: "40px" }}></img>بطاقة
                    الائتمان
                  </label>
                </div>
              </Col>
            </Row>
            <hr></hr>
            <Row>
              <Col className="d-flex text-center px-2">
                <h2>السعر الكلى: </h2>
                <h2> {convertCurrency(totalPrice)}</h2>
              </Col>
            </Row>

            <Row>
              <Button
                className="btn  w-100"
                onClick={handlePlaceOrder}
                style={{ backgroundColor: "orange", color: "#fff" }}
              >
                اتمام الشراء
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Checkout;