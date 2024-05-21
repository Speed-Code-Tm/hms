import React, { useState, useMemo, useEffect } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import {
  Button,
  Form,
  Modal,
  Table,
  Pagination,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import { FaSearch, FaPlus, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import * as Yup from 'yup'
import { toast } from "react-toastify";
import { addLabTest, deleteTestCatalogue, retrieveLabTestCatalogue, updateLabTest } from "../pages/configs";
import ReusableTable from "../pages/ReusableTable";
import ConfirmationModal from "./ConfirmationModal";
const TestManagement = ({testCatalogue, refetch}) => {
  const [tests, setTests] = useState([
    {
      id: 1,
      name: "CBC",
      price: 50,
      description: "Complete Blood Count",
      testType: "Hematology",
      specimenType: "blood",
    },
    {
      id: 2,
      name: "Lipid Panel",
      price: 75,
      description: "Cholesterol and Triglycerides",
      testType: "Chemistry",
      specimenType: "blood",
    },
    {
      id: 3,
      name: "Glucose",
      price: 30,
      description: "Blood Sugar",
      testType: "Chemistry",
      specimenType: "blood",
    },
    {
      id: 4,
      name: "TSH",
      price: 40,
      description: "Thyroid Stimulating Hormone",
      testType: "Endocrinology",
      specimenType: "blood",
    },
  ]);

  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
const [deleteConfirmation,setShowDeleteConfirmation] = useState(false)

  const [loading,setLoading] = useState(false)
  const TEST_COLUMNS = [
    {
      Header: "Test Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Test Type",
      accessor: "testType",
    },
    {
      Header: "Specimen Type",
      accessor: "specimenType",
    },
    {
      Header: "Actions",
      Cell: ({ row }) => (
        <Button
          variant="link"
          size="sm"
          onClick={() => {
            setSelectedTest(row.original);
            setShowTestModal(true);
          }}
        >
          <FaEdit />
        </Button>
      ),
    },
  ];

  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  }

  const testColumns = useMemo(() => TEST_COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns: testColumns,
      data: testCatalogue,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  const testValidationSchema =  Yup.object().shape({
    name: Yup.string().required('Test Name is required'),
    price: Yup.number()
      .typeError('Test Price must be a number')
      .required('Test Price is required')
      .positive('Test Price must be a positive number'),
    testType: Yup.string().required('Test Type is required'),
    specimenType: Yup.string()
      .required('Specimen Type is required')
  });

  //row click

  const handleRowClick = (test, action) =>{
    setSelectedTest(test)
    if(action === 'update'){
      setShowTestModal(true)

    }else{
      setShowDeleteConfirmation(true)
    }
  }
  const handleCloseModal = () =>{
      setShowTestModal(false)

    if(selectedTest){
      setSelectedTest(null)
      if(deleteConfirmation){
        setShowDeleteConfirmation(false)
      }
    }
  }
 

  const confirmDeletion = async () =>{
    await deleteTestCatalogue(selectedTest.id)
    handleCloseModal()
    refetch()
  }

  const handleSubmit  = async (values) =>{

    try {

      await testValidationSchema.validate(values,{abortEarly:false})

      let message

      if(selectedTest){

        await updateLabTest(selectedTest.id, values)
        message = 'Tests Updated'

      }else{
        await addLabTest(values)
        message = 'Test added'
      }

      toast.success(message)

      handleCloseModal()
      refetch()
      
    } catch (error) {
      if (error.inner && error.inner.length > 0) {
        const firstErrorMessage = error.inner[0].message;
        toast.error(`Please fix the following error: ${firstErrorMessage}`);
      } else {
        toast.error(
          "An unknown validation error occurred. Please check the form data."
        );
      } 
      
    }

  }




  return (
    <div>
      <div className="py-2 d-flex justify-content-end">
      <Button variant="primary" onClick={() => setShowTestModal(true)}>
            <FaPlus /> Add Test
          </Button>
      </div>
       
      {/* <TableContainer>
        <HeaderContainer>
          <InputGroup style={{ width: "50%" }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search tests..."
              aria-label="Search"
            />
          </InputGroup>
          <Button variant="primary" onClick={() => setShowTestModal(true)}>
            <FaPlus /> Add Test
          </Button>
        </HeaderContainer>
        <Table {...getTableProps()} striped bordered hover responsive>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <PaginationContainer>
          <Pagination>
            <Pagination.First
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            />
            <Pagination.Prev
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            />
            <Pagination.Item active>{pageIndex + 1}</Pagination.Item>
            <Pagination.Next
              onClick={() => nextPage()}
              disabled={!canNextPage}
            />
            <Pagination.Last
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            />
          </Pagination>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </PaginationContainer>
      </TableContainer> */}
<ReusableTable

data={testCatalogue}
initialState={initialState}
columns={testColumns}

ActionDropdown={({ row }) => (
  <div>
    {/* add a drop down button menu wth icons and functions */}
    <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
    
      <Dropdown.Item href="#/action-1" onClick={()=>handleRowClick(row.original,'update')} >
    Update
      </Dropdown.Item>

      <Dropdown.Item href="#/action-2" onClick={()=>handleRowClick(row.original,'delete')}>
      Delete
      </Dropdown.Item>
     
    </DropdownButton>
  </div>
)}

/>

{/* Deletion Confirmation modal  */}

<ConfirmationModal
        show={deleteConfirmation}
        handleClose={handleCloseModal}
        handleConfirm={confirmDeletion}
        message="Are you sure you want to delete this test?"
      />

      <TestModal
        show={showTestModal}
        onHide={() => {
          setShowTestModal(false);
          setSelectedTest(null);
        }}
        test={selectedTest}
        handleSubmit={handleSubmit}
        loading={loading}
        setLoading={setLoading}
        // tests={tests}
        // setSelectedTest={setSelectedTest}
      />
    </div>
  );
};

const TableContainer = styled.div`
  margin-top: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  select {
    margin-left: 0.5rem;
  }
`;

const TestModal = ({ show, onHide, test, handleSubmit }) => {
  const initialValues = test
    ? {
        name: test.name,
        price: test.price,
        description: test.description,
        testType: test.testType,
        specimenType: test.specimenType,
      }
    : {
        name: "",
        price: "",
        description: "",
        testType: "",
        specimenType: "",
      };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="bg-primary" style={{  position: "relative" }}>
        <Modal.Title  style={{ textAlign: "center", color:'white',flex: 1 }}>
          {test ? "Update Test" : "Add New Test"}
        </Modal.Title>
        <CloseButton variant="danger" onClick={onHide}>
          <FaTimes />
        </CloseButton>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Test Name</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="name"
                  placeholder="Enter test name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Field
                  as={Form.Control}
                  type="number"
                  name="price"
                  placeholder="Enter test price"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Field
                  as={Form.Control}
                  type="text"
                  name="description"
                  placeholder="Enter test description"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Test Type</Form.Label>
                <Field as={Form.Select} name="testType">
                  <option value="">Select test type</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Microbiology">Microbiology</option>
                </Field>
              </Form.Group>
              <Form.Group>
                <Form.Label>Specimen Type</Form.Label>
                <Field as={Form.Select} name="specimenType">
                  <option value="">Select specimen type</option>
                  <option value="blood">Blood</option>
                  <option value="urine">Urine</option>
                  <option value="stool">Stool</option>
                  <option value="other">Other</option>
                </Field>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FaSave />{test && isSubmitting ? 'saving' : (test ? "Save Changes" : (isSubmitting ? "submitting" : "Add Test"))}

              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default TestManagement;