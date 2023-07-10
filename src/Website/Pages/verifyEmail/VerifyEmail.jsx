import NavBar from "../../components/NavBar/NavBar";
import FooterSite from "../../components/Footer/FooterSite";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../Axios";
import MySwal from "sweetalert2";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const VerifyEmailURL = "verify-email";
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`${VerifyEmailURL}/${token}`)
      .then(() => {
        setVerified(true);
      })
      .catch((err) => {
        MySwal.fire({
          icon: "error",
          title: "error!",
          text: err.response?.data?.error || "Something went wrong!",
        });
      });
  }, [token]);

  useEffect(() => {
    if (verified) {
      MySwal.fire({
        icon: "success",
        title: "تم تفعيـل حسـابك بنجـاح",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
      });
    }
  }, [verified, navigate]);

  return (
    <>
      {/*<NavBar />*/}
      {/*<FooterSite />*/}
    </>
  );
};

export default VerifyEmail;