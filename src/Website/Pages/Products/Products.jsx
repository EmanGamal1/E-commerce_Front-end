import { Col, Container, Row } from "reactstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { AllProductsHook } from "../../hook/Products/AllProductsHook";
import { SideFilter } from "../../components/Uitily/SideFilter";
import React, { useState } from "react";
import SearchBox from "./../../SharedUI/SearchBox/SearchBox";

const Products = () => {
  const [products, loading] = AllProductsHook();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const updateCategory = (categoryId) => {
    setSelectedCategory(categoryId === "0" ? null : categoryId);
  };

  const updatePriceFrom = (value) => {
    setPriceFrom(value);
  };

  const updatePriceTo = (value) => {
    setPriceTo(value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category_id._id === selectedCategory;

    const matchesPrice =
      (!priceFrom || product.price >= parseInt(priceFrom)) &&
      (!priceTo || product.price <= parseInt(priceTo));

    const matchesSearch =
      product.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) 
      // product.category_id.name_ar.toLowerCase().includes(searchQuery.toLowerCase());    ****to search by category also

    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <>
      <div style={{ minHeight: "670px" }}>
        <Container>
          <Row className="d-flex flex-row">
            <Col sm="2" xs="2" md="1" className="d-flex">
              <SideFilter
                updateCategory={updateCategory}
                updatePriceFrom={updatePriceFrom}
                updatePriceTo={updatePriceTo}
              />
            </Col>
            <Col sm="10" xs="10" md="11">
              <SearchBox searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} 
              className="form-control" />
              <CardProductsContainer products={filteredProducts} title="" btntitle="" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Products;
