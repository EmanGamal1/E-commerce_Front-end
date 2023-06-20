import { Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Buttons from "Website/SharedUI/Buttons/Buttons";
import { useState } from "react";
import { axiosInstance } from "./../../../Axios";
import Swal from "sweetalert2";

export const ProductsCard = ({ item }) => {

  const [quantity, setQuantity] = useState(1);
  const quantityInStock = item.quantity;

  const addToCart = () => {
    if (quantity > item.quantity) {
      console.log("Not enough quantity in stock");
      showFailureAlert();
      return;
    }

    axiosInstance.patch("/profile/cart/add", { product_id: item._id, quantity })
      .then(response => {
        console.log("Product added to cart:", response.data);
        showSuccessAlert();
      })
      .catch(error => {
        console.error("Error adding product to cart:", error);
      });
  };

  
  const showSuccessAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'تمت إضافة المنتج لعربة التسـوق',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const showFailureAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'الكميـة المتاحة لدينا لا تكفـي',
      showConfirmButton: false,
      timer: 1500
    });
  };


  return (
    <>
      <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
        <Card
          className="my-2"
          style={{
            width: "100%",
            height: "345px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
          }}
        >
          <Link to={`/products/${item.slug}`} style={{ textDecoration: "none" }}>
            <CardImg style={{ height: "228px", width: "100%" }} src={item.image} />
          </Link>
          <div className="d-flex justify-content-end mx-2"></div>
          <CardBody>
            <CardTitle>
              <div className="h6 text-primary">{item.category_id.name_ar}</div>
              <div className="card-title">{item.name_ar}</div>
            </CardTitle>
            <CardText>
              <div className="d-flex justify-content-between ">
                <div className="d-flex">
                  <div className="card-price">{item.price}</div>
                  <div className="card-currency mx-1">جنيه</div>
                </div>
                <Buttons title="إضافة إلي العربة" className="btn-sm btn-outline-primary" 
                  onClick={addToCart}
                />
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};
