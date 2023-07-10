import { Container, Row } from "reactstrap";
import { ProductsCard } from "../Products/ProductsCard";
import { SubTiltle } from "../Uitily/SubTiltle";
import { ViewHomeProductsHook } from "../../hook/Products/ViewHomeProductsHook";
import { useEffect } from "react";

export const MostSoldProducts = ({ title, btntitle, pathText }) => {
  const [products, loading] = ViewHomeProductsHook();
  useEffect(() => {
    if (products.length > 0) {
      console.log("products", products, loading);
    }
  }, [products]);
  return (
    <>
      <Container>
        {products ? (
          <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
        ) : null}
        <Row className="d-flex justify-content-between">
          {products
            ? products.map((item, index) => (
                <ProductsCard key={index} item={item} />
              ))
            : null}
        </Row>
      </Container>
    </>
  );
};
