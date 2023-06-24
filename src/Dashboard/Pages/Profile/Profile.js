import React, { useEffect, useState } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import { axiosDashboard } from "Axios.js";
import Btn from "Dashboard/SharedUI/Btn/Btn.js";
import "./Profile.css";
import jwtDecode from "jwt-decode";
import MySwal from "sweetalert2";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [matchError, setMatchError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [originalProfileData, setOriginalProfileData] = useState(null);
  const [phoneError, setPhoneError] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(false);
  const jwt = localStorage.getItem("admin");
  const [decodedToken, setDecodedToken] = useState(jwtDecode(jwt));
  const userId = decodedToken.id;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const res = await axiosDashboard.get(`/api/v1/employees/${userId}`);
      setProfileData(res.data.data);
      setOriginalProfileData(res.data.data);
    } catch (err) {
      console.log(err);
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
    const { id, name, value } = e.target;
    if (id === "new_password") {
      setNewPassword(value);
    } else if (id === "current_password") {
      setPassword(value);
    } else if (id === "confirm_new_password") {
      setConfirmNewPassword(value);
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
    if (newPassword === "" || confirmNewPassword === "") {
      setMatchError(false);
      setShowModal(true);
      setErrorEmpty(true);
    } else if (newPassword !== confirmNewPassword) {
      setMatchError(true);
      setErrorEmpty(false);
    } else {
      setMatchError(false);
      setShowModal(false);
      setErrorEmpty(false);
      console.log(newPassword);
      try {
        await axiosDashboard
          .patch(`/api/v1/employees/update-password`, {
            password: password,
            new_password: newPassword,
            confirm_new_password: confirmNewPassword,
          })
          .then((res) => {
            console.log(res.data.data);
            localStorage.setItem("admin", res.data.data.token);
            //setJWT(localStorage.getItem("admin"));
            setDecodedToken(jwtDecode(jwt));
            setOriginalProfileData(res.data.data.user);
            setProfileData(res.data.data.user);
            MySwal.fire({
              icon: "success",
              title: "Password updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            toggleEditMode();
          })
          .catch((err) => {
            console.log(err);
            console.log(err.response.data);
            MySwal.fire({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const saveProfileData = async () => {
    if (profileData.name.trim() === "" || profileData.phone.trim() === "") {
      setInputError(true);
      return;
    }
    const updatedProfileData = { ...profileData };
    delete updatedProfileData.id;
    delete updatedProfileData.permissions;
    delete updatedProfileData.is_banned;
    delete updatedProfileData.createdAt;
    delete updatedProfileData.last_password_changed_at;

    if (newPassword !== "" && confirmNewPassword !== "") {
      updatedProfileData.password = newPassword;
    }
    try {
      await axiosDashboard.patch(`/api/v1/employees/${userId}`, {
        name: updatedProfileData.name,
        phone: updatedProfileData.phone,
      });
      toggleEditMode();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Card className="bg-secondary shadow pl-4 pr-4">
            <CardHeader className="bg-white rounded shadow border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">My account</h3>
                </Col>
                <Col className="text-right" xs="4">
                  {!editMode ? (
                    <Btn
                      title="Edit Profile"
                      className="btn btn-primary"
                      onClick={toggleEditMode}
                    />
                  ) : (
                    ""
                  )}
                  <Col className="text-right" xs="12">
                    {editMode ? (
                      <>
                        <Btn
                          title="Save"
                          className="btn btn-primary"
                          onClick={saveProfileData}
                        />
                        <Btn
                          title="Cancel"
                          className="btn btn-secondary"
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
                        My information
                      </h6>
                    </Col>
                  </Row>
                  {/* <div className="pl-lg-4"> */}
                  {/* <Row>
                      <Col lg="2" style={{ height: "150px" }} className="mt-5">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={profileData.image}
                            />
                          </a>
                        </div>
                      </Col>
                    </Row> */}
                  {/* <Row className="mb-4">
                      <Col lg="4">
                        {editMode ? (
                          <input type="file" className="form-control" />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row> */}
                  {/* </div> */}
                </div>
                <>
                  <Row>
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
                          Name{editMode ? <span class="required">*</span> : ""}
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
                          Mobile Number
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
                    <Col lg="6">
                      {/* Description */}
                      <label className="form-control-label" htmlFor="input-Bio">
                        Role
                      </label>
                      {/*<Col lg="6">
                        {editMode ? (
                          <Input
                            className="form-control-alternative"
                            rows="4"
                            type="text"
                            name="role"
                            value={profileData.role}
                            onChange={handleInputChange}
                          />
                        ) : (*/}
                      <Col lg="8">
                        <p>{profileData.role}</p>
                      </Col>
                      {/*)}
                      </Col>*/}
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-email"
                        >
                          Email address
                        </label>
                        <Col lg="8">
                          <p>{profileData.email}</p>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </>

                <hr className="my-4" />
                <h6 className="heading-small text-muted mb-4">
                  Additional Info
                </h6>

                <Col lg="6">
                  <FormGroup>
                    {/*{
                                            editMode ?
                                            (
                                                <>*/}
                    <label
                      className="form-control-label"
                      htmlFor="input-password"
                    >
                      Password
                    </label>
                    <Btn
                      title="Change Password"
                      className="btn btn-primary ml-3"
                      onClick={openModal}
                    />
                    <Modal
                      isOpen={showModal}
                      toggle={() => setShowModal(false)}
                    >
                      <ModalBody>
                        <span className="close" onClick={closeModal}>
                          &times;
                        </span>
                        <h2>Change Password</h2>
                        <Input
                          type="password"
                          name="password"
                          id="current_password"
                          className="form-control mt-5"
                          placeholder="Current Password"
                          onChange={handleInputChange}
                        />
                        <Input
                          type="password"
                          name="password"
                          id="new_password"
                          className="form-control mt-3"
                          placeholder="New Password"
                          onChange={handleInputChange}
                        />
                        <Input
                          type="password"
                          name="password"
                          id="confirm_new_password"
                          className="form-control mt-3"
                          placeholder="Confirm new password"
                          onChange={handleInputChange}
                        />
                        {matchError && (
                          <div
                            className="alert alert-danger mt-3 alert-transparent"
                            role="alert"
                          >
                            New password and confirm new password do not match.
                          </div>
                        )}
                        {errorEmpty && (
                          <div
                            className="alert alert-danger mt-3 alert-transparent"
                            role="alert"
                          >
                            Please fill in all the fields.
                          </div>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Btn
                          title="Save"
                          className="btn btn-primary"
                          onClick={handleModalOk}
                        />
                        <Btn
                          title="Cancel"
                          className="btn btn-secondary"
                          onClick={closeModal}
                        />
                      </ModalFooter>
                    </Modal>
                    {/* </>)
                                            : ("")*/}
                  </FormGroup>
                </Col>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </>
    </div>
  );
};

export default Profile;
