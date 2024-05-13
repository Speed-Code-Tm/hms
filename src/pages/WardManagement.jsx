import React, { useState } from 'react'
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import WardList from '../components/ward_management/WardList'
import BedList from '../components/ward_management/BedList'

const WardManagement = () => {
    const [activeTab,setActiveTab] = useState()
    const [showModal,setShowModal] = useState(false)
      
  return (
    <Container>
    <Row>
      <Col>
        <Tabs
          id="pharmacy-tabs"
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="justify-content-center"
        >
          <Tab eventKey="wards" title="Wards">
          <Button variant="primary" onClick={()=>setShowModal(true)} className='mb-3 mt-2' >
                                Add Ward
                            </Button>
            <WardList  showModal={showModal} setShowModal={setShowModal} activeTab={'wards'}/>
          </Tab>
         

          <Tab eventKey="beds" title="Bed Management">
            <BedList activeTab='beds' />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </Container>
  )
}

export default WardManagement
