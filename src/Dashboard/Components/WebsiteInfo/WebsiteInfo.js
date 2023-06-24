import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import MySwal from "sweetalert2";
import { axiosDashboard } from "../../../Axios";
import { CloudinaryContext, Image } from "cloudinary-react";
import { cloudinaryConfig } from "../../../cloudinaryConfig";

const WebsiteInfo = () => {
  const [webInfo, setWebInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [addOper, setAddOper] = useState(false);
  const [socialMediaData, setSocialMediaData] = useState(
    webInfo.social_media || []
  );
  const [bannersData, setBannersData] = useState(webInfo.banners || []);
  const cloudName = "dcjzco86z";

  useEffect(() => {
    fetchTermsAndConditionsData();
  }, []);

  useEffect(() => {
    setSocialMediaData(webInfo.social_media || []);
  }, [webInfo]);

  useEffect(() => {
    setBannersData(webInfo.banners || []);
  }, [webInfo]);

  const fetchTermsAndConditionsData = async () => {
    await axiosDashboard
      .get("/api/v1/settings")
      .then((response) => {
        setWebInfo(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setWebInfo({ ...webInfo, logo: file.name });
      reader.readAsDataURL(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedData({});
    setSelectedImage(null);
    setSocialMediaData(webInfo.social_media || []);
    setBannersData(webInfo.banners || []);
  };

  const handleSocialMediaChange = (e, index, field) => {
    const updatedSocialMediaData = [...socialMediaData];
    updatedSocialMediaData[index][field] = e.target.value;
    setSocialMediaData(updatedSocialMediaData);
  };

  const handleAddSocialMedia = (e) => {
    e.preventDefault();
    const newSocialMedia = {
      name: "",
      url: "",
    };
    setSocialMediaData([...socialMediaData, newSocialMedia]);
  };

  const handleRemoveSocialMedia = (index) => {
    const updatedSocialMediaData = socialMediaData.filter(
      (_, i) => i !== index
    );
    setSocialMediaData(updatedSocialMediaData);
  };

  const handleBannersChange = async (e, index, field) => {
    const updatedBannersData = [...bannersData];

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "bannersImages");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );

        const imageURL = response.data.secure_url;
        updatedBannersData[index][field] = imageURL;
        setBannersData(updatedBannersData);
      } catch (error) {
        console.log(error);
      }
    } else {
      updatedBannersData[index][field] = e.target.value;
      setBannersData(updatedBannersData);
    }
  };

  const handleAddBanners = (e) => {
    e.preventDefault();
    setAddOper(true);
    const newBanners = {
      image: "",
      link: "",
      alt: "",
    };
    setBannersData([...bannersData, newBanners]);
  };

  const handleRemoveBanners = (index) => {
    const updatedBannersData = bannersData.filter((_, i) => i !== index);
    setBannersData(updatedBannersData);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    // phone: Yup.string().required("Required"),
    locations: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: webInfo.email,
      // phone: webInfo.phone,
      locations: webInfo.locations,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSaveClick(values);
    },
  });

  const handleSaveClick = async () => {
    try {
      const updatedData = {
        ...webInfo,
        email: editedData.email || webInfo.email,
        phone:
          editedData.phone !== undefined ? editedData.phone : webInfo.phone,
        locations: editedData.locations || webInfo.locations,
        social_media: socialMediaData,
        banners: bannersData,
      };

      await axiosDashboard.patch("/api/v1/settings", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setWebInfo(updatedData); // Update with the edited data
      setEditedData({});
      setSelectedImage(null);
      setEditMode(false);

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Your changes have been saved successfully.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="shadow">
        <CardHeader className="border-0 d-flex">
          <div className="ml-auto">
            <Btn
              title={editMode ? "Save" : "Edit"}
              className="btn btn-primary"
              onClick={editMode ? handleSaveClick : handleEditClick}
            />
            {editMode ? (
              <Btn
                title="Cancel"
                className="btn btn-secondary"
                onClick={handleCancelClick}
              />
            ) : (
              ""
            )}
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <table className="table">
              <tbody>
                <tr>
                  <td width="10%">Logo</td>
                  <td>
                    {editMode ? (
                      <>
                        <label className="form-control-label" htmlFor="logo">
                          Image
                        </label>
                        <input
                          className="form-control w-25"
                          type="file"
                          accept="image/*"
                          name="logo"
                          onChange={handleFileChange}
                        />
                        {webInfo.logo && (
                          <img src={webInfo.logo} className="w-25" alt="logo" />
                        )}
                      </>
                    ) : (
                      <img src={webInfo.logo} className="w-25" alt="logo" />
                    )}
                  </td>
                </tr>
                <tr>
                  <td width="10%">Email</td>
                  <td>
                    {editMode ? (
                      <Input
                        className="form-control w-25"
                        type="text"
                        value={editedData.email || webInfo.email}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            email: e.target.value,
                          })
                        }
                      />
                    ) : (
                      webInfo.email
                    )}
                  </td>
                </tr>
                <tr>
                  <td width="10%">Mobile Number</td>
                  <td>
                    {editMode ? (
                      <Input
                        className="form-control w-25"
                        type="text"
                        value={editedData.phone || webInfo.phone}
                        onChange={(e) =>
                          setEditedData({
                            ...editedData,
                            phone: e.target.value,
                          })
                        }
                      />
                    ) : (
                      webInfo.phone
                    )}
                  </td>
                </tr>
                <tr>
                  <td width="10%">Locations</td>
                  <td>
                    {editMode ? (
                      <>
                        <Input
                          className="form-control w-25"
                          type="text"
                          value={editedData.locations || webInfo.locations}
                          onChange={(e) => {
                            formik.handleChange(e);
                            setEditedData(
                              {
                                ...editedData,
                                locations: e.target.value,
                              },
                              formik.handleChange
                            );
                          }}
                        />
                        {formik.touched.locations &&
                          formik.errors.locations && (
                            <div className="text-danger">
                              {formik.errors.locations}
                            </div>
                          )}
                      </>
                    ) : (
                      webInfo.locations
                    )}
                  </td>
                </tr>
                <tr>
                  <td width="10%">Banner and Ads</td>
                  <td>
                    {webInfo.banners?.map((banner, index) => (
                      <div key={index}>
                        {editMode ? (
                          <></>
                        ) : (
                          <>
                            <a href={banner.link}>
                              <img
                                src={banner.image}
                                alt={banner.alt}
                                className="w-75"
                                style={{ height: "160px" }}
                              />
                            </a>
                            <p>{banner.link}</p>
                          </>
                        )}
                      </div>
                    ))}
                    {/* New Banner */}
                    {editMode &&
                      bannersData.map((item, index) => (
                        <div key={index} className="form-row mb-2">
                          {!addOper ? (
                            <img
                              src={item.image}
                              alt="alt"
                              className="w-75 mb-2 m-2"
                              style={{ height: "160px" }}
                            />
                          ) : (
                            ""
                          )}
                          <Input
                            className="form-control w-25 mr-2"
                            type="file"
                            onChange={(e) =>
                              handleBannersChange(e, index, "image")
                            }
                            placeholder="image"
                          />
                          <Input
                            className="form-control w-25"
                            type="text"
                            value={item.link}
                            onChange={(e) =>
                              handleBannersChange(e, index, "link")
                            }
                            placeholder="link"
                          />
                          <Input
                            className="form-control w-25"
                            type="text"
                            value={item.alt}
                            onChange={(e) =>
                              handleBannersChange(e, index, "alt")
                            }
                            placeholder="alt"
                          />
                          <i
                            className="fa fa-minus-circle fa-2x text-danger mt-2 ml-2"
                            onClick={() => handleRemoveBanners(index)}></i>
                        </div>
                      ))}
                  </td>
                  {/* "+" button */}
                  {editMode && (
                    <div className="form-row mb-2">
                      <Btn
                        title="+"
                        className="btn btn-primary border m-2 mr-5"
                        onClick={handleAddBanners}
                      />
                    </div>
                  )}
                </tr>
                <tr>
                  <td width="10%">Social Media</td>
                  <td>
                    {socialMediaData.map((item, index) => (
                      <div key={index}>
                        {editMode ? (
                          <></>
                        ) : (
                          <>
                            <div
                              className={
                                "fa-brands fa-" + (item.name)
                              }></div>
                            <b> {item.name}: </b> &nbsp;
                            <span>{item.url}</span>
                          </>
                        )}
                      </div>
                    ))}

                    {/* New Social Media */}
                    {editMode &&
                      socialMediaData.map((item, index) => (
                        <div key={index} className="form-row mb-2">
                          {/* <Input
                          className="form-control w-25 mr-2"
                          type="text"
                          value={item.Name}
                          onChange={(e) =>
                            handleSocialMediaChange(e, index, "Name")
                          }
                          placeholder="Name"
                        /> */}
                          <Input
                            className="form-control w-25 mr-2"
                            type="text"
                            value={item.url}
                            onChange={(e) =>
                              handleSocialMediaChange(e, index, "url")
                            }
                            placeholder="url"
                          />
                          <Input
                            className="form-control w-25"
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              handleSocialMediaChange(e, index, "name")
                            }
                            placeholder="Name"
                          />
                          <i
                            className="fa fa-minus-circle fa-2x text-danger mt-2 ml-2"
                            onClick={() => handleRemoveSocialMedia(index)}></i>
                        </div>
                      ))}
                  </td>
                  {/* "+" button */}
                  {editMode && (
                    <div className="form-row">
                      <Btn
                        title="+"
                        className="btn btn-primary border m-2 mr-5"
                        onClick={handleAddSocialMedia}
                      />
                    </div>
                  )}
                </tr>
              </tbody>
            </table>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default WebsiteInfo;
