import { Container, Col, Row } from "react-bootstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { useParams } from "react-router-dom";
import AllProductsCategoryHook from "../../hook/Products/AllProductsCategoryHook";
import { SubTiltle } from "../../components/Uitily/SubTiltle";

const ProductsByCategory = () => {
  const { slug } = useParams();
  const [items, onPress] = AllProductsCategoryHook(slug);
  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <SubTiltle title={slug} />
        <Row className="d-flex flex-row">
          <Col sm="12">
            <CardProductsContainer products={items} title="" btntitle="" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductsByCategory;
