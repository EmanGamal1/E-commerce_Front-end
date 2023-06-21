import { Col, Container, Row } from "reactstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { AllProductsHook } from "../../hook/Products/AllProductsHook";
import { SideFilter } from "../../components/Uitily/SideFilter";
import React, { useEffect, useState } from "react";
import SearchBox from "./../../SharedUI/SearchBox/SearchBox";
import { axiosInstance } from "./../../../Axios";

const Products = () => {
  const [products, loading] = AllProductsHook();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(searchQuery);
    if (searchQuery !== "") {
      axiosInstance
        .get(`/products?keyword=${searchQuery}`)
        .then(
          (response) => {
            setSearchResults(response.data);
            console.log(response.data);
          }
          )
        .catch((error) => console.error(error));
    } else {
      setSearchResults([]);
      console.log("no");
    }
  }, [searchQuery]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const updateCategory = (categoryId) => {
    setSelectedCategory(categoryId === "0" ? null : categoryId);
  };
  
  const updatePriceFrom = (value) => {
    setPriceFrom(value);
  };

  const updatePriceTo = (value) => {
    setPriceTo(value);
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
      <div >
        <Container fluid className="mt-4">
          <Row className="d-flex flex-row">
            <Col sm="4" xs="4" md="2" className="d-flex">
              <SideFilter
                updateCategory={updateCategory}
                updatePriceFrom={updatePriceFrom}
                updatePriceTo={updatePriceTo}
              />
            </Col>
            <Col sm="6" xs="8" md="10">
              <Col md="4" className="m-auto">
              <SearchBox
                  className="form-control"
                  value={searchQuery}
                  searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} 
                />
              </Col>
              <CardProductsContainer products={filteredProducts} title="" btntitle="" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Products;
