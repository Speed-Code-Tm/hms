import { useState } from "react";
import { requestItem, retrieveInventoryItems } from "./configs";
import ReusableTable from "./ReusableTable";
import { useEffect } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";
import ReusableModal from "../components/ReusableModal";
import { FaSave } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import * as yup from 'yup';


const MainInventory = ({ activeTab, department }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [inventory, setInventory] = useState()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState('')
  const inventoryColumns = [
    { Header: "Item", accessor: "itemName" },
    { Header: "Category", accessor: "category" },
    { Header: "currentStock", accessor: "currentStock" },
    { Header: "Unit of Measure", accessor: "unitType" },
  ]



  const initialState = {
    pageIndex: 0,
    pageSize: 10,
  };

  const handleRowClick = (item) => {
    setShowModal(true)
    setInventory(item);

  };

  const itemRequestValidationSchema = yup.object().shape({
   
    quantity: yup
      .number()
      .required("Quantity is required.")
      .min(0, "Quantity must be non-negative."),
  });

  async function handleFormSubmit(e) {

    e.preventDefault()
    const timestamp = Timestamp.now()
    const date = timestamp.toDate()
    const formattedDate = date.toLocaleString();
    setLoading(true)
    try {

      await requestItem({ quantity, requestedBy: 'Oliver Wanyonyi', requestDate: formattedDate, itemName: inventory.itemName, status: 'pending',itemId:inventory.id }, 'pharmacy')

      toast.success("Item request successful")
      setShowModal(false)
    } catch (error) {
      if (error.inner && error.inner.length > 0) {
        const firstErrorMessage = error.inner[0].message;
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



  async function fetchMainInventory() {

    try {

      const inventoryData = await retrieveInventoryItems()

      setInventoryItems(inventoryData)

    } catch (error) {
      console.log(error);
    }

  }





  useEffect(() => {
    if (activeTab === "inventory") {
      fetchMainInventory()

    }
  }, [activeTab])

  return (
    <>
      <ReusableModal title='Request Item From Procurement' show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col md={6} className="mb-2">
              <Form.Group controlId="itemName" className="mb-2">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  value={inventory?.itemName}
                  required
                  disabled
                />
              </Form.Group>
            </Col>

            <Col md={6} className="mb-2">
              <Form.Group controlId="quantity" className="mb-2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

          </Row>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              "Submitting..."
            ) : (
              <>
                {" "}
                <FaSave style={{ marginRight: "0.5rem" }} />
                Submit
              </>
            )}
          </Button>
        </Form>
      </ReusableModal>
      <ReusableTable
        columns={inventoryColumns}
        data={inventoryItems}
        initialState={initialState}
        ActionDropdown={({ row }) => (
          <div>
            {/* add a drop down button menu wth icons and functions */}
            <DropdownButton
              dropup="true"
              id="dropdown-basic-button"
              title="Actions"
            >
              <Dropdown.Item
                href="#/action-1"
                onClick={() => handleRowClick(row.original)}
              >
                Request Item
              </Dropdown.Item>

            </DropdownButton>
          </div>
        )}
      />
    </>

  )
}

export default MainInventory