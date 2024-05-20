import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tabs, Tab, Button,  Form, DropdownButton, Dropdown } from 'react-bootstrap';
import ReusableTable from './ReusableTable';
import ReusableModal from '../components/ReusableModal'
import styled from "styled-components";
import AddVendorItem from '../components/AddVendorItem';
import OrderItem from '../components/OrderItem';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { initializeApp } from "firebase/app";
import firebaseConfig,{addVendor, deleteVendor, deleteVendorItem, retrieveVendorItems, retrieveVendors, updateVendor} from "./configs"; // Import your Firebase configuration

import { addDoc, collection, getDocs,deleteDoc, doc,getFirestore, query, where } from 'firebase/firestore';

import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from '../components/ConfirmationModal';

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const db = getFirestore(app); // Get Firestore instance


const StyledSubmitButton = styled(Button)`
  width: 200px;
`;

const VendorManagement = () => {
    const [activeTab, setActiveTab] = useState('vendors');
    const [showModal, setShowModal] = useState(false);
    const [showSuppliesModal, setShowSuppliesModal] = useState(false)
    const [showOrderModal,setShowOrderModal] = useState(false)
    const [data,setData] = useState([])
    const [vendorItems,setVendorItems] = useState([])
    const [confirmDelete,setShowConfirmDelete] = useState(false)
    const [loading,setLoading] = useState(false)
    const [selectedItem,setSelectedItem] = useState()
    const [selectedVendor,setSelectedVendor] = useState()
    const [itemDeletionConfirmation,setShowItemDeletionConfirmation] = useState(false)
    const [formData,setFormData] = useState({
      name:'',
      category:'',
      phoneNumber:'',
      email:''
    })


    const changeHandler=(e, field)=>{
    setFormData({...formData, [field]:e.target.value})
    }


const vendorValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Vendor name is required")
        .min(3, "Vendor name must be at least 3 characters long"),
    category: Yup.string()
        .required("Category is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits long"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format")
});


const handleUpdate =  (item) =>{
  setSelectedItem(item)
  setShowSuppliesModal(true)
}


const handleSubmit = async (e) =>{
  try {

    e.preventDefault()
    setLoading(true)
    let message

    await vendorValidationSchema.validate(formData, { abortEarly: false });

    if(selectedVendor){

      await updateVendor(selectedVendor.id, formData)

      setSelectedVendor(null)
      message = "Vendor updated"
    }else{
      await addVendor(formData)
   
     
    message="Vendor added"
    }

    setFormData({
      name: '',
      category: '',
      phoneNumber: '',
      email: ''
  });

    toast.success(message)
   handleModalClose()
   fetchVendors()

  } catch (errors) {
    if (errors.inner && errors.inner.length > 0) {
      const firstErrorMessage = errors.inner[0].message;
      toast.error(`Please fix the following error: ${firstErrorMessage}`);
    } else {
      
      toast.error(
        "An unknown validation error occurred. Please check the form data."
      );
    }
  }finally{
    setLoading(false)
  }
}


const handleDelete = (item) =>{
  setShowItemDeletionConfirmation(true)
  setSelectedItem(item)

}

const confirmItemDeletion  = async () =>{
    try{

      setShowItemDeletionConfirmation(false)

      await deleteVendorItem(selectedItem.id)

      fetchVendorItems()
    
    }catch(error){
      console.log(error);
    }
}
   
      
    const vendorColumns = [
        { Header: 'Name', accessor: 'name' },
        {Header:'Category', accessor:'category'},
        { Header: 'Phone', accessor: 'phoneNumber' },
        { Header: 'Email', accessor: 'email' },

    ];
    
    const itemColumns = [
        { Header: 'Vendor', accessor: 'vendor' },
        { Header: 'Item Name', accessor: 'itemName' },
        { Header: 'Description', accessor: 'description' },

        { Header: 'Unit Price', accessor: 'unitCost' },
        { Header: 'Unit Type', accessor: 'unitType' },
    ];

    const vendorCategories = [
      'Pharmaceuticals',
      'Medical Supplies',
      'Medical Equipment',
      'Office Supplies',
      'Laboratory Supplies',
      'Personal Protective Equipment',
      "IT Supplies"
    ];
    
    const handleRowClick = (vendor, action) =>{
      setSelectedVendor(vendor)

      if(action === 'update'){
        setShowModal(true)

      }else{
        setShowConfirmDelete(true)
      }
    }


    const closeConfirmationModal = () =>{
      setShowConfirmDelete(false)
      setSelectedVendor(null)
    }
    
    const handleAddVendor = () => {
        setShowModal(true);
    };
    
    const handleModalClose = () => {
        setShowModal(false);

        if(selectedVendor){
          setSelectedVendor(null)
        }
    };
    
    const closeModal = () => {
        
        setShowSuppliesModal(false)
        setShowOrderModal(false)
        setSelectedItem(null)
        setShowItemDeletionConfirmation(false)
    };


    const unlistVendor = async () =>{
      try {
        await deleteVendor(selectedVendor?.id)

        fetchVendors()
        
        setShowConfirmDelete(false)
      } catch (error) {
        console.log(error);
      }
    }
    
    const initialState = {
        pageIndex: 0,
        pageSize: 10,
    };


    const fetchVendors = async () => {
      const vendorsData = await retrieveVendors()
      setData(vendorsData);
  };


  const fetchVendorItems = async () => {
   
    const vendorItemsData = await retrieveVendorItems()
    setVendorItems(vendorItemsData);
    
};

// Order item

const handleItemOrder = (item)=>{
  setShowOrderModal(true)
  setSelectedItem(item)
}


useEffect(() => {
  setLoading(true);
  if (activeTab === 'vendors') {
      fetchVendors().finally(() => setLoading(false));
  } else if (activeTab === 'items') {
      fetchVendorItems().finally(() => setLoading(false));
  }
}, [activeTab]);

useEffect(()=>{
  if(selectedVendor){
    setFormData({
      name:selectedVendor?.name,
      category:selectedVendor?.category,
      phoneNumber:selectedVendor?.phoneNumber,
      email:selectedVendor?.email
    })
  }
},[selectedVendor])



    return (
        <Container className='py-3'>
            <Row>
                <Col>
                    <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key)} className="justify-content-center">
                        <Tab eventKey="vendors" title="Vendors">
                            <Button variant="primary" onClick={handleAddVendor} className='mb-3 mt-2' >
                                Add Vendor
                            </Button>
                            <ReusableTable 
                            columns={vendorColumns} 
                            data={data} 
                            initialState={initialState}
                            
                            ActionDropdown={({ row }) => (
                              <div>
                                {/* add a drop down button menu wth icons and functions */}
                                <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
                                
                                  <Dropdown.Item href="#/action-1" onClick={()=> handleRowClick(row.original, 'update')} >
                                  Update
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=> handleRowClick(row.original, 'delete')}>
                                  Delete
                                  </Dropdown.Item>
                                 
                                </DropdownButton>
                              </div>
                            )}
                            />
                        </Tab>
                        <Tab eventKey="items" title="Supplies">
                        <Button variant="primary" onClick={()=> setShowSuppliesModal(true)} className='mb-3 mt-2' >
                                Add Supplies
                            </Button>
                            <ReusableTable columns={itemColumns} data={vendorItems} initialState={initialState}
                            
                            ActionDropdown={({ row }) => (
                              <div>
                                {/* add a drop down button menu wth icons and functions */}
                                <DropdownButton dropup="true" id="dropdown-basic-button" title="Actions">
                                <Dropdown.Item href="#/action-1" onClick={()=>handleItemOrder(row.original)}>
                                 Order
                                  </Dropdown.Item>                           
                                  <Dropdown.Item href="#/action-1" onClick={()=>handleUpdate(row.original)} >
                                  Update
                                  </Dropdown.Item>
                                  <Dropdown.Item href="#/action-2" onClick={()=>handleDelete(row.original)}> 
                                  Delete
                                  </Dropdown.Item>
                                 
                                </DropdownButton>
                              </div>
                            )}
                            />
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

            {/* vendor deletion confirm modal  */}

            <ConfirmationModal
        show={confirmDelete}
        handleClose={closeConfirmationModal}
        handleConfirm={unlistVendor}
        message="Are you sure you want to delete this vendor?"
      />

  {/* vendor item deletion confirm modal  */}

  <ConfirmationModal
        show={itemDeletionConfirmation}
        handleClose={closeModal}
        handleConfirm={confirmItemDeletion}
        message="Are you sure you want to delete this item?"
      />
            {/* Modal for adding a new vendor */}
            <ReusableModal show={showModal} title={selectedVendor?"Update Vendor" :"Add Vendor"} onHide={handleModalClose}>
                    <Form> 
                      
                        <Form.Group controlId="vendorName" className='mb-3'>
                            <Form.Label>Vendor Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter vendor name"
                                value={formData.name}
                                onChange={(e) => changeHandler(e,'name')}
                            />
                        </Form.Group>


                                <Form.Group controlId="vendorCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={formData.category} onChange={(e)=>changeHandler(e, 'category')}>
              
                {vendorCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>



                        <Form.Group controlId="vendorPhone"  className='mb-3'>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter Phone Number"
                                value={formData.phoneNumber}
                                onChange={(e) =>changeHandler(e, 'phoneNumber')}
                            />
                        </Form.Group>


                        <Form.Group controlId="vendorPhone"  className='mb-3'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={(e) =>changeHandler(e, 'email')}
                            />
                        </Form.Group>

                        <StyledSubmitButton
                variant="primary"
                type="submit"
                disabled={loading}
                onClick={handleSubmit}
                className='mt-3'
              >
                {loading ? "Submitting..." : "Submit"}
              </StyledSubmitButton>
                    </Form>
                </ReusableModal>

                {/* add new vendor item modal */}

                <ReusableModal show={showSuppliesModal} title={selectedItem ? "Update Vendor Item":"Add Vendor Item"} onHide={()=> setShowSuppliesModal(false)}>
            <AddVendorItem selectedItem={selectedItem} refetch={fetchVendorItems}  onClose={closeModal}/>
          </ReusableModal>

{/* order item modal */}

 {/* add new vendor item modal */}

 <ReusableModal show={showOrderModal} title="Order Item" onHide={()=>setShowOrderModal(false)}>
            <OrderItem selectedItem={selectedItem}  onClose={closeModal} setSelectedItem={setSelectedItem}/>
          </ReusableModal>

        </Container>
    );
};

export default VendorManagement;
