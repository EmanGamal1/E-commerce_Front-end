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
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { axiosInstance } from "Axios.js";
import "./OrderDetail";
import Swal from "sweetalert2";
import { FaMarsDouble } from "react-icons/fa";
import VisaSrc from "../../../Assets/img/visa.png";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderdata, setOrderData] = useState({});
  const [productData, setProductData] = useState([]);
  const [userData, setUserData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(orderdata.payment_status);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    axiosInstance
      .get(`/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        setOrderData(res.data.data);
        fetchProductData(res.data.data.products);
        const updatedOrderData = res.data.data;
        setPaymentStatus(updatedOrderData.payment_status);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUserData(response.data.data);
        setUserAddresses(response.data.data.address);
        console.log(response.data.data.address);
      } catch (error) {
        console.log(error.message);
        // Handle error
      }
    };
    fetchUserData();
  }, [id]);

  const fetchProductData = async (products) => {
    const productId = products.map((product) => product.id);
    const productResponse = await axiosInstance.get("/products");
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-success";
      case "Cancelled":
        return "text-danger";
      case "Pending":
        return "text-primary";
      case "Processing":
        return "text-warning";
      default:
        return "";
    }
  };

  const handleStatusChange = async () => {
    try {
      const { value } = await Swal.fire({
        title: "هل انت متأكد?",
        text: `هل تريد ${
          orderdata.status === "Completed" ? "اعادة شراء" : "الغاء"
        } هذا الطلب?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
      });

      if (value) {
        if (orderdata.status === "Completed") {
          // Update order status to 'Pending'
          await axiosInstance.post(`/orders/${orderdata._id}/reorder`, {
            status: "Pending",
          });
          setOrderData((prevOrderData) => ({
            ...prevOrderData,
            status: "Pending",
          }));
          Swal.fire("تم الطلب!", "تمت اعادة الطلب بنجاح", "success");
        }
        if (orderdata.status === "Pending") {
          // Update order status to 'Cancelled'
          await axiosInstance.delete(`/orders/${orderdata._id}`, {
            status: "Cancelled",
          });
          setOrderData((prevOrderData) => ({
            ...prevOrderData,
            status: "Cancelled",
          }));
          Swal.fire("تم الغاء الطلب بنجاح", "success");
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire("عذرا", "لقد حدث خطأ ما ", "error");
    }
  };

  const renderCancelButton = () => {
    if (orderdata.status === "Completed") {
      return (
        <Button onClick={handleReorder} className="btn-success btn ">
          اعادة الشراء
        </Button>
      );
    } else if (orderdata.status === "Pending") {
      return (
        <Button onClick={handleStatusChange} className="btn-danger btn ">
          الغاء الطلب
        </Button>
      );
    }
  };

  const handleReorder = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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

  const handleReorderConfirm = async () => {
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
            axiosInstance.post( `/orders/${orderdata._id}/reorder`, orderData)
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
        await axiosInstance.post( `/orders/${orderdata._id}/reorder`, orderData);
        Swal.fire("تم الطلب!", "تم اتمام الطلب بنجاح !", "success");
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire("عذرا", "حدث خطأ برجاء المحاولة مرة أخرى.", "error");
    }
  };
  
     

  return (
    <>
      <Navbar />
      {/* Page content */}
      <Container>
        <Row>
          <div className="col">
            {orderdata && (
              <Card className="shadow">
                <CardHeader className="border-0 ">
                  <div className="d-flex justify-content-around">
                    <h1 className="mb-0">تفاصيل الطلب</h1>
                    <Link to={`/orders`}>
                      <h3>
                        الرجوع الى الطلبات
                        <i className="fa fa-arrow-left mr-3"></i>
                      </h3>
                    </Link>
                  </div>
                  <div></div>
                </CardHeader>
                <div className="container">
                  <CardBody className="border-0 shadow">
                    <Row className="text-center">
                      {/* <Col  className=" d-flex justify-content-around">
                    <p>
                      رقم الطلب :  <b>{orderdata._id}</b>
                    </p>
                    </Col> */}
                      <Col xs="12" md="6" lg="6">
                        <p>
                          تم الطلب يوم{" "}
                          {new Date(orderdata.createdAt).toLocaleDateString(
                            "ar",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </Col>
                      <Col xs="12" md="6" lg="6">
                        <h3 className={getStatusColor(orderdata.status)}>
                          {orderdata.status}
                        </h3>
                      </Col>
                    </Row>

                    <div>
                      <h2>المنتجات المطلوبة</h2>
                      {orderdata.products?.map((product) => (
                        <div key={product.product_id}>
                          <Row>
                            <Col xs="12" md="6" lg="3" className="mt-3">
                              <img
                                src={product.image}
                                alt="Product"
                                style={{ width: "100%", height: "100%" }}
                              />
                            </Col>
                            <Col
                              xs="12"
                              md="6"
                              lg="9"
                              className="text-right mt-3"
                            >
                              <p style={{ color: "blue" }}>معلومات المنتج : </p>
                              <p>{product.product_id}</p>
                              <p>{product.name_ar}</p>
                              <p>الكمية: {product.quantity}</p>
                              <p> {product.price.toFixed(2)}$</p>
                            </Col>
                          </Row>
                          <hr />
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: "right" }}>
                      {orderdata && (
                        <>
                          <Card className="shadow">
                            <CardHeader>
                              <div className="d-flex justify-content-between">
                                <h2>
                                  <i className="fa fa-sack-dollar ml-3 text-warning"></i>
                                  فاتورة الطلب{" "}
                                </h2>
                                <h4>
                                  {" "}
                                  حالة الدفع :{" "}
                                  {paymentStatus === "Pending" ? (
                                    <button
                                      className="btn btn-warning"
                                      disabled={paymentStatus === "Completed"}
                                    >
                                      {paymentStatus}
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-success"
                                      disabled
                                    >
                                      {paymentStatus}
                                    </button>
                                  )}
                                </h4>
                              </div>
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                
                                 {orderdata.payment_method === "Credit Card" ? (
                                      <div>
                                        <p>
                                          <span style={{ fontWeight: "bold" }}>طريقة الدفع:</span>{" "}
                                          <i className="fa fa-credit-card m-3 text-success"></i>
                                          بطاقة الائتمان
                                        </p>
                                        <p>
                                    <span style={{ fontWeight: "bold" }}>
                                      {" "}
                                      رقم الفاتورة:{" "}
                                    </span>{" "}
                                    <b>{orderdata.payment_id}</b>
                                  </p>
                                        <Button onClick={() => window.location.href = orderdata.payment_url} className="btn-warning">
                                          فاتورة الدفع
                                        </Button>
                                      </div>
                                    ) : (
                                      <p>
                                        <span style={{ fontWeight: "bold" }}>طريقة الدفع:</span>{" "}
                                        <i className="fa fa-wallet m-3 text-success"></i>
                                        كاش عند الاستلام
                                      </p>
                                    )}


                                 
                                  
                                </Col>
                              </Row>
                              <Row>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <Table striped style={{ fontSize: "22px" , marginTop:"20px"}}>
                                    <thead>
                                      <tr>
                                        <th>اسم المنتج</th>
                                        <th>الكمية</th>
                                        <th>السعر</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {/* Render table rows dynamically */}
                                      {orderdata.products?.map((product) => (
                                        <tr key={product.product_id}>
                                          <td>{product.name_ar}</td>
                                          <td>{product.quantity}</td>
                                          <td>{product.price.toFixed(2)}$</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                              <Row>
                                <Col className="text-center mt-3">
                                  <h2>
                                    الاجمالى : <b>{orderdata.total_price}$</b>
                                  </h2>
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          <Card className="mt-3 shadow">
                            <CardHeader>
                              <h2>
                                <i className=" fa fa-truck  ml-3 text-danger"></i>{" "}
                                عنوان التوصيل{" "}
                              </h2>
                            </CardHeader>
                            <CardBody>
                              <Row>
                                <Col>
                                  {orderdata.address ? (
                                    <>
                                      <h4>
                                        {orderdata.address.area}
                                        {orderdata.address.city},{" "}
                                        {orderdata.address.governate}{" "}
                                        {orderdata.address.country}
                                      </h4>
                                    </>
                                  ) : (
                                    <p>لا يوجد عنوان</p>
                                  )}
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                          {/* <div className="text-center mt-5">{renderCancelButton(orderdata._id, orderdata.status)}</div> */}
                        </>
                      )}
                    </div>
                  </CardBody>
                </div>
                <CardFooter>{renderCancelButton()}</CardFooter>
              </Card>
            )}
          </div>
        </Row>
      </Container>
      <Modal isOpen={modalOpen} toggle={handleModalClose} className="d-flex justify-content-end">
  <ModalHeader toggle={handleModalClose}>اختر عنوانًا</ModalHeader>
  <ModalBody className="text-right">
   
      <Label for="address">العنوان</Label>
      <Input
        type="select"
        name="address"
        id="address"
        value={selectedAddress}
        onChange={handleAddressSelect}
      >
        <option value=""  className="text-right">اختر العنوان</option>
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
   
    <Row>
      <Col  className="text-right" xs="12">
        <p>: طريقة الدفع </p>
      </Col>
    </Row>
    <Row>
      <Col >
        <div className="d-flex justify-content-end">
        <label htmlFor="Cash">
           
           كاش عند الاستلام
           <i className="fa-solid fa-money-bill text-success m-3"></i>
         </label>
          <input
            type="radio"
            id="Cash"
            name="payment_method"
            value="Cash"
            onChange={handlePaymentMethodChange}
          />
        </div>
      </Col>
      <Col>
        <div className="d-flex">
        <label htmlFor="Credit Card" className="mr-2">
            بطاقة الائتمان
            <img src={VisaSrc} style={{ width: "40px" }}></img>
          </label>
          <input
            type="radio"
            id="Credit Card"
            name="payment_method"
            value="Credit Card"
            onChange={handlePaymentMethodChange}
          />
        </div>
      </Col>
    </Row>
  </ModalBody>
  <ModalFooter className="text-right">
    <Button style={{ backgroundColor: "orange", color: "#fff" }} onClick={handleReorderConfirm}>
      اعادة الشراء
    </Button>
    <Button color="secondary" onClick={handleModalClose}>
      الغاء
    </Button>
  </ModalFooter>
</Modal>

    </>
  );
};

export default OrderDetail;
