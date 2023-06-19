import React, { useState, useEffect } from "react";
import { axiosInstance } from "Axios.js";
import Swal from "sweetalert2";
import { Container, Row, Card, CardBody, Col , Button } from "reactstrap";


const Checkout = () => {
  
        const [cartData, setCartData] = useState([]);
        const [userData, setUserData] = useState({});
        const [addressData, setAddressData] = useState({});
        const [totalPrice, setTotalPrice] = useState(0);
        // Other necessary state variables
        // ...

       
        useEffect(() => {
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
                    address_id:addressData._id,
                    
                  };
              await axiosInstance.post("/orders", orderData);
              console.log(orderData);
              Swal.fire("Order Placed!", "Your order has been placed successfully.", "success");
              // Redirect to the orders page
              
            } catch (error) {
              console.log(error.message);
              Swal.fire("Error", "An error occurred. Please try again.", "error");
            }
          };
        
    return (
      <Container className="mt-4">
        <Row>
        <Col xs="8">
            <h1 className="mb-3">معلومات التوصيل</h1>
            <Card className="shadow p-3">
              <Row>
                <Col>
                  <h3>{userData.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>المنطقة: {addressData.area}</p>
                </Col>
                <Col>
                  <p>المدينة: {addressData.city}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>المحافظة: {addressData.governorate}</p>
                </Col>
                <Col>
                  <p>الدولة: {addressData.country}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                <p><i className="fa-solid fa-phone text-success ml-2"></i>{userData.phone}</p> 
                </Col>
                
              </Row>

              
            </Card>
          </Col>
          <Col xs="4">
            <h1 className="mb-3">معلومات الدفع </h1>
            <Card className="container shadow text-right p-4 ">
              <Row>
                <Col xs="5">
                <h4>طريقة الدفع :</h4>
                </Col>
                <Col  xs="7">
                <p><i className="fa-solid fa-money-bill text-success ml-2"></i>كاش عند الاستلام</p>
                </Col>
              </Row>
              {/* <Row>
                <Col>
                <p>عدد المنتجات : </p>
                </Col>
                <Col>
                <p>orderData.p</p>
                </Col>
              </Row> */}
              <Row>
                <Col>
                  <h2>السعر الكلى:</h2>
                </Col>
                <Col>
                  <h2>{totalPrice}$</h2>
                </Col>
              </Row>
              <Row>
                  <Button className="btn btn-success w-100" onClick={handlePlaceOrder}>
                      اتمام الشراء
                  </Button>
              </Row>
               
              
            </Card>
          </Col>
          
        </Row>
        <Row>

          <Col xs="8">
          <h1 className="mb-3 mt-3">مراجعة الطلب </h1>
            <Card className="container shadow text-right p-4">
             {cartData?.map((product) => (
                                    <div key={product.product_id._id}>
                                        <Row>
                                            <Col xs="3">
                                                <img src={product.product_id.image} alt="Product" style={{ width: "100%", height: "100%" }} />
                                            </Col>
                                            <Col xs="7" className="text-right">
                                                {/*<p>{product.product_id._id}</p>*/}
                                                <p> اسم المنتج: {product.product_id.name.ar}</p>
                                                <p>الكمية: {product.quantity}</p>
                                                <p> سعر الوحدة: {product.product_id.price.toFixed(2)}$</p>
                                                <p>السعر الكلي: {(product.quantity * product.product_id.price).toFixed(2)}$</p>
                                            </Col>
                                            
                                        </Row>
                                        <hr />
                                    </div>
             ))}
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default Checkout;