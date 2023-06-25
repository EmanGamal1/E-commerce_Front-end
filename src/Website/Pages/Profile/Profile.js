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
  // const jwt = localStorage.getItem("token");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordChangeError, setPasswordChangeError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordInCorrect, setCurrentPasswordInCorrect] = useState(false);
  const [showErrorvalidation, setErrorvalidation] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
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
        navigate("/login");
      }
      else if (
        err.response.data.error.includes(
          "Password changed recently, login again"
        )
      ) {
        Swal.fire({
          title: 'اعـد الدخـول مرة ثانيــة',
          text: 'تم تغيير كلمة المرور',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'دخــول',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
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
      setMatchError(false);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setMatchError(false);
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
      setCurrentPasswordError(false);
      setPasswordError(false);
      setErrorvalidation(false);
    } else if (newPassword !== confirmPassword) {
      setMatchError(true);
      setErrorEmpty(false);
      setCurrentPasswordError(false);
      setErrorvalidation(false);
    } else if (newPassword.length < 8) {
      setPasswordError(true);
      setMatchError(false);
      setErrorEmpty(false);
      setCurrentPasswordError(false);
      setErrorvalidation(false);
    } else if(currentPassword.length < 8) {
      setCurrentPasswordError(true);
      setMatchError(false);
      setErrorEmpty(false);
      setErrorvalidation(false);
    }else {
      setMatchError(false);
      setErrorEmpty(false);
      setPasswordError(false);
      setCurrentPasswordError(false);
      setErrorvalidation(false);
      try {
        await axiosInstance.patch("/update-password", {
          currentPassword,
          password: newPassword,
          confirmPassword,
        });
        Swal.fire({
          title: "تغييـر كلمة المرور",
          text: "تم تغييــر كلمة المرور بنجاح",
          icon: "success",
          confirmButtonText: "اعد الدخـول",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      setShowModal(false);
      } catch (error) {
        if (error.response.data.error==="Incorrect Password"){
          setCurrentPasswordInCorrect(true);
          setShowModal(true);
        }
      }
    }
  };

  const saveProfileData = async () => {
    if (profileData.name.trim() === "" || profileData.phone.trim() === "") {
      setInputError(true);
      return;
    }
  
    // Validate phone number format
    if (!/^01[0125][0-9]{8}$/.test(profileData.phone)) {
      setPhoneError(true);
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
      verified_at,
      passwordChangedAt,
      reset_password_token,
      reset_password_token_expire,
      ...updatedProfileData
    } = profileData;
  
      try {
        if (profileImage) {
          const allowedExtensions = /\.(jpeg|png|jpg)$/i;
          if (!allowedExtensions.test(profileImage.name)) {
            setShowErrorMessage(true);
            setErrorvalidation("امتداد الصـورة غير صحيـح");
            return;
          }
          const formData = new FormData();
          formData.append("image", profileImage);
        await axiosInstance.patch("/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      await axiosInstance.patch("/profile", updatedProfileData);
      toggleEditMode();
      setPhoneError(false);
      Swal.fire({
        title: "تم الحفظ",
        text: "تم حفظ المعلومات الشخصية بنجاح",
        icon: "success",
        confirmButtonText: "حسناً",
      });
        fetchProfileData();
      } catch (err) {
        console.log(err);
      }
    if (newPassword !== "" && confirmNewPassword !== "") {
      updatedProfileData.password = newPassword;
    }
  
    // try {
    //   await axiosInstance.patch("/profile", updatedProfileData);
    //   toggleEditMode();
    //   setPhoneError(false);
    //   Swal.fire({
    //     title: "تم الحفظ",
    //     text: "تم حفظ المعلومات الشخصية بنجاح",
    //     icon: "success",
    //     confirmButtonText: "حسناً",
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };
  
  return (
    <div>
      <>
        {/* Page content */}
        <Container fluid className="mt-4">
          <Row>
            <SideBar />
            <Col lg="8">
              <Card className="shadow px-4">
                <CardHeader className="bg-white rounded shadow border-0">
                <div className="d-flex">
                    {/* <Col> */}
                      <h3 className="mb-0">حســـابي</h3>
                    {/* </Col> */}
                    {/* <Col className="text-right" > */}
                      {!editMode ? (
                        <Buttons
                          title="تعـديل"
                          className="btn btn-outline-warning mr-auto"
                          onClick={toggleEditMode}
                        />
                      ) : (
                        ""
                      )}
                      {/* <Col className="text-right" xs="12"> */}
                        {editMode ? (
                          <>
                            <Buttons
                              title="حفـظ"
                              className="btn btn-outline-warning shadow ml-2  mr-auto"
                              onClick={saveProfileData}
                            />
                            <Buttons
                              title="رجــوع"
                              className="btn btn-outline-dark"
                              onClick={cancelMode}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      {/* </Col> */}
                    {/* </Col> */}
                  </div>
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
                            <div className="card-profile-image mr-3">
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
                                  id="coverImage"
                                  onChange={(e) =>
                                    setProfileImage(e.target.files[0])
                                  }
                                />
                                {showErrorMessage && (
                                  <div className="error-message text-danger"><p>{showErrorvalidation}</p></div>
                                )}
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
                                جميـع الحقـول مطلوبة
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
                                <>
                                <Input
                                  className="form-control-alternative"
                                  id="input-mobile-number"
                                  type="tel"
                                  name="phone"
                                  value={profileData.phone}
                                  onChange={handleInputChange}
                                />
                                {phoneError ? (
                                  <span className="text-danger">
                                    رقـم الهاتــف غير صحيح
                                  </span>
                                ) : (
                                  ""
                                )}
                                </>
                              ) : (
                                <p>{profileData.phone}</p>
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
                            <Modal isOpen={showModal} toggle={closeModal} dir="rtl">
                              <ModalBody>
                                <span className="close" onClick={closeModal}>
                                  &times;
                                </span>
                                <h2>تغيير كلمة المرور</h2>
                                <Input
                                  type="password"
                                  name="currentPassword"
                                  className="form-control mt-5"
                                  placeholder="كلمـة المرور الحاليــة"
                                  onChange={handleInputChange}
                                />
                                {currentPasswordError && (
                                  <span className="text-danger">
                                    يجب ألا تقـل كلمة المــرور الحاليــة عن 8 أحـرف
                                  </span>
                                )}
                                {currentPasswordInCorrect && (
                                  <span className="text-danger">
                                    كلمـة المرور الحاليــة غير صحيحة
                                  </span>
                                )}
                                <Input
                                  type="password"
                                  name="newPassword"
                                  className="form-control mt-2"
                                  placeholder="كلمـة مـرور جديدة"
                                  onChange={handleInputChange}
                                />
                                <Input
                                  type="password"
                                  name="confirmPassword"
                                  className="form-control mt-2"
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
                                    يجب ألا تقـل كلمة المــرور الجديدة عن 8 أحـرف
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