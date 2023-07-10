import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Navbar
} from "reactstrap";
import "./Table.css"
import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";
// core components

const Tables = ({title, trContent, tableContent, btn, pagination}) => {
  return (
    <>
      <Navbar />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row>
                  <Col>
                    <h3 className="mb-0">{title}</h3>
                  </Col>
                  <Col>
                    {btn}
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush text-center align-content-center" responsive>
                <thead className="thead-light">
                  <tr >
                    {trContent}
                  </tr>
                </thead>
                <tbody >
                  {tableContent}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                {pagination}
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;