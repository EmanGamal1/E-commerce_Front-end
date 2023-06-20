import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { axiosInstance } from "../../../Axios";
import './SideBar.css';

const SideBar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.delete("/logout");
      localStorage.removeItem("token");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Col lg="3">
      <Card className="shadow">
        <CardBody>
          <ul className="sideBar">
            <Link to="/profile">
              <li>حســـابي</li>
            </Link>
            <Link to="/address">
              <li>عناويني</li>
            </Link>
            <Link to="/orders">
              <li>طلبــاتي</li>
            </Link>
            <hr />
            <li className="text-danger text-center dangerTitles" onClick={logout}>
              تسجيل الخروج
            </li>
            {/* <li className="text-danger text-center font-weight-bold dangerTitles">
              حذف الحســاب
            </li> */}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SideBar;
