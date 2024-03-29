import { Card, CardBody, CardImg, CardText, CardTitle, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "./../../../Axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import ProtectedRouteHook from "../../hook/auth/ProtectedRouteHook";
import AddedSrc from "../../Assets/img/shopping-cart (1).png"
import outOfStock from "../../Assets/img/out-of-stock.png"

export const ProductsCard = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [isUser] = ProtectedRouteHook();

  const addToCart = () => {
    if (quantity > item.quantity) {
      console.log("Not enough quantity in stock");
      showFailureAlert();
      return;
    }

    axiosInstance
      .patch("/profile/cart/add", { product_id: item._id, quantity })
      .then((response) => {
        console.log("Product added to cart:", response.data);
        showSuccessAlert();
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  const showSuccessAlert = () => {
    Swal.fire({
    
      html: `<p>تمت الاضافة الى عربة التسوق </p><img src="${AddedSrc}" alt="Success Image" style="width: 100px; height: 100px;">`,
  
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showFailureAlert = () => {
    Swal.fire({
      html: `<p>عذرا هذ المنتج غير متوفر حاليا </p><img src="${outOfStock}" alt="error Image" style="width: 100px; height: 100px;">`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <>
      <Col xs="12" sm="6" md="4" lg="3" className="d-flex">
        <Card
          className="my-2"
          style={{
            display: "flex",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
          }}
        >
          <Link
            to={`/products/${item.slug}`}
            style={{ textDecoration: "none" }}
          >
            <CardImg style={{ height: "228px" }} src={item.image} />
          </Link>
          <div className="d-flex justify-content-end mx-2"></div>
          <CardBody>
            <CardTitle>
              <div className="h6 text-primary">{item.category_id?.name_ar}</div>
              <div className="card-title bold">{item.name_ar}</div>
            </CardTitle>
            <CardText>
              <div className="d-flex justify-content-between ">
                <div className="d-flex">
                  <div className="card-price">{item.price}</div>
                  <div className="card-currency mx-1">جنيه</div>
                </div>
                {isUser && (
                  <>
                    {item.quantity > 0 && (
                      <button
                        className="btn-sm btn-outline-primary"
                        onClick={addToCart}
                      >
                        <FontAwesomeIcon icon={faCartPlus} className="mx-1" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};
