import { SubTiltle } from "../Uitily/SubTiltle";
import { Container, Row } from "reactstrap";
import { ProductsCard } from "./ProductsCard";

export const CardProductsContainer = ({ title, btntitle, pathText, products }) => {
  return (
    <>
      <Container>
        {products && <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />}
        <Row className="my-2 d-flex justify-content-between">
          {products
            ? products.map((item, index) => <ProductsCard key={index} item={item} />)
            : null}
        </Row>
      </Container>
    </>
  );
};
