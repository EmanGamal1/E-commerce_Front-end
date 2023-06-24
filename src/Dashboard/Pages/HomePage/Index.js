import { useEffect, useState } from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
} from "../../Variables/Charts.js";

import { axiosDashboard } from "../../../Axios";
import Header from "../../Components/Headers/Header";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [ordersData, setOrdersData] = useState("data1");
  const [statistics, setStatistics] = useState({});
  const StaticsUrl = "api/v1/statics";
  const newChart = chartExample1;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchStatics = async () => {
    await axiosDashboard
      .get(`${StaticsUrl}`)
      .then((res) => {
        setStatistics(res.data.data);
        res.data.data.completedOrdersInLastSixMonths.sort(
          (a, b) => a.no - b.no
        );
        res.data.data.cancelledOrdersInLastSixMonths.sort(
          (a, b) => a.no - b.no
        );
        res.data.data.processingOrdersFromLastSixMonths.sort(
          (a, b) => a.no - b.no
        );
        const completedMonths = Array.isArray(
          res.data.data.completedOrdersInLastSixMonths
        )
          ? res.data.data.completedOrdersInLastSixMonths.map(
              (item) => item.month
            )
          : "";
        const completedCount = Array.isArray(
          res.data.data.completedOrdersInLastSixMonths
        )
          ? res.data.data.completedOrdersInLastSixMonths.map(
              (item) => item.count
            )
          : "";
        const cancelledMonths = Array.isArray(
          res.data.data.cancelledOrdersInLastSixMonths
        )
          ? res.data.data.cancelledOrdersInLastSixMonths.map(
              (item) => item.month
            )
          : "";
        const cancelledCount = Array.isArray(
          res.data.data.cancelledOrdersInLastSixMonths
        )
          ? res.data.data.cancelledOrdersInLastSixMonths.map(
              (item) => item.count
            )
          : "";
        const processingMonths = Array.isArray(
          res.data.data.processingOrdersFromLastSixMonths
        )
          ? res.data.data.processingOrdersFromLastSixMonths.map(
              (item) => item.month
            )
          : "";
        const processingCount = Array.isArray(
          res.data.data.processingOrdersFromLastSixMonths
        )
          ? res.data.data.processingOrdersFromLastSixMonths.map(
              (item) => item.count
            )
          : "";
        if (completedMonths.length === 1) {
          completedMonths.unshift("Start");
          completedCount.unshift(0);
        }
        if (cancelledMonths.length === 1) {
          cancelledMonths.unshift("Start");
          cancelledCount.unshift(0);
        }
        if (processingMonths.length === 1) {
          processingMonths.unshift("Start");
          processingCount.unshift(0);
        }
        newChart["data1"] = {
          labels: completedMonths,
          datasets: [
            {
              label: "Completed",
              data: completedCount,
            },
          ],
        };
        newChart["data2"] = {
          labels: cancelledMonths,
          datasets: [
            {
              label: "Cancelled",
              data: cancelledCount,
            },
          ],
        };
        newChart["data3"] = {
          labels: processingMonths,
          datasets: [
            {
              label: "Processing",
              data: processingCount,
            },
          ],
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchStatics();
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setOrdersData("data" + index);
  };
  return (
    <>
      <Header title={statistics} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Total Orders</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#orders"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Completed</span>
                          <span className="d-md-none">C</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#orders"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Cancelled</span>
                          <span className="d-md-none">CA</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 3,
                          })}
                          data-toggle="tab"
                          href="#orders"
                          onClick={(e) => toggleNavs(e, 3)}
                        >
                          <span className="d-none d-md-block">Processing</span>
                          <span className="d-md-none">P</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                Chart
                <div className="chart">
                  <Line
                    data={newChart[ordersData]}
                    options={newChart.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          {/*<Col xl="4">*/}
          {/*  <Card className="shadow">*/}
          {/*    <CardHeader className="bg-transparent">*/}
          {/*      <Row className="align-items-center">*/}
          {/*        <div className="col">*/}
          {/*          <h6 className="text-uppercase text-muted ls-1 mb-1">*/}
          {/*            Performance*/}
          {/*          </h6>*/}
          {/*          <h2 className="mb-0">Total orders</h2>*/}
          {/*        </div>*/}
          {/*      </Row>*/}
          {/*    </CardHeader>*/}
          {/*    <CardBody>*/}
          {/*      Chart*/}
          {/*      <div className="chart">*/}
          {/*        <Bar*/}
          {/*          data={chartExample2.data}*/}
          {/*          options={chartExample2.options}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </CardBody>*/}
          {/*  </Card>*/}
          {/*</Col>*/}
        </Row>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Top Products</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(statistics.topProducts) ? (
                    statistics.topProducts.map((product) => (
                      <tr key={product.id}>
                        <th>{product.id}</th>
                        <th scope="row">{product.name_en}</th>
                        <td>{product.price}</td>
                        <td>{product.total_orders}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No top products found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
