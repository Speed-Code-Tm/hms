import React from 'react'

const GenerateInvoice = () => {

    const patients = [
        {
          name: 'John Doe',
          patientId: 'p001',
          idNumber: '123456789',
          hospitalVisits: [
            {
              id: 'hv001',
              date: '2024-05-20',
              type: 'outpatient',
            },
            {
              id: 'hv002',
              date: '2024-05-22',
              type: 'inpatient',
            },
          ],
        },
        {
          name: 'Jane Smith',
          patientId: 'p002',
          idNumber: '987654321',
          hospitalVisits: [
            {
              id: 'hv003',
              date: '2024-05-21',
              type: 'outpatient',
            },
          ],
        },
      ];
      
    
      const services = [
        {
          hospitalVisitId: 'hv001',
          serviceId: 's001',
          description: 'Consultation',
          quantity: 1,
          unitPrice: 50,
        },
        {
          hospitalVisitId: 'hv001',
          serviceId: 's002',
          description: 'Blood Test',
          quantity: 1,
          unitPrice: 20,
        },
        {
          hospitalVisitId: 'hv002',
          serviceId: 's003',
          description: 'Surgery',
          quantity: 1,
          unitPrice: 500,
        },
        {
          hospitalVisitId: 'hv003',
          serviceId: 's004',
          description: 'X-Ray',
          quantity: 1,
          unitPrice: 100,
        },
      ];
      
  return (
    <div>GenerateInvoice</div>
  )
}

export default GenerateInvoice