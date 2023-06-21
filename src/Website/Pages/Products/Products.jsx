import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { CardProductsContainer } from "../../components/Products/CardProductsContainer";
import { SideFilter } from "../../components/Uitily/SideFilter";
import { axiosInstance } from "../../../Axios";
import SearchBox from "Website/SharedUI/SearchBox/SearchBox";
import Pagination from "@mui/material/Pagination";
import SortDropDown from "../../components/Products/SortDropDown";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

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
    }

    if (priceTo) {
      query += `price[lt]=${priceTo}&`;
    }
    if (selectedCategory) {
      query += `category_id=${selectedCategory}&`;
    }
    if (page) query += `page=${page}&`;
    query = query.slice(0, -1); // Remove'&' from the query

    axiosInstance
      .get(`products?${query}&limit=8`)
      .then((response) => {
        console.log("products", response.data);
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchQuery, priceFrom, priceTo, selectedCategory, page]);
  const onPageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div>
        <Container fluid className="mt-4">
          <Row className="d-flex flex-row w-100">
            <Col sm="4" xs="5" md="3" className="d-flex">
              <SideFilter
                updateCategory={handleCategoryChange}
                updatePriceRange={handlePriceRangeChange}
              />
            </Col>
            <Col sm="8" xs="7" md="9">
              <Col md="4" className="m-auto">
                <SearchBox
                  searchQuery={searchQuery}
                  onSearchQueryChange={handleSearchQueryChange}
                  className="form-control"
                />
              </Col>
              <Col>
                {" "}
                <SortDropDown />{" "}
              </Col>
              <Col>
                <CardProductsContainer
                  products={products}
                  title=""
                  btntitle=""
                />
              </Col>
            </Col>
          </Row>
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
        </Container>
      </div>
    </>
  );
};

export default Products;
