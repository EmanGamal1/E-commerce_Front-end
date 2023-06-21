import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { SideFilter } from "../../components/Uitily/SideFilter";
import { axiosInstance } from "../../../Axios";
import SearchBox from "Website/SharedUI/SearchBox/SearchBox";
import Pagination from "@mui/material/Pagination";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId) => {
    if (categoryId === "0") {
      setSelectedCategory("");
      window.history.pushState(null, null, "/products");
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handlePriceRangeChange = (from, to) => {
    setPriceFrom(from);
    setPriceTo(to);
  };

  useEffect(() => {
    let query = "";
    if (searchQuery) {
      query += `keyword=${searchQuery}&`;
    }
    if (priceFrom) {
      query += `price[gt]=${priceFrom}&`;
    } else if (priceTo) {
      query += `price[lt]=${priceTo}&`;
    } else if (priceFrom && priceTo) {
      query += `price[gt]=${priceFrom}&price[lt]=${priceTo}&`;
    }
    if (selectedCategory) {
      query += `category_id=${selectedCategory}&`;
    }
    query = query.slice(0, -1); // Remove'&' from the query

    axiosInstance
      .get(`products?${query}`)
      .then((response) => {
        console.log("products", response.data.data);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchQuery, priceFrom, priceTo, selectedCategory]);

  return (
    <>
      <div>
        <Container fluid className="mt-4">
          <Row className="d-flex flex-row">
            <Col sm="4" xs="4" md="2" className="d-flex">
              <SideFilter
                updateCategory={handleCategoryChange}
                updatePriceRange={handlePriceRangeChange}
              />
            </Col>
            <Col sm="6" xs="8" md="10">
              <Col md="4" className="m-auto">
                <SearchBox
                  searchQuery={searchQuery}
                  onSearchQueryChange={handleSearchQueryChange}
                  className="form-control"
                />
              </Col>
              <CardProductsContainer products={products} title="" btntitle="" />
            </Col>
          </Row>
          <Row>
            <div className="mt-2 mx-auto" dir="ltr">
              <Pagination count={10} color="primary" size="large" />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Products;
