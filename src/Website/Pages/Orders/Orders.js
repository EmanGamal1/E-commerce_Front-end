import React, { useEffect, useState } from "react";
import { Container, Row, Card, CardBody, Col, InputGroup, InputGroupAddon, Button} from "reactstrap";
import { axiosInstance } from "Axios.js";
import "../Orders/Orders.css";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import imageSrc from "../../Assets/img/OIUFKQ0.jpg";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const ordersPerPage = 3;

  useEffect(() => {
    axiosInstance
      .get("/orders")
      .then((res) => {
        const fetchedOrders = res.data.data; // Fetch the orders from the API response
        const filteredOrders = fetchedOrders.filter((order) => {
          const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0);
          return (
            (!selectedStartDate || orderDate >= selectedStartDate.getTime()) &&
            (!selectedEndDate || orderDate <= selectedEndDate.getTime())
          );
        });
  
        setOrderData(filteredOrders);
        fetchProductData(filteredOrders);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [selectedStartDate, selectedEndDate]);
  

  const fetchProductData = async (orders) => {
    const productIds = orders.flatMap((order) =>
      order.products.map((product) => product.product_id)
    );
    const productResponse = await axiosInstance.get("/products");
    const productDataWithImage = productResponse.data.data.map((product) => {
      if (productIds.includes(product._id)) {
        const productImage = product.images[0] || "";
        return { ...product, image: productImage };
      }
      return product;
    });
    setProductData(productDataWithImage);
  };

  const getProductImageById = (productId) => {
    const product = productData.find((product) => product._id === productId);
    return product ? product.image : "";
  };

  const getProductNameById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.name_ar : "";
  };

  const getProductDescById = (productId) => {
    const product = productData.find((product) => product.id === productId);
    return product ? product.desc_ar : "";
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

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const hasOrders = orderData.length > 0;

  return (
    <Container fluid className="mt-4">
      <Row>
        <Card className="container shadow text-right p-2">
          <Row className="d-flex justify-content-between mt-3">
            <Col>
              <h1 className="mr-3 mb-3">طلباتى</h1>
            </Col>
            <Col lg="5" className="text-left">
              <InputGroup className="mb-3 ml-3">
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => setSelectedStartDate(date)}
                  selectsStart
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="تاريخ البداية"
                />
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => setSelectedEndDate(date)}
                  selectsEnd
                  startDate={selectedStartDate}
                  endDate={selectedEndDate}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  placeholderText="تاريخ النهاية"
                  minDate={selectedStartDate}
                  disabled={!selectedStartDate}
                />
                <InputGroupAddon addonType="append">
                  <Button color="warning">
                    <FaCalendarAlt />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          {!hasOrders && selectedStartDate && selectedEndDate && (
            <div className="text-center mt-4 mb-4">
              <h2>لا توجد طلبات في هذا النطاق</h2>
              <img src={imageSrc} alt="No Orders" style={{ width: "250px", height: "250px" }} />
            </div>
          )}
          {currentOrders.map((order) => (
            <Card key={order._id} className="m-2 shadow">
              <CardBody className="hover-border-primary">
                {order.products.map((product) => (
                  <Row key={product.product_id}>
                    <Col>
                      <h3>{order._id}</h3>
                      <p>
                        <i className="fa fa-hourglass-end ml-2"></i>تم الطلب يوم{" "}
                        {new Date(order.createdAt).toLocaleDateString("ar", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h3 className={getStatusColor(order.status)}>{order.status}</h3>
                    </Col>
                    <Col lg="3" xs="5" className="separator" />

                    <Col xs="3">
                      <img
                        src={getProductImageById(product.product_id)}
                        alt="Product"
                        style={{ width: "70%", height: "80%" }}
                      />
                    </Col>
                    <Col>
                      <p>{getProductNameById(product.product_id)}</p>
                      <p>{getProductDescById(product.product_id)}</p>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <Link to={`/orders/OrderDetail/${order._id}`}>
                        <i className="fa fa-chevron-left mr-5"></i>
                      </Link>
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          ))}
          <Row>
            <nav>
              <ul className="pagination justify-content-center">
                {Array.from({ length: Math.ceil(orderData.length / ordersPerPage) }, (_, i) => (
                  <li key={i + 1} className="page-item">
                    <button
                      className="page-link"
                      onClick={() => paginate(i + 1)}
                      style={{ cursor: "pointer" }}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Row>
        </Card>
      </Row>
    </Container>
  );
};

export default Orders;
