import { Col } from "reactstrap";
import { Link } from "react-router-dom";

export const CategoryCard = ({ img, title, slug }) => {
  return (
    <>
      <Col
        xs="6"
        sm="6"
        md="4"
        lg="2"
        className="my-4 d-flex justify-content-around "
      >
        <div className="allCard mb-3 ">
          <div className="categoty-card "></div>{" "}
          <Link
            to={`/categories/${slug}/products`}
            style={{ textDecoration: "none" }}
          >
            <img alt="zcv" src={img} className="categoty-card-img" />
            <p className="categoty-card-text my-2">{title}</p>
          </Link>
        </div>
      </Col>
    </>
  );
};
