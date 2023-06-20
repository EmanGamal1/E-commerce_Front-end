import { Card, CardBody, Col, Row } from "reactstrap";
import SidebarSearchHook from "../../hook/Search/SideBarSearchHook";

export const SideFilter = ({
  updateCategory,
  updatePriceFrom,
  updatePriceTo,
}) => {
  const localFrom = localStorage.getItem("priceFrom") || "";
  const localTo = localStorage.getItem("priceTo") || "";
  const [category, clickCategory] = SidebarSearchHook();

  const handlePriceFromChange = (event) => {
    const value = event.target.value;
    updatePriceFrom(value);
    localStorage.setItem("priceFrom", value);
  };

  const handlePriceToChange = (event) => {
    const value = event.target.value;
    updatePriceTo(value);
    localStorage.setItem("priceTo", value);
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    updateCategory(categoryId);
    localStorage.setItem("catChecked", categoryId);
  };

  return (
    <>
      <Card className="shadow mt-3 w-100" style={{height:500}}>
        <CardBody>
        <Row>
          <div className="mt-2">
            <div className="filter-title font-weight-bold">الفئة</div>
            <div className="mt-3 d-flex">
              <input
              className="mx-2"
                onChange={handleCategoryChange}
                type="checkbox"
                value="0"
                checked={localStorage.getItem("catChecked") === "0"}
              />
              <div className="filter-sub">الكل</div>
            </div>
            {category ? (
              category.map((item, index) => {
                return (
                  <div key={index} className="d-flex mt-3">
                    <input
                    className="mx-2"
                      onChange={handleCategoryChange}
                      type="checkbox"
                      value={item._id}
                      checked={localStorage.getItem("catChecked") === item._id}
                    />
                    <div className="filter-sub me-2 ">{item.name_ar}</div>
                  </div>
                );
              })
            ) : (
              <h6>لا يوجد تصنيفات</h6>
            )}
<hr/>
<div className="filter-title mb-3 mt-5 font-weight-bold">السعر</div>
          <div className="d-flex">
            <p className="filter-sub my-2">من:</p>
            <input
              value={localFrom}
              onChange={handlePriceFromChange}
              className="m-2 text-center form-control"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
          <div className="d-flex">
            <p className="filter-sub my-2">الـي:</p>
            <input
              onChange={handlePriceToChange}
              value={localTo}
              className="m-2 text-center form-control"
              type="number"
              style={{ width: "50px", height: "25px" }}
            />
          </div>
          </div>

          
        </Row>
        </CardBody>
      </Card>
    </>
  );
};
