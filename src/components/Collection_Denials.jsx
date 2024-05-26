import React, { useState } from 'react'
import { Container,Tabs,Tab } from 'react-bootstrap'
import DenialManagement from './financials/DenialManagement'
import ClaimManagement from './financials/ClaimManagement'
import InvoiceManagement from './financials/InvoiceManagement'

const Collection_Denials = () => {
    const [activeTab,setActiveTab] = useState('invoices')
    const [claims,setClaims] = useState([])
    const [denials,setDenials] = useState([])
    const [invoices,setInvoices] = useState([])

    const fetchClaims = async () =>{

    }

    const fetchDenials = async () =>{

    }

    const fetchInvoices = async ()=>{

    }

  return (
    <Container Fluid style={{marginTop:"20px"}}>
      <Tabs 
      activeKey={activeTab}
         onSelect={(key) => setActiveTab(key)}
      >
        <Tab eventKey="invoices" title="Invoices"
         activeKey={activeTab}
        
        >
          <InvoiceManagement refetch={fetchInvoices} data={[]} activeTab={'expenses'}/>
        </Tab>
        <Tab eventKey="claimManagement" title="Claim Management">

          <ClaimManagement refetch={fetchClaims} data={claims} />
         
         
        </Tab>
        <Tab eventKey="denialManagement" title="Denial Management">
         <DenialManagement refetch={fetchDenials} data={denials} />
        </Tab>
       
       
      </Tabs>

    
    </Container>
  )
}

export default Collection_Denials