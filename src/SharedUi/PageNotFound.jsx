import { Link } from "react-router-dom";
import { Stack } from "react-bootstrap";

const PageNotFound = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
        <Stack gap="3" className="mx-auto ">
          <h1 className="h1"> Oops!!!</h1>
          <h1 className="h1"> Page Not Found </h1>
          <h1 className="display-1 h1 fw-bold text-white align-self-center">
            404
          </h1>
          <Link to="/home">
            <button className="btn btn-dark">Back To Home </button>
          </Link>
        </Stack>
      </div>
    </>
  );
};
export default PageNotFound;
