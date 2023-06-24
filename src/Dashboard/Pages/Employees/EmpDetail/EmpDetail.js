import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Container,
  Button,
  Col,
  Row,
  Navbar,
} from "reactstrap";
// core components
import Tables from "../../../SharedUI/Table/Tables";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../Assets/css/project.css";
import { axiosDashboard } from "../../../../Axios";
import handleErrors from "../../../../Errors";

const EmpDetails = () => {
  const { id } = useParams();

  const [empdata, setEmpData] = useState({});

  useEffect(() => {
    axiosDashboard
      .get(`/api/v1/employees/${id}`)
      .then((res) => {
        setEmpData(res.data.data);
      })
      .catch((error) => handleErrors(error));
  }, [id]);

  return (
    <>
      <Navbar />

      {/* Page content */}
      <Container className="mt--7 col-lg-6">
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow ">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">Employee Details</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Link
                        className="btn btn-primary"
                        to="/admin/employees"
                        color="primary"
                        href="#pablo"
                        size="sm"
                      >
                        Back
                      </Link>
                      <Link
                        className="btn btn-danger"
                        to={`/admin/EmpEdit/${id}`}
                        color="warning"
                        href="#pablo"
                        size="sm"
                      >
                        Edit
                      </Link>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div>
                    <h6 className="heading-small text-muted mb-4">
                      Employee information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>Name</label>
                            <div className="custom-input">{empdata.name}</div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>Email</label>
                            <div className="custom-input">{empdata.email}</div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>Phone</label>
                            <div className="custom-input">{empdata.phone}</div>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <div>
                            <label>Role</label>
                            <div className="custom-input">{empdata.role}</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default EmpDetails;
