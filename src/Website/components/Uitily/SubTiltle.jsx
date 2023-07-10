import { Link } from "react-router-dom";

export const SubTiltle = ({ title, btntitle, pathText }) => {
  return (
    <>
      <div className="d-flex justify-content-between mt-2 pt-4">
        <div className="sub-tile h2">{title}</div>
        {btntitle ? (
          <Link to={`${pathText}`} style={{ textDecoration: "none" }}>
            <div className="shopping-now h2">{btntitle}</div>
          </Link>
        ) : null}
      </div>
    </>
  );
};
