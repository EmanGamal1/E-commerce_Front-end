import { Card, CardBody, Col, Row } from "reactstrap";
import SidebarSearchHook from "../../hook/Search/SideBarSearchHook";
import { useState } from "react";

export const SideFilter = ({ updateCategory, updatePriceRange }) => {
  const [category, clickCategory] = SidebarSearchHook();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");

  const handleChangeCategory = (categoryId) => {
    setSelectedCategory(categoryId === "0" ? "" : categoryId);
    updateCategory(categoryId);
  };

  const handleChangePriceFrom = (event) => {
    // No minus numbers
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(0, value);
    setPriceFrom(value.toString());
    updatePriceRange(value.toString(), priceTo);
  };
  
  const handleChangePriceTo = (event) => {
    let value = parseInt(event.target.value, 10);
    value = isNaN(value) ? 0 : Math.max(0, value);
    setPriceTo(value.toString());
    updatePriceRange(priceFrom, value.toString());
  };

  return (
    <>
      <Card className="shadow w-100" style={{ height: "100%" }}>
        <CardBody>
          <Row>
            <div className="mt-2">
              {category ? (
                <div>
                  <div className="filter-title font-weight-bold">الفئــة</div>
                  <div className="mt-3 d-flex">
                    <input
                      className="mx-2"
                      type="radio"
                      checked={selectedCategory === ""}
                      onChange={() => handleChangeCategory("0")}
                    />
                    <div className="filter-sub">الكــل</div>
                  </div>
                  {category.map((item, index) => (
                    <div key={index} className="d-flex mt-3">
                      <input
                        className="mx-2"
                        type="radio"
                        value={item._id}
                        checked={selectedCategory === item._id}
                        onChange={() => handleChangeCategory(item._id)}
                      />
                      <div className="filter-sub me-2">{item.name_ar}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <h6>لا يوجد تصنيفات</h6>
              )}

              <hr />
              <div className="filter-title mb-3 mt-5 font-weight-bold">
                السعــر
              </div>
              <div className="d-flex">
                <p className="filter-sub my-2">من:</p>
                <input
                  className="m-2 text-center form-control"
                  type="number"
                  style={{ width: "80px", height: "25px" }}
                  value={priceFrom}
                  onChange={handleChangePriceFrom}
                />
              </div>
              <div className="d-flex">
                <p className="filter-sub my-2">إلـي:</p>
                <input
                  className="m-2 text-center form-control"
                  type="number"
                  style={{ width: "80px", height: "25px" }}
                  value={priceTo}
                  onChange={handleChangePriceTo}
                />
              </div>
            </div>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};
