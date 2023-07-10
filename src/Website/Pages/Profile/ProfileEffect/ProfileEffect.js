// import { useEffect } from "react";
// import { axiosInstance } from "./../../../../Axios";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import {useProfileState} from "./../ProfileState/ProfileState";

// export const useProfileEffect = () => {
  
//   useEffect(() => {
//     fetchProfileData();
//   }, []);
//   const navigate = useNavigate();
// const {   editMode,
//   setEditMode,
//   profileImage,
//   setProfileImage,
//   profileData,
//   setProfileData,
//   showModal,
//   setShowModal,
//   newPassword,
//   setNewPassword,
//   confirmNewPassword,
//   setConfirmNewPassword,
//   matchError,
//   setMatchError,
//   inputError,
//   setInputError,
//   originalProfileData,
//   setOriginalProfileData,
//   phoneError,
//   setPhoneError,
//   errorEmpty,
//   setErrorEmpty,
// currentPassword, setCurrentPassword,
// confirmPassword, setConfirmPassword,
// passwordError, setPasswordError,
// currentPasswordError, setCurrentPasswordError,
// currentPasswordInCorrect, setCurrentPasswordInCorrect,
// showErrorvalidation, setErrorvalidation,
// showErrorMessage, setShowErrorMessage,
// } = useProfileState();

//   const fetchProfileData = async () => {
//     try {
//       const res = await axiosInstance.get("/profile");
//       console.log(res);
//       setProfileData(res.data.data);
//       setOriginalProfileData(res.data.data);
//     } catch (err) {
//       if (err.response.data.error.includes("Please login first")) {
//         navigate("/login");
//       }
//       else if (
//         err.response.data.error.includes(
//           "Password changed recently, login again"
//         )
//       ) {
//         Swal.fire({
//           title: 'اعـد الدخـول مرة ثانيــة',
//           text: 'تم تغيير كلمة المرور',
//           icon: 'info',
//           showCancelButton: false,
//           confirmButtonText: 'دخــول',
//         }).then((result) => {
//           if (result.isConfirmed) {
//             navigate("/login");
//           }
//         });
        
//         console.log("login again");
//       } else {
//         console.log(err);
//       }
//     }
//   };
  
//   const openModal = (e) => {
//     e.preventDefault();
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   const toggleEditMode = () => {
//     setEditMode(!editMode);
//     setInputError(false);
//   };

//   const cancelMode = () => {
//     setEditMode(false);
//     setInputError(false);
//     setProfileData(originalProfileData);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
  
//     if (name === "currentPassword") {
//       setCurrentPassword(value);
//     } else if (name === "newPassword") {
//       setNewPassword(value);
//       setMatchError(false);
//     } else if (name === "confirmPassword") {
//       setConfirmPassword(value);
//       setMatchError(false);
//     } else {
//       setProfileData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };
  
//   const handleModalOk = async () => {
//     if (newPassword === "" || confirmPassword === "") {
//       setMatchError(false);
//       setShowModal(true);
//       setErrorEmpty(true);
//       setCurrentPasswordError(false);
//       setPasswordError(false);
//       setErrorvalidation(false);
//     } else if (newPassword !== confirmPassword) {
//       setMatchError(true);
//       setErrorEmpty(false);
//       setCurrentPasswordError(false);
//       setErrorvalidation(false);
//     } else if (newPassword.length < 8) {
//       setPasswordError(true);
//       setMatchError(false);
//       setErrorEmpty(false);
//       setCurrentPasswordError(false);
//       setErrorvalidation(false);
//     } else if(currentPassword.length < 8) {
//       setCurrentPasswordError(true);
//       setMatchError(false);
//       setErrorEmpty(false);
//       setErrorvalidation(false);
//     }else {
//       setMatchError(false);
//       setErrorEmpty(false);
//       setPasswordError(false);
//       setCurrentPasswordError(false);
//       setErrorvalidation(false);
//       try {
//         await axiosInstance.patch("/update-password", {
//           currentPassword,
//           password: newPassword,
//           confirmPassword,
//         });
//         Swal.fire({
//           title: "تغييـر كلمة المرور",
//           text: "تم تغييــر كلمة المرور بنجاح",
//           icon: "success",
//           confirmButtonText: "اعد الدخـول",
//         });
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         navigate("/login");
//       setShowModal(false);
//       } catch (error) {
//         if (error.response.data.error==="Incorrect Password"){
//           setCurrentPasswordInCorrect(true);
//           setShowModal(true);
//         }
//       }
//     }
//   };


//   const saveProfileData = async () => {
//     if (profileData.name.trim() === "" || profileData.phone.trim() === "") {
//       setInputError(true);
//       return;
//     }
  
//     // Validate phone number format
//     if (!/^01[0125][0-9]{8}$/.test(profileData.phone)) {
//       setPhoneError(true);
//       return;
//     }
  
//     const {
//       _id,
//       address,
//       cart,
//       createdAt,
//       updatedAt,
//       is_active,
//       email_token,
//       __v,
//       id,
//       verified_at,
//       passwordChangedAt,
//       reset_password_token,
//       reset_password_token_expire,
//       ...updatedProfileData
//     } = profileData;
  
//     if (profileImage) {
//       const formData = new FormData();
//       formData.append("image", profileImage);
//       try {
//         if (profileImage) {
//           const allowedExtensions = /\.(jpeg|png|jpg)$/i;
//           if (!allowedExtensions.test(profileImage.name)) {
//             setShowErrorMessage(true);
//             setErrorvalidation("امتداد الصـورة غير صحيـح");
//             return;
//           }
//           const formData = new FormData();
//           formData.append("image", profileImage);
//         await axiosInstance.patch("/profile", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }
//       await axiosInstance.patch("/profile", updatedProfileData);
//       toggleEditMode();
//       setPhoneError(false);
//       Swal.fire({
//         title: "تم الحفظ",
//         text: "تم حفظ المعلومات الشخصية بنجاح",
//         icon: "success",
//         confirmButtonText: "حسناً",
//       });
//         fetchProfileData();
//       } catch (err) {
//         console.log(err);
//       }
//     }
  
//     if (newPassword !== "" && confirmNewPassword !== "") {
//       updatedProfileData.password = newPassword;
//     }

  
// }
// return {
//   fetchProfileData,
//     handleModalOk,
//     openModal,
//     closeModal,
//     editMode,
//     setProfileImage,
//         showModal,
//         matchError,
//         inputError,
//         phoneError,
//         errorEmpty,
//         passwordError,
//         currentPasswordError,
//         currentPasswordInCorrect,
//         showErrorvalidation,
//         showErrorMessage,
//             toggleEditMode,
//             cancelMode,
//             profileData,
//             handleInputChange,
//             saveProfileData
// }
// }