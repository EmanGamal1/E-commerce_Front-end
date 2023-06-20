import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Navbar,
  Row,
} from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import React from "react";
import "./DataTable.css";
// core components

const Tables = ({
  title,
  data,
  columns,
  addBtn,
  pagination,
  onPageChange,
  setSearch,
  onSort,
}) => {
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
                    <h3 className="mb-0">
                      {title} ({pagination.total})
                    </h3>
                  </Col>
                  {addBtn && <Col>{addBtn}</Col>}
                  {setSearch && (
                    <Col>
                      <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                          type="search"
                          onInput={(e) => setSearch(e.target.value)}
                          placeholder="Search by name..."
                        />
                      </span>
                    </Col>
                  )}
                </Row>
              </CardHeader>
              <CardBody>
                <DataTable
                  value={data}
                  dataKey="id"
                  paginator
                  lazy
                  onSort={onSort}
                  first={(pagination.currentPage - 1) * pagination.limit}
                  rows={pagination.limit}
                  totalRecords={pagination.total}
                  onPage={onPageChange}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: "50rem" }}
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                >
                  <Column
                    body={(rowData, { rowIndex }) => {
                      return rowIndex + 1;
                    }}
                    header="#"
                  ></Column>
                  {columns.map((column) => (
                    <Column
                      key={column.field}
                      field={column.field}
                      body={column.body}
                      header={column.header}
                      sortable={column.sortable}
                      filter={column.filter}
                    />
                  ))}
                </DataTable>
              </CardBody>
              <CardFooter className="py-4"></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
