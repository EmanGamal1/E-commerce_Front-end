// import React, { useEffect } from "react";
// import { Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Modal, ModalBody, ModalFooter, Alert } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";
// import SideBar from "Website/SharedUI/SideBar/SideBar";
// import Buttons from "Website/SharedUI/Buttons/Buttons";
// import { useProfileState } from "./../ProfileState/ProfileState";
// import { useProfileEffect } from "./../ProfileEffect/ProfileEffect";
// import "./../Profile.css";

// const ProfileContent = () => {
//   const {
//     setProfileImage,
//     showModal,
//     matchError,
//     inputError,
//     phoneError,
//     errorEmpty,
//     passwordError,
//     currentPasswordError,
//     currentPasswordInCorrect,
//     showErrorvalidation,
//     showErrorMessage,
//     fetchProfileData,
//     handleModalOk,
//     openModal,
//     closeModal,
//     toggleEditMode,
//     editMode,
//     cancelMode,
//     profileData,
//     handleInputChange,
//     saveProfileData,
//   } = useProfileEffect();

//   useEffect(() => {
//     fetchProfileData();
//   }, [fetchProfileData]);
//     return(
//         <div>
//         <>
//           {/* Page content */}
//           <Container fluid className="mt-4">
//             <Row>
//               <SideBar />
//               <Col lg="8">
//                 <Card className="shadow px-4">
//                   <CardHeader className="bg-white rounded shadow border-0">
//                   <div className="d-flex">
//                       {/* <Col> */}
//                         <h3 className="mb-0">حســـابي</h3>
//                       {/* </Col> */}
//                       {/* <Col className="text-right" > */}
//                         {!editMode ? (
//                           <Buttons
//                             title="تعـديل"
//                             className="btn btn-outline-warning mr-auto"
//                             onClick={toggleEditMode}
//                           />
//                         ) : (
//                           ""
//                         )}
//                         {/* <Col className="text-right" xs="12"> */}
//                           {editMode ? (
//                             <>
//                               <Buttons
//                                 title="حفـظ"
//                                 className="btn btn-outline-warning shadow ml-2  mr-auto"
//                                 onClick={saveProfileData}
//                               />
//                               <Buttons
//                                 title="رجــوع"
//                                 className="btn btn-outline-dark"
//                                 onClick={cancelMode}
//                               />
//                             </>
//                           ) : (
//                             ""
//                           )}
//                         {/* </Col> */}
//                       {/* </Col> */}
//                     </div>
//                   </CardHeader>
//                   <CardBody>
//                     <Form>
//                       <div>
//                         <Row>
//                           <Col>
//                             <h6 className="heading-small text-muted mb-4">
//                               معلوماتي الشخصية
//                             </h6>
//                           </Col>
//                         </Row>
//                         <div className="pl-lg-4">
//                           <Row>
//                             <Col
//                               lg="2"
//                               style={{ height: "120px" }}
//                               className="mt-5"
//                             >
//                               <div className="card-profile-image mr-3">
//                                 <a
//                                   href="#pablo"
//                                   onClick={(e) => e.preventDefault()}
//                                 >
//                                   <img
//                                     alt="..."
//                                     className="rounded-circle"
//                                     src={profileData.image}
//                                   />
//                                 </a>
//                               </div>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col>
//                               {editMode ? (
//                                 <FormGroup>
//                                   <Input
//                                     type="file"
//                                     name="image"
//                                     id="coverImage"
//                                     onChange={(e) =>
//                                       setProfileImage(e.target.files[0])
//                                     }
//                                   />
//                                   {showErrorMessage && (
//                                     <div className="error-message text-danger"><p>{showErrorvalidation}</p></div>
//                                   )}
//                                 </FormGroup>
//                               ) : (
//                                 ""
//                               )}
//                             </Col>
//                           </Row>
//                         </div>
//                       </div>
//                       <>
//                         <Row className="mt-5">
//                           <Col>
//                             {editMode && inputError && (
//                               <Alert color="danger" className="alert-transparent">
//                                   جميـع الحقـول مطلوبة
//                               </Alert>
//                             )}
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col lg="6">
//                             <FormGroup>
//                               <label
//                                 className="form-control-label"
//                                 htmlFor="input-username"
//                               >
//                                 الاســم
//                                 {editMode ? <span class="required">*</span> : ""}
//                               </label>
//                               <Col lg="8">
//                                 {editMode ? (
//                                   <Input
//                                     className="form-control-alternative"
//                                     id="input-username"
//                                     type="text"
//                                     name="name"
//                                     value={profileData.name}
//                                     onChange={handleInputChange}
//                                   />
//                                 ) : (
//                                   <p>{profileData.name}</p>
//                                 )}
//                               </Col>
//                             </FormGroup>
//                           </Col>
  
//                           <Col lg="6">
//                             <FormGroup>
//                               <label
//                                 className="form-control-label"
//                                 htmlFor="input-mobile-number"
//                               >
//                                 الهاتــف
//                                 {editMode ? <span class="required">*</span> : ""}
//                               </label>
//                               <Col lg="8">
//                                 {editMode ? (
//                                   <>
//                                   <Input
//                                     className="form-control-alternative"
//                                     id="input-mobile-number"
//                                     type="tel"
//                                     name="phone"
//                                     value={profileData.phone}
//                                     onChange={handleInputChange}
//                                   />
//                                   {phoneError ? (
//                                     <span className="text-danger">
//                                       رقـم الهاتــف غير صحيح
//                                     </span>
//                                   ) : (
//                                     ""
//                                   )}
//                                   </>
//                                 ) : (
//                                   <p>{profileData.phone}</p>
//                                 )}
                               
//                               </Col>
//                             </FormGroup>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col lg="12">
//                             <FormGroup>
//                               <label
//                                 className="form-control-label"
//                                 htmlFor="input-last-name"
//                               >
//                                 العنـــوان
//                                 {editMode ? <span class="required">*</span> : ""}
//                               </label>
//                               <Col lg="12">
//                                 {editMode ? (
//                                   <>
//                                     <Link to="/address"><Buttons title="الذهاب للعناوين" className="btn-sm btn-outline-warning"/></Link>
//                                   </>
//                                 ) : (
//                                   <>
//                                     {profileData.address.map((address, index) => (
//                                       <p key={`address-${index}`}>
//                                         {address.area}, {address.city},{" "}
//                                         {address.governorate}, {address.country}
//                                       </p>
//                                     ))}
//                                   </>
//                                 )}
//                               </Col>
//                             </FormGroup>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col lg="12">
//                             {/* Description */}
//                             <label
//                               className="form-control-label"
//                               htmlFor="input-Bio"
//                             >
//                               نبذة تعريفية
//                             </label>
//                             <Col lg="12">
//                               {editMode ? (
//                                 <Input
//                                   className="form-control-alternative"
//                                   rows="4"
//                                   type="textarea"
//                                   name="bio"
//                                   value={profileData.bio}
//                                   onChange={handleInputChange}
//                                 />
//                               ) : (
//                                 <p>{profileData.bio}</p>
//                               )}
//                             </Col>
//                           </Col>
//                         </Row>
//                       </>
  
//                       <hr className="my-4" />
//                       <h6 className="heading-small text-muted mb-4">
//                         معلومات إضافية
//                       </h6>
//                       <Col lg="6">
//                         <FormGroup>
//                           <label
//                             className="form-control-label"
//                             htmlFor="input-email"
//                           >
//                             البريد الإلكتروني
//                           </label>
//                           <Col lg="8">
//                             <p>{profileData.email}</p>
//                           </Col>
//                         </FormGroup>
//                       </Col>
//                       <Col lg="6">
//                         <FormGroup>
//                           {!editMode ? (
//                             <>
//                               <label
//                                 className="form-control-label"
//                                 htmlFor="input-password"
//                               >
//                                 كلمــة المرور
//                               </label>
//                               <Buttons
//                                 title="تغييـر كلمــة المرور"
//                                 className="btn btn-primary ml-3"
//                                 onClick={openModal}
//                               />
//                               <Modal isOpen={showModal} toggle={closeModal} dir="rtl">
//                                 <ModalBody>
//                                   <span className="close" onClick={closeModal}>
//                                     &times;
//                                   </span>
//                                   <h2>تغيير كلمة المرور</h2>
//                                   <Input
//                                     type="password"
//                                     name="currentPassword"
//                                     className="form-control mt-5"
//                                     placeholder="كلمـة المرور الحاليــة"
//                                     onChange={handleInputChange}
//                                   />
//                                   {currentPasswordError && (
//                                     <span className="text-danger">
//                                       يجب ألا تقـل كلمة المــرور الحاليــة عن 8 أحـرف
//                                     </span>
//                                   )}
//                                   {currentPasswordInCorrect && (
//                                     <span className="text-danger">
//                                       كلمـة المرور الحاليــة غير صحيحة
//                                     </span>
//                                   )}
//                                   <Input
//                                     type="password"
//                                     name="newPassword"
//                                     className="form-control mt-2"
//                                     placeholder="كلمـة مـرور جديدة"
//                                     onChange={handleInputChange}
//                                   />
//                                   <Input
//                                     type="password"
//                                     name="confirmPassword"
//                                     className="form-control mt-2"
//                                     placeholder="تأكيـد كلمـة المـرور الجديدة"
//                                     onChange={handleInputChange}
//                                   />
//                                   {matchError && (
//                                     <span className="text-danger">
//                                       كلمة المرور وتأكيد كلمة المرور غير متطابقين
//                                     </span>
//                                   )}{" "}
//                                   {errorEmpty && (
//                                     <div
//                                       className="alert alert-danger mt-3 alert-transparent"
//                                       role="alert"
//                                     >
//                                       جميع الحقــول مطلوبة
//                                     </div>
//                                   )}
//                                   {passwordError && (
//                                     <span className="text-danger">
//                                       يجب ألا تقـل كلمة المــرور الجديدة عن 8 أحـرف
//                                     </span>
//                                   )}
  
//                                 </ModalBody>
//                                 <ModalFooter>
//                                   <Buttons
//                                     title="حفــظ"
//                                     className="btn btn-primary"
//                                     onClick={handleModalOk}
//                                   />
//                                   <Buttons
//                                     title="رجــوع"
//                                     className="btn btn-secondary"
//                                     onClick={closeModal}
//                                   />
//                                 </ModalFooter>
//                               </Modal>
//                             </>
//                           ) : (
//                             ""
//                           )}
//                         </FormGroup>
//                       </Col>
//                     </Form>
//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row>
//           </Container>
//         </>
//       </div>
  
//     )
// }

// export default ProfileContent;