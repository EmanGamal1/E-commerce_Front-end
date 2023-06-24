import { Container, Col, Row } from "react-bootstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { useParams } from "react-router-dom";
import AllProductsCategoryHook from "../../hook/Products/AllProductsCategoryHook";
import { SubTiltle } from "../../components/Uitily/SubTiltle";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

const ProductsByCategory = () => {
  const { slug } = useParams();
  const [items, onPress, pagination] = AllProductsCategoryHook(slug);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const onPageChange = (event, value) => {
    setPage(value);
    onPress(value);
  };
  return (
    <div style={{ minHeight: "670px" }}>
      <Container>
        <SubTiltle
          title={!items?.length ? slug : items[0].category_id.name_ar}
        />
        <Row className="d-flex flex-row">
          <Col sm="12">
            <CardProductsContainer products={items} title="" btntitle="" />
          </Col>
        </Row>
        {/*{console.log("pagination", pagination)}
        {pagination ? (
          <Row>
            <div className="mt-2 mx-auto" dir="ltr">
              <Pagination
                count={totalPages}
                color="primary"
                size="large"
                page={page}
                onChange={onPageChange}
              />
            </div>
          </Row>
        ) : (
          ""
        )}*/}
      </Container>
    </div>
  );
};

export default ProductsByCategory;
