import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Input,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import MySwal from "sweetalert2";
import Btn from "Dashboard/SharedUI/Btn/Btn";
import { axiosDashboard } from "../../../../Axios";
import { Navigate, useNavigate } from "react-router";
import { useFormik } from "formik";
import { Checkbox } from "primereact/checkbox";
import handleErrors from "../../../../Errors";

const CreateRole = () => {
  const initialRole = {
    newRole: "",
    permissions: [],
  };
  const methodes = ["GET", "POST", "PATCH", "DELETE", "UNBAN", "BAN"];
  const [routes, setRoutes] = useState([]);
  const [permissionsData, setPermissionsData] = useState([]);
  const navigate = useNavigate();

  const fetchRoutes = async () => {
    try {
      const response = await axiosDashboard.get("/api/v1/routes");
      const { routes: route } = response.data.data;
      setRoutes(route);
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    fetchRoutes();

    // fetchPermissions();
  }, []);
  const fetchPermissions = async () => {
    try {
      const response = await axiosDashboard.get("/api/v1/roles");
      const roles = response.data.data;
      console.log(roles);
      if (roles && roles.length > 0) {
        const permissions = roles[0].permissions;
        setPermissionsData(permissions);
      }
    } catch (error) {
      handleErrors(error);
    }
  };
  const validationSchema = Yup.object().shape({
    newRole: Yup.string()
      .required("Role name is required")
      .test("unique", "Role name must be unique", async (value) => {
        try {
          const response = await axiosDashboard.get(
            `/api/v1/roles?name=${value}`
          );
          const roles = response.data.data;
          return roles.length === 0;
        } catch (error) {
          console.error("Error checking role uniqueness:", error);
          return false;
        }
      }),
    permissions: Yup.array()
      .min(1, "At least one permission must be selected")
      .required("At least one permission must be selected"),
  });

  const formik = useFormik({
    initialValues: initialRole,
    validationSchema,
    onSubmit: async (values) => {
      console.log("values:", values);

      try {
        const permissionsByEntity = {};
        values.permissions.forEach((permission) => {
          const [entity, access] = permission.split(":");
          if (!permissionsByEntity[entity]) {
            permissionsByEntity[entity] = {
              entity,
              access: {},
            };
          }
          permissionsByEntity[entity].access[access.toLowerCase()] = true;
        });
        // console.log("permissionsByEntity:", permissionsByEntity);
        const roleData = {
          name: values.newRole,
          permissions: Object.values(permissionsByEntity),
        };
        // console.log("roleData:", roleData);
        // return;
        const response = await axiosDashboard.post("/api/v1/roles", roleData);
        // console.log("Role saved:", response.data);

        MySwal.fire({
          icon: "success",
          title: "Success!",
          text: "New Role has been added successfully.",
        });

        navigate("/admin/roles");
      } catch (error) {
        handleErrors(error);
      }
    },
  });

  const handlePermissionChange = (event) => {
    const permission = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      formik.setFieldValue("permissions", [
        ...formik.values.permissions,
        permission,
      ]);
    } else {
      formik.setFieldValue(
        "permissions",
        formik.values.permissions.filter((p) => p !== permission)
      );
    }
  };

  return (
    <>
      <Container className="w-75 mt--5" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h2>Add Role</h2>
                <hr />
              </CardHeader>
              <CardBody>
                <form className="ms-5" onSubmit={formik.handleSubmit}>
                  <label htmlFor="roleName">
                    <b>Role Name</b>
                    <span className="required">*</span>
                  </label>
                  <Input
                    className="w-50 form-control-alternative"
                    type="text"
                    id="roleName"
                    name="newRole"
                    placeholder="Role name"
                    value={formik.values.newRole}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.newRole && formik.errors.newRole ? (
                    <div className="text-danger">{formik.errors.newRole}</div>
                  ) : null}

                  <br />
                  <label htmlFor="permissions">
                    <b>Permissions</b>
                    <span className="required">*</span>
                  </label>
                  <br />

                  <div>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">
                            Route
                          </th>
                          {/*<th scope="col" className="text-center">
                            Select All
                          </th>*/}
                          <th scope="col" className="text-center">
                            View - View ALl
                          </th>
                          <th scope="col" className="text-center">
                            Create
                          </th>
                          <th scope="col" className="text-center">
                            Update
                          </th>
                          <th scope="col" className="text-center">
                            Delete
                          </th>
                          <th scope="col" className="text-center">
                            Activate
                          </th>
                          <th scope="col" className="text-center">
                            Deactivate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {routes.map((route) => (
                          <tr id={route}>
                            <td className="text-center">{route}</td>

                            {methodes.map((method) => (
                              <td className="text-center">
                                <Checkbox
                                  id={`${route}:${method}`}
                                  value={`${route}:${method}`}
                                  checked={formik.values.permissions.includes(
                                    `${route}:${method}`
                                  )}
                                  onChange={handlePermissionChange}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {formik.touched.permissions && formik.errors.permissions ? (
                    <div className="text-danger">
                      {formik.errors.permissions}
                    </div>
                  ) : null}

                  <CardFooter>
                    <Btn
                      type="submit"
                      title="Save"
                      className="btn btn-primary"
                    />
                    <Btn
                      type="button"
                      title="Cancel"
                      className="btn btn-light"
                      onClick={() => navigate("/admin/roles")}
                    />
                  </CardFooter>
                </form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default CreateRole;
