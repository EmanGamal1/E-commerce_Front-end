import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  Alert,
  Button,
} from "reactstrap";
import { axiosInstance } from "Axios.js";
import Buttons from "Website/SharedUI/Buttons/Buttons";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "Website/SharedUI/SideBar/SideBar";
import Swal from "sweetalert2";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: [
      {
        area: "",
        city: "",
        governorate: "",
        country: "",
      },
    ],
    bio: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [matchError, setMatchError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState(null);
  const [phoneError, setPhoneError] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(false);
  const jwt = localStorage.getItem("token");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordChangeError, setPasswordChangeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileData();
  }, []);
  const fetchProfileData = async () => {
    try {
      const res = await axiosInstance.get("/profile");
      console.log(res);
      setProfileData(res.data.data);
      setOriginalProfileData(res.data.data);
    } catch (err) {
      if (err.response.data.error.includes("Please login first")) {
        navigate("/auth/login");
      }
      else if (
        err.response.data.error.includes(
          "Password changed recently, login again"
        )
      ) {
        localStorage.removeItem("token");
        Swal.fire({
          title: 'اعـد الدخـول مرة ثانيــة',
          text: 'تم تغيير كلمة المرور',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'دخــول',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/auth/login");
          }
        });
        
        console.log("login again");
      } else {
        console.log(err);
      }
    }
  };

  const openModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setInputError(false);
  };

  const cancelMode = () => {
    setEditMode(false);
    setInputError(false);
    setProfileData(originalProfileData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
      setMatchError(false); // Reset the match error when the new password changes
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setMatchError(false); // Reset the match error when the confirm password changes
    } else if (name === "phone") {
      // Validate mobile number format
      if (/^\d+$/.test(value) || value === "") {
        setProfileData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    } else {
      setProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  const handleModalOk = async () => {
    if (newPassword === "" || confirmPassword === "") {
      setMatchError(false);
      setShowModal(true);
      setErrorEmpty(true);
    } else if (newPassword !== confirmPassword) {
      setMatchError(true);
      setErrorEmpty(false);
    } else if (newPassword.length < 8) {
      setPasswordError(true);
      setMatchError(false);
      setErrorEmpty(false);
    } else {
      // // Verify current password on the client-side
      // if (currentPassword !== originalProfileData.password) {
      //   setPasswordChangeError(true);
      //   return;
      // }
  
      setMatchError(false);
      setShowModal(false);
      setErrorEmpty(false);
      setPasswordError(false);
      try {
        await axiosInstance.patch("/update-password", {
          currentPassword,
          password: newPassword,
          confirmPassword,
        });
        // Password successfully changed
        Swal.fire({
          title: "Password Changed",
          text: "Your password has been changed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        // setPasswordChangeError(true);
        console.error(error);
      }
    }
  };
   
  // const handleAddressChange = (e, index) => {
  //   const { name, value } = e.target;
  //   const updatedAddresses = [...profileData.address];
  //   updatedAddresses[index] = {
  //     ...updatedAddresses[index],
  //     [name]: value,
  //   };
  //   setProfileData((prevState) => ({
  //     ...prevState,
  //     address: updatedAddresses,
  //   }));
  // };

  // const handleAddAddress = () => {
  //   const updatedAddresses = [...profileData.address, ""];
  //   setProfileData({ ...profileData, address: updatedAddresses });
  // };

  // const handleRemoveAddress = (index) => {
  //   const updatedAddresses = [...profileData.address];
  //   updatedAddresses.splice(index, 1);
  //   setProfileData((prevState) => ({
  //     ...prevState,
  //     address: updatedAddresses,
  //   }));
  // };

  const saveProfileData = async () => {
    if (profileData.name.trim() === "" || profileData.phone.trim() === "") {
      setInputError(true);
      return;
    }
    const {
      _id,
      address,
      cart,
      createdAt,
      updatedAt,
      is_active,
      email_token,
      __v,
      id,
      passwordChangedAt,
      ...updatedProfileData
    } = profileData;

    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      try {
        await axiosInstance.patch("/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchProfileData();
      } catch (err) {
        console.log(err);
      }
    }

    if (newPassword !== "" && confirmNewPassword !== "") {
      updatedProfileData.password = newPassword;
    }

    try {
      await axiosInstance.patch("/profile", updatedProfileData);
      toggleEditMode();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <>
        {/* Page content */}
        <Container fluid className="mt-4">
          <Row>
            <SideBar />
            <Col lg="8">
              <Card className="shadow pr-4">
                <CardHeader className="bg-white rounded shadow border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">حســـابي</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      {!editMode ? (
                        <Buttons
                          title="تعـديل"
                          className="btn btn-outline-warning"
                          onClick={toggleEditMode}
                        />
                      ) : (
                        ""
                      )}
                      <Col className="text-right" xs="12">
                        {editMode ? (
                          <>
                            <Buttons
                              title="حفـظ"
                              className="btn btn-outline-warning shadow"
                              onClick={saveProfileData}
                            />
                            <Buttons
                              title="رجــوع"
                              className="btn btn-outline-primary"
                              onClick={cancelMode}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div>
                      <Row>
                        <Col>
                          <h6 className="heading-small text-muted mb-4">
                            معلوماتي الشخصية
                          </h6>
                        </Col>
                      </Row>
                      <div className="pl-lg-4">
                        <Row>
                          <Col
                            lg="2"
                            style={{ height: "120px" }}
                            className="mt-5"
                          >
                            <div className="card-profile-image">
                              <a
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  className="rounded-circle"
                                  src={profileData.image}
                                />
                              </a>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {editMode ? (
                              <FormGroup>
                                <Input
                                  type="file"
                                  name="image"
                                  id="image"
                                  onChange={(e) =>
                                    setProfileImage(e.target.files[0])
                                  }
                                />
                              </FormGroup>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <>
                      <Row className="mt-5">
                        <Col>
                          {editMode && inputError && (
                            <Alert color="danger" className="alert-transparent">
                              Complete all required fields
                            </Alert>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              الاســم
                              {editMode ? <span class="required">*</span> : ""}
                            </label>
                            <Col lg="8">
                              {editMode ? (
                                <Input
                                  className="form-control-alternative"
                                  id="input-username"
                                  type="text"
                                  name="name"
                                  value={profileData.name}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <p>{profileData.name}</p>
                              )}
                            </Col>
                          </FormGroup>
                        </Col>

                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-mobile-number"
                            >
                              الهاتــف
                              {editMode ? <span class="required">*</span> : ""}
                            </label>
                            <Col lg="8">
                              {editMode ? (
                                <Input
                                  className="form-control-alternative"
                                  id="input-mobile-number"
                                  type="tel"
                                  name="phone"
                                  value={profileData.phone}
                                  onChange={handleInputChange}
                                />
                              ) : (
                                <p>{profileData.phone}</p>
                              )}
                              {phoneError ? (
                                <span className="text-danger">
                                  Phone Number must be only numbers
                                </span>
                              ) : (
                                ""
                              )}
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              العنـــوان
                              {editMode ? <span class="required">*</span> : ""}
                            </label>
                            <Col lg="12">
                              {editMode ? (
                                <>
                                  {/* {profileData.address.map((address, index) => (
                                    <div
                                      className="row"
                                      key={`address-${index}`}
                                    >
                                      <Col lg="3">
                                        <Input
                                          key={`input-address-${index}-area`}
                                          className="form-control-alternative mb-2"
                                          type="text"
                                          name="area"
                                          value={address.area}
                                          onChange={(e) =>
                                            handleAddressChange(e, index)
                                          }
                                        />
                                      </Col>
                                      <Col lg="3">
                                        <Input
                                          key={`input-address-${index}-city`}
                                          className="form-control-alternative mb-2"
                                          type="text"
                                          name="city"
                                          value={address.city}
                                          onChange={(e) =>
                                            handleAddressChange(e, index)
                                          }
                                        />
                                      </Col>
                                      <Col lg="3">
                                        <Input
                                          key={`input-address-${index}-governorate`}
                                          className="form-control-alternative mb-2"
                                          type="text"
                                          name="governorate"
                                          value={address.governorate}
                                          onChange={(e) =>
                                            handleAddressChange(e, index)
                                          }
                                        />
                                      </Col>
                                      <Col lg="2">
                                        <Input
                                          key={`input-address-${index}-country`}
                                          className="form-control-alternative mb-2"
                                          type="text"
                                          name="country"
                                          value={address.country}
                                          onChange={(e) =>
                                            handleAddressChange(e, index)
                                          }
                                        />
                                      </Col>
                                      <Col lg="1">
                                        <button
                                          className="btn btn-sm btn-outline-danger mb-2"
                                          onClick={() =>
                                            handleRemoveAddress(index)
                                          }
                                        >
                                          <i className="fa fa-minus-circle"></i>
                                        </button>
                                      </Col>
                                      {index ===
                                        profileData.address.length - 1 && (
                                        <button
                                          className="btn-sm btn-outline-primary"
                                          onClick={handleAddAddress}
                                        >
                                          <i className="fa fa-plus-circle"></i>
                                          إضافة عنـوان جديد
                                        </button>
                                      )}
                                    </div>
                                  ))} */}

                                  <Link to="/address"><Buttons title="الذهاب للعناوين" className="btn-sm btn-outline-warning"/></Link>
                                </>
                              ) : (
                                <>
                                  {profileData.address.map((address, index) => (
                                    <p key={`address-${index}`}>
                                      {address.area}, {address.city},{" "}
                                      {address.governorate}, {address.country}
                                    </p>
                                  ))}
                                </>
                              )}
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          {/* Description */}
                          <label
                            className="form-control-label"
                            htmlFor="input-Bio"
                          >
                            نبذة تعريفية
                          </label>
                          <Col lg="12">
                            {editMode ? (
                              <Input
                                className="form-control-alternative"
                                rows="4"
                                type="textarea"
                                name="bio"
                                value={profileData.bio}
                                onChange={handleInputChange}
                              />
                            ) : (
                              <p>{profileData.bio}</p>
                            )}
                          </Col>
                        </Col>
                      </Row>
                    </>

                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      معلومات إضافية
                    </h6>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          البريد الإلكتروني
                        </label>
                        <Col lg="8">
                          <p>{profileData.email}</p>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        {!editMode ? (
                          <>
                            <label
                              className="form-control-label"
                              htmlFor="input-password"
                            >
                              كلمــة المرور
                            </label>
                            <Buttons
                              title="تغييـر كلمــة المرور"
                              className="btn btn-primary ml-3"
                              onClick={openModal}
                            />
                            <Modal isOpen={showModal} toggle={closeModal}>
                              <ModalBody>
                                <span className="close" onClick={closeModal}>
                                  &times;
                                </span>
                                <h2>تغيير كلمة المرور</h2>
                                {/* {passwordChangeError && (
                                  <Alert
                                    color="danger"
                                    className="alert-transparent"
                                  >
                                    كلمة المرور الحاليــة غير صحيحة
                                  </Alert>
                                )} */}
                                <Input
                                  type="password"
                                  name="currentPassword"
                                  className="form-control mt-5"
                                  placeholder="كلمـة المرور الحاليــة"
                                  onChange={handleInputChange}
                                />
                                <Input
                                  type="password"
                                  name="newPassword"
                                  className="form-control"
                                  placeholder="كلمـة مـرور جديدة"
                                  onChange={handleInputChange}
                                />
                                <Input
                                  type="password"
                                  name="confirmPassword"
                                  className="form-control"
                                  placeholder="تأكيـد كلمـة المـرور الجديدة"
                                  onChange={handleInputChange}
                                />
                                {matchError && (
                                  <span className="text-danger">
                                    كلمة المرور وتأكيد كلمة المرور غير متطابقين
                                  </span>
                                )}{" "}
                                {errorEmpty && (
                                  <div
                                    className="alert alert-danger mt-3 alert-transparent"
                                    role="alert"
                                  >
                                    جميع الحقــول مطلوبة
                                  </div>
                                )}
                                {passwordError && (
                                  <span className="text-danger">
                                    Password must be at least 8 characters long
                                  </span>
                                )}

                              </ModalBody>
                              <ModalFooter>
                                <Buttons
                                  title="حفــظ"
                                  className="btn btn-primary"
                                  onClick={handleModalOk}
                                />
                                <Buttons
                                  title="رجــوع"
                                  className="btn btn-secondary"
                                  onClick={closeModal}
                                />
                              </ModalFooter>
                            </Modal>
                          </>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </Col>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </div>
  );
};

export default Profile;
