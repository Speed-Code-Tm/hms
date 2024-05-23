import React, { useState } from "react";
import {
  Button,
  Modal,
  Badge,
  Dropdown,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import {
  FaPlus,
  FaEdit,
  FaSave,
  FaTrashAlt,
  FaClipboardCheck,
  FaUpload,
} from "react-icons/fa";
import { format } from "date-fns";
import * as Yup from 'yup';
import styled from "styled-components";
import ReusableTable from "../pages/ReusableTable";
import { deleteLabTest, updateLabTestResult } from "../pages/configs";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";

const PatientManagement = ({testOrders}) => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 35,
      gender: "Male",
      email: "john@example.com",
      phone: "1234567890",
      orders: [
        {
          id: 1,
          test: "CBC",
          status: "pending",
          dateOrdered: "2023-05-01",
          orderingDoctor: "Dr. Smith",
          priority: "routine",
          specimenType: "blood",
        },
        {
          id: 2,
          test: "Lipid Panel",
          status: "complete",
          dateOrdered: "2023-05-02",
          orderingDoctor: "Dr. Johnson",
          priority: "urgent",
          specimenType: "blood",
        },
      ],
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 42,
      gender: "Female",
      email: "jane@example.com",
      phone: "9876543210",
      orders: [
        {
          id: 3,
          test: "Glucose",
          status: "pending",
          dateOrdered: "2023-05-03",
          orderingDoctor: "Dr. Williams",
          priority: "routine",
          specimenType: "blood",
        },
        {
          id: 4,
          test: "TSH",
          status: "pending",
          dateOrdered: "2023-05-04",
          orderingDoctor: "Dr. Brown",
          priority: "urgent",
          specimenType: "blood",
        },
      ],
    },
  ]);

  const [showOrderModal, setShowOrderModal] = useState(false);
  // const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [file,setFile] = useState() 
  const [formData,setFormData] = useState({
    resultValue:'',
    referenceRange:'',
    abnormal:false,
    notes:'',
  })
const [deleteConfirmation,setShowDeleteConfirmation] = useState(false)
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "complete":
        return "success";
      default:
        return "secondary";
    }
  };

  const COLUMNS = [
    {
      Header: "Patient Name",
      accessor: "patientName",
    },
    {
      Header: "Age",
      accessor: "age",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    // {
    //   Header: "Email",
    //   accessor: "email",
    // },
    {
      Header: "Phone",
      accessor: "phone",
    },
    {
      Header: "Test",
      accessor: "test",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => <Badge bg={getStatusColor(value)}>{value}</Badge>,
    },
    {
      Header: "Date Ordered",
      accessor: "dateOrdered",
    },
    {
      Header: "Ordering Doctor",
      accessor: "orderingDoctor",
    },
    {
      Header: "Priority",
      accessor: "priority",
    },
    {
      Header: "Specimen Type",
      accessor: "specimenType",
    },
  ];

  const data = patients.flatMap((patient) =>
    patient.orders.map((order) => ({
      ...patient,
      ...order,
    }))
  );

  const ActionDropdown = ({ row }) => (
    <Dropdown>
      <Dropdown.Toggle variant="link" id={`dropdown-${row.original.id}`}>
        Actions
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {/* <Dropdown.Item
          onClick={() => {
            // setSelectedPatient(row.original);
            setSelectedOrder(row.original);
            setShowOrderModal(true);
          }}
        >
          <FaEdit /> Edit Test
        </Dropdown.Item> */}
        <Dropdown.Item
          onClick={() => {
            // setSelectedPatient(row.original);
            setSelectedOrder(row.original);
            setShowOrderModal(true);
          }} 
        >
          <FaClipboardCheck /> Add Result
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => 
           handleDelete(row.original)
            // const updatedPatients = patients.map((p) => {
            //   if (p.id === row.original.id) {
            //     const updatedOrders = p.orders.filter(
            //       (o) => o.id !== row.original.id
            //     );
            //     return { ...p, orders: updatedOrders };
            //   }
            //   return p;
            // });
            // setPatients(updatedPatients);
          }
        >
          <FaTrashAlt /> Delete Test
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  //delete handler

  const handleDelete = async (test) =>{

    setShowDeleteConfirmation(true)
    setSelectedOrder(test)


  }

  const confirmDeletion  = async () =>{
    await deleteLabTest(selectedOrder.id)
    setShowDeleteConfirmation(false)
    setSelectedOrder(null)
  }
  //submitting a testOrder / updating test result

  const handleSubmit =  async (values, { resetForm }) =>{
    try {
      let message;
      
      if(selectedOrder){
        await  validationSchema.validate(values,{abortEarly:false})

        await updateLabTestResult(selectedOrder?.id, values)
        message = "Labtest result updated"
      }

      toast.success(message)

      setShowOrderModal(false)

      resetForm()
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
      <ReusableTable
        columns={COLUMNS}
        data={testOrders}
        initialState={{
          pageSize: 10,
        }}
        ActionDropdown={ActionDropdown}
      />

    {/* test order delete confirmation */}

    <ConfirmationModal
        show={deleteConfirmation}
        handleClose={()=>{setSelectedOrder(null);setShowDeleteConfirmation(false)}}
        handleConfirm={confirmDeletion}
        message="Are you sure you want to delete this order?"
      />

      <OrderModal
        show={showOrderModal}
        onHide={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
        
        order={selectedOrder}
        handleSubmit={
          handleSubmit
        //   (values) => {
        //   const updatedPatients = patients.map((p) => {
        //     if (p.id === selectedPatient.id) {
        //       const updatedOrders = p.orders.map((o) => {
        //         if (o.id === selectedOrder?.id) {
        //           return { ...o, ...values, status: "complete" };
        //         }
        //         return o;
        //       });
        //       if (!selectedOrder) {
        //         const newOrder = {
        //           id: p.orders.length + 1,
        //           ...values,
        //           status: "pending",
        //         };
        //         updatedOrders.push(newOrder);
        //       }
        //       return { ...p, orders: updatedOrders };
        //     }
        //     return p;
        //   });
        //   setPatients(updatedPatients);
        //   setShowOrderModal(false);
        //   setSelectedOrder(null);
        // }
      
      }
      />
    </div>
  );
};

const validationSchema = Yup.object().shape({
  test: Yup.string().required('Test name is required'),
  dateOrdered: Yup.date().required('Date ordered is required'),
  orderingDoctor: Yup.string().required('Ordering doctor is required'),
  priority: Yup.string().required('Priority is required'),
  specimenType: Yup.string().required('Specimen type is required'),
  resultValue: Yup.number().when('order', {
    is: (order) => !!order,
    then: Yup.number().required('Result value is required'),
  }),
  referenceRange: Yup.string().when('order', {
    is: (order) => !!order,
    then: Yup.string().required('Reference range is required'),
  }),
  abnormalFlag: Yup.bool().when('order', {
    is: (order) => !!order,
    then: Yup.bool().required('Abnormal flag is required'),
  }),
  notes: Yup.string().when('order', {
    is: (order) => !!order,
    then: Yup.string(),
  }),
});

const OrderModal = ({ show, onHide, order, handleSubmit }) => {
  const initialValues = order
    ? {
        test: order.test,
        dateOrdered: order.dateOrdered,
        orderingDoctor: order.orderingDoctor,
        priority: order.priority,
        specimenType: order.specimenType,
        resultValue: order.resultValue || '',
        referenceRange: order.referenceRange || '',
        abnormalFlag: order.abnormalFlag || false,
        notes: order.notes || '',
      }
    : {
        test: '',
        dateOrdered: format(new Date(), 'yyyy-MM-dd'),
        orderingDoctor: '',
        priority: 'routine',
        specimenType: '',
        resultValue: '',
        referenceRange: '',
        abnormalFlag: false,
        notes: '',
      };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header className="bg-primary"  closeButton>
        <Modal.Title style={{color:"white"}}>{order ? 'Update Test Order' : 'Add New Test Order'}</Modal.Title>
      </Modal.Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ isSubmitting }) => (
          <FormikForm>
            <Modal.Body>
              <p>
                Patient: {order?.patientName} <br />
                Patient ID: {order?.patientId}
              </p>
              <Form.Group>
                <Form.Label>Test</Form.Label>
                <Field as={Form.Control} type="text" name="test" placeholder="Enter test name" disabled/>
              </Form.Group>
              <Row className='mb-3'>
                <Col>
                  <Form.Group>
                    <Form.Label>Date Ordered</Form.Label>
                    <Field as={Form.Control} type="date" name="dateOrdered" placeholder="Enter date ordered" disabled/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Ordering Doctor</Form.Label>
                    <Field as={Form.Control} type="text" name="orderingDoctor" placeholder="Enter ordering doctor" disabled/>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Priority</Form.Label>
                    <Field as={Form.Select} name="priority" disabled>
                      <option value="routine">Routine</option>
                      <option value="urgent">Urgent</option>
                    </Field>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Specimen Type</Form.Label>
                    <Field as={Form.Select} name="specimenType" disabled>
                      <option value="">Select specimen type</option>
                      <option value="blood">Blood</option>
                      <option value="urine">Urine</option>
                      <option value="stool">Stool</option>
                      <option value="other">Other</option>
                    </Field>
                  </Form.Group>
                </Col>
              </Row>
              {order && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Result Value</Form.Label>
                    <Field as={Form.Control} type="number" name="resultValue" placeholder="Enter result value" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Reference Range</Form.Label>
                    <Field as={Form.Control} type="text" name="referenceRange" placeholder="Enter reference range" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Abnormal Flag</Form.Label>
                    <Field as={Form.Check} type="checkbox" name="abnormalFlag" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Field as={Form.Control} type="textarea" name="notes" placeholder="Enter notes" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="me-2">Upload Results</Form.Label>
                    <Button variant="primary" size="lg" block>
                      <FaUpload /> Upload Results
                    </Button>
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outlined" onClick={onHide}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <FaSave /> {order ? 'Save Changes' : 'Add Order'}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default PatientManagement;