import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "./../../../Axios";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


const NavBar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const collapseRef = useRef(null);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    fetchInfo();
    fetchProfileData();
    document.addEventListener("click", handleOutsideClickNav);
    return () => {
      document.addEventListener("click", handleOutsideClickNav);
    };
  }, [navbarData, profileData]);
  
  const fetchInfo = () => {
    const user = localStorage.getItem("token");
    setIsLoggedIn(!!user);
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
    // axiosInstance
    //   .get("/profile")
    //   .then((response) => {
    //     setProfileData(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // const userData =localStorage.getItem("user");
    // setProfileData(userData);
  };

  const userName = JSON.parse(localStorage.getItem("user"));
  
  const hideNavbar = () => {
    setShowNavbar(false);
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleOutsideClickNav = (event) => {
    if (collapseRef.current && !collapseRef.current.contains(event.target)) {
      hideNavbar();
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.delete("/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav id="navBar" className="navbar-expand-lg navbar-light bg-white">
    <Link to="/">
        <img src={navbarData.logo} className="logoNav" alt="logo" />
      </Link>
      <div style={{ display: "flex", marginRight:"auto" }}>

      <button  ref={collapseRef}
  className="navbar-toggler navbar-toggler-dark text-dark"
  type="button"
  data-toggle="collapse"
  data-target="#navbarToggle"
  aria-controls="navbarToggle"
  aria-expanded="false"
  aria-label="Toggle navigation"
  onClick={toggleNavbar}
>
  <span className="navbar-toggler-icon"></span>
</button>
</div>
<div className={`collapse navbar-collapse ${showNavbar ? 'show mt-6' : ''}`} id="navbarToggle">
     
<ul className="navbar-nav mt--3">
          <li className="nav-item">
            <Link to="/">الرئيسيـــة</Link>
        </li>
        <li className="nav-item">
          <Link to="/categories">الأقســام</Link>
        </li>
        <li className="nav-item">
          <Link to="/products">المنتجــات</Link>
        </li>
        <li className="nav-item">
          <Link to="/aboutus">عنّــا</Link>
        </li>
        <li className="nav-item">
          <Link to="/contactus">تواصل معنا</Link>
        </li>
      </ul>
      <div style={{ display: "flex", marginRight:"auto" }}>
      {isLoggedIn ? (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/orders">طلباتـي</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="Icons cartIcon"
              />
              عربـة التسـوق
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile">
           الصفحـة الشخصيـة
                       </Link>
                       </li>
            <li>
                  <p className="logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                 </p>
                </li>           
         </ul>
      ):(
        <ul className="navbar-nav mt--3">
          <li className="nav-item">
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} className="Icons" />
              تسجيل الدخول
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register">
              <FontAwesomeIcon icon={faUser} className="Icons" />
              حســـاب جديـد
            </Link>
          </li>
        </ul>
      )}
      </div>
      </div>
    </nav>
  );
};

export default NavBar;
