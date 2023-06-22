import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import { axiosInstance } from "Axios.js";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./Orders.css"
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import imageSrc from "../../../Assets/img/OIUFKQ0.jpg";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const ordersPerPage = 3;
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!user){
      navigate("/login");
    }
    axiosInstance
      .get("/orders?limit=70")
      .then((res) => {
        const fetchedOrders = res.data.data;
        const filteredOrders = fetchedOrders.filter((order) => {
          const orderDate = new Date(order.createdAt).setHours(0, 0, 0, 0);
          return (
            (!selectedStartDate ||
              orderDate >= selectedStartDate.getTime()) &&
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
  const totalOrders = orderData.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const maxPageLinks = 7;
  let startPage = currentPage - Math.floor(maxPageLinks / 2);
  let endPage = currentPage + Math.floor(maxPageLinks / 2);

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(maxPageLinks, totalPages);
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - maxPageLinks + 1);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const hasOrders = totalOrders > 0;

  return (
    <Container fluid className="mt-4">
      <Row>
        <Card className="container shadow text-right p-2">
          <Row className="d-flex justify-content-between mt-3">
            <Col>
              <h1 className="mr-3 mb-3">طلباتى</h1>
            </Col>
            <Col lg="6">
                <div className="d-flex">
                  <DatePicker
                    selected={selectedStartDate}
                    onChange={(date) => setSelectedStartDate(date)}
                    selectsStart
                    startDate={selectedStartDate}
                    endDate={selectedEndDate}
                    dateFormat="dd/MM/yyyy"
                    className="form-control mr-2"
                    placeholderText="تاريخ البداية"
                  />
                  <div className="ml-4"></div>
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
                </div>
            </Col>
          </Row>

          {!hasOrders && selectedStartDate && selectedEndDate && (
            <div className="text-center mt-4 mb-4">
              <h2>لا توجد طلبات في هذا النطاق</h2>
              <img
                src={imageSrc}
                alt="No Orders"
              />
            </div>
          )}
          {orderData.slice(
            (currentPage - 1) * ordersPerPage,
            currentPage * ordersPerPage
          ).map((order) => (
            <Card key={order._id} className="m-2 shadow"
              
            >
              <CardBody className="hover-border-primary" >
                {order.products.slice(0, 1).map((product) => (
                  <Row key={product.product_id}>
                    <Col>
                      <h3>{order._id}</h3>
                      <p>
                        <i className="fa fa-hourglass-end ml-2"></i>تم الطلب
                        يوم{" "}
                        {new Date(order.createdAt).toLocaleDateString("ar", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h3 className={getStatusColor(order.status)}>
                        {order.status}
                      </h3>
                    </Col>

                    <Col  lg ="3" md="6" xs="12" >
                      <img
                        src={product.image}
                        alt="Product"
                        style={{ width: "70%", height: "100%" }}
                      />
                    </Col>
                    <Col lg ="3" md="6" xs="12" >
                      <h3>{product.name_ar}</h3>
                      <p>{product.desc_ar}</p>
                      <Link to={`/orders/OrderDetail/${order._id}`} className="btn btn-primary">
                        تفاصيل الطلب 
                      </Link>
                    </Col>
                    
                    <Col className="d-flex align-items-center justify-content-center">
                      
                    </Col>
                  </Row>
                ))}
              </CardBody>
            </Card>
          ))}

          {hasOrders && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={goToPreviousPage}
                    tabIndex="-1"
                  >
                   &lt;
                  </button>
                </li>

                {Array(endPage - startPage + 1)
                  .fill()
                  .map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          pageNumber === currentPage ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    );
                  })}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={goToNextPage}>
             &gt;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </Card>
      </Row>
    </Container>
  );
};

export default Orders;
