import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Swal from 'sweetalert2';
import { axiosInstance } from "../../../../Axios";
import Buttons from "Website/SharedUI/Buttons/Buttons";
import './ProductDetails.css';
import { useParams } from "react-router";

const ProductsDetails = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();

  useEffect(() => {
    axiosInstance.get(`/products/${slug}`)
      .then(response => {
        setProduct(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching product details:", error);
      });
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }
  const quantityInStock = product.quantity;

  const addToCart = () => {
    if (quantity > product.quantity) {
      console.log("Not enough quantity in stock");
      showFailureAlert();
      return;
    }

    axiosInstance.patch("/profile/cart/add", { product_id: product._id, quantity })
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

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <CardHeader>
          <h1>تفاصيــل المنتــج</h1>
        </CardHeader>
        <CardBody>
          <Row>
            <Col lg="7">
              <Row>
                <Col lg="3">
                  {product.images.map((image, index) => (
                    <img key={index} src={image} alt={product.name_ar} className="productGallery" />
                  ))}
                </Col>
                <Col lg="4">
                  <img src={product.image} alt={product.name_ar} className="productImage shadow" />
                </Col>
              </Row>
            </Col>
            <Col lg="4" className="mr-3 mt-5">
              {quantityInStock > 0 ? (
                <p className="available">
                  <i className="fa fa-check"></i>
                  &nbsp;متوفـر</p>
              ) : (
                <p className="unavailable">
                  <i className="fa fa-warning"></i>
                  &nbsp;غير متوفـر 
                </p>
              )}
              <div className="details my-3">
                <h1>{product.name_ar}</h1>
                <h3><span className="font-weight-bold">القســـم: </span>{product.category_id.name_ar}</h3>
                <p className="description row">
                  <span className="font-weight-bold mr-3">الـوصــــف: </span>
                 <span className="col"> {product.desc_ar}</span></p>
                <p className="mt-3"><span className="font-weight-bold ml-3">الكميــة: </span>
                  <span className="quantity-control shadow">
                    <span className="quantity-button minusBTN" onClick={decreaseQuantity}>-</span>
                    <span className="quantity-value">{quantity}</span>
                    <span className="quantity-button plusBTN" onClick={increaseQuantity}>+</span>
                  </span>
                </p>
                <Row className="mt-5">
                  <Col lg="3">
                    <p><span className="productPrice"><sub>{product.price}</sub></span><sup> ج.م</sup></p>
                  </Col>
                  <Col lg="9" className="mt-4 text-left">
                    {quantityInStock > 0 ? (
                      <Buttons
                        title="إضافــة إلي العـربة"
                        className="btn btn-outline-dark"
                        onClick={addToCart}
                      />
                    ) : (
                      <span className="text-warning">هذا المنتج غير متوفـر حاليـًا</span>
                    )}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ProductsDetails;
