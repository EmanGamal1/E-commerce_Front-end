import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "Website/SharedUI/SearchBox/SearchBox";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "./../../../Axios";

const NavBar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInfo();
    fetchProfileData();
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const fetchInfo = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    axiosInstance
      .get("/info")
      .then((response) => {
        setNavbarData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProfileData = () => {
    axiosInstance
      .get("/profile")
      .then((response) => {
        setProfileData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const hideDropdown = () => {
    setIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      hideDropdown();
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav id="navBar">
      <Link to="/home">
        <img src={navbarData.logo} className="logoNav" alt="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/home">الرئيسيـــة</Link>
        </li>
        <li>
          <Link to="/categories">الأقســام</Link>
        </li>
        <li>
          <Link to="/products">المنتجــات</Link>
        </li>
        <li>
          <Link to="/aboutus">عنّــا</Link>
        </li>
        <li>
          <Link to="/contactus">تواصل معنا</Link>
        </li>
      </ul>
      {/* <li>
        <SearchBox placeholder="البحث عن المنتجــات..." />
      </li> */}
      {!isLoggedIn ? (
        <ul>
          <li>
            <Link to="/auth/login">
              <FontAwesomeIcon icon={faUser} className="Icons" />
              تسجيل الدخول
            </Link>
          </li>
          <li>
            <Link to="/auth/register">
              <FontAwesomeIcon icon={faUser} className="Icons" />
              حســـاب جديـد
            </Link>
          </li>
        </ul>
      ) : (
        <>
          <li>
            <Link to="/orders">طلباتـي</Link>
          </li>
          <li>
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="Icons cartIcon"
              />
              عربـة التسـوق
            </Link>
          </li>
          <li className="dropdown" ref={dropdownRef}>
            <div onClick={handleToggle} className="row">
              <img
                src={profileData.image}
                className="navProfileImage col-5"
                alt="user profile img"
              />
              <span className="col-6">{profileData.name}</span>
            </div>
            {isOpen && (
              <ul className="dropdown-menu d-block">
                <Link to="/profile" onClick={handleToggle}>
                  <li className="dropdown-item">
                    <p>الصفحــة الشخصيــة</p>
                  </li>
                </Link>
                <li className="dropdown-item">
                  <p onClick={handleLogout}>تسجيـل الخــروج</p>
                </li>
              </ul>
            )}
          </li>
        </>
      )}
    </nav>
  );
};

export default NavBar;
