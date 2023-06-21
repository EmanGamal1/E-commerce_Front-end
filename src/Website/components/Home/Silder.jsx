import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { axiosInstance } from "../../../Axios";
import MySwal from "sweetalert2";
import "./Home.css";
import { Link } from "react-router-dom";

const Silder = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    axiosInstance
      .get("banners")
      .then((res) => {
        console.log(res.data);
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        MySwal.fire({
          type: "error",
          title: "Error",
          message: err.message,
        });
      });
  }, []);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      variant="dark"
      slide={false}
      fade={true}
      controls={true}
      indicators={true}
      prevLabel="السابق"
      nextLabel="التالي"
    >
      {banners &&
        banners.map((banner) => (
          <Carousel.Item interval={2000}>
            <Link to="/products">
              <img
                className="d-block w-100 banners"
                src={banner.image}
                alt={banner.alt}
              />
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Silder;
