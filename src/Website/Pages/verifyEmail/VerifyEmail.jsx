import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { axiosInstance } from "../../../Axios";
import MySwal from "sweetalert2";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const VerifyEmailURL = "verify-email";

  useEffect(() => {
    axiosInstance
      .get(`${VerifyEmailURL}/${token}`)
      .then(() => {
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "error!",
          text: err.response.data.error,
        });
      });
  });
  return (
    <>
      <NavBar />

      <FooterSite />
    </>
  );
};

export default VerifyEmail;
