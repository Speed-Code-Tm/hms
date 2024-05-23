// Import the functions you need from the SDKs you need
import  firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment/moment";




const firebaseConfig = {
    apiKey: "AIzaSyClrrTa3zFjkX5Qg85F5V9GtTxRyqL7cLM",
    authDomain: "hmsk-5be24.firebaseapp.com",
    projectId: "hmsk-5be24",
    storageBucket: "hmsk-5be24.appspot.com",
    messagingSenderId: "611583456298",
    appId: "1:611583456298:web:a1bafa5b565d5a1fce7f53",
    measurementId: "G-6WYRMK8FC7"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default firebaseConfig;

//function to get the id of a collection
const hospitalRef = firebase.firestore().collection('Client_Hospitals').doc('ynrFkJkgKLVweVrHTKJF');


async function getCollectionId(hospitalRef, collectionName){
  const querySnapshot = await hospitalRef.collection(collectionName).get();
  if (!querySnapshot.empty) {
    // Assuming there is only one document in the Procurement collection
    const collectionDoc = querySnapshot.docs[0];
    const collectionId = collectionDoc.id
    return collectionId;
  } else {
    throw new Error(`No ${collectionName} document found`);
  }
}




//crud functions

export const createHospitalVisit = async (personalInfo, hospitalVisitData) => {
    try {
      const hospitalVisitsRef = collection(db, "hospitalVisits");
      const newHospitalVisit = {
        personalInfo,
        visits: [hospitalVisitData],
      };
      const docRef = await addDoc(hospitalVisitsRef, newHospitalVisit);
      console.log("Hospital visit document created with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding hospital visit: ", e);
    }
  };
  
  // Read all hospital visits for a patient
  export const getHospitalVisits = async (patientId) => {
    try {
      const hospitalVisitsRef = collection(db, "hospitalVisits");
      const querySnapshot = await getDocs(hospitalVisitsRef);
      const hospitalVisits = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return hospitalVisits.filter(
        (visit) => visit.personalInfo.nationalId === patientId
      );
    } catch (e) {
      console.error("Error getting hospital visits: ", e);
      return [];
    }
  };
  
  // Update an existing hospital visit
  export const updateHospitalVisit = async (hospitalVisitId, updatedData) => {
    try {
      const hospitalVisitRef = doc(db, "hospitalVisits", hospitalVisitId);
      await updateDoc(hospitalVisitRef, updatedData);
      console.log("Hospital visit document updated successfully");
    } catch (e) {
      console.error("Error updating hospital visit: ", e);
    }
  };
  
  // Delete a hospital visit
  export const deleteHospitalVisit = async (hospitalVisitId) => {
    try {
      const hospitalVisitRef = doc(db, "hospitalVisits", hospitalVisitId);
      await deleteDoc(hospitalVisitRef);
      console.log("Hospital visit document deleted successfully");
    } catch (e) {
      console.error("Error deleting hospital visit: ", e);
    }
  };

  // Create or update vital signs for a hospital visit
export const updateVitalSigns = async (hospitalVisitId, vitalSigns) => {
    try {
      const hospitalVisitRef = doc(db, "hospitalVisits", hospitalVisitId);
      await updateDoc(hospitalVisitRef, { "visits.$.vitalSigns": vitalSigns });
      console.log("Vital signs updated successfully");
    } catch (e) {
      console.error("Error updating vital signs: ", e);
    }
  };
  
  // CRUD functions for bloodSugarLog
  
 


  //manage pharmacy inventory

  // adding a new inventory item

  export const addPharmacyInventoryItem = async(item) =>{
    try {
      const pharmacyId = await getCollectionId(hospitalRef, 'Pharmacy')

      const pharmacyInventoryRef = hospitalRef.collection('Pharmacy').doc(pharmacyId).collection('pharmacyInventory');
     
      await pharmacyInventoryRef.add(item)
    
      
    } catch (error) {
      return error
    }
  }


  export const retrievePharmacyInventory  = async () =>{
    try{

      const pharmacyId = await getCollectionId(hospitalRef, 'Pharmacy')

      const pharmacyInventoryRef = hospitalRef.collection('Pharmacy').doc(pharmacyId).collection('pharmacyInventory');
              
      const pharmacyInventorySnapshot = await getDocs(pharmacyInventoryRef);

      const pharmacyInventoryData = pharmacyInventorySnapshot.docs.map(doc => {
          
          const data = doc.data();

          return { id: doc.id, ...data };
      });


      return pharmacyInventoryData
    }catch(error){
      return error
    }
  }


  // create prescription to  be moved to doctor

  export const addPrescription = async (prescription) => {
    try {
      const pharmacyId = await getCollectionId(hospitalRef, 'Pharmacy')

      const prescriptionsRef = hospitalRef.collection('Pharmacy').doc(pharmacyId).collection('prescriptions')
      await prescriptionsRef.add(prescription);
      console.log('Prescription added successfully');
    } catch (error) {
      console.error('Error adding prescription:', error);
      throw error; 
    }
  };

  //retrieve all prescriptions

  export const retrievePrescriptions = async () => {
    try {
      const pharmacyId = await getCollectionId(hospitalRef, 'Pharmacy')

      const prescriptionsRef = hospitalRef.collection('Pharmacy').doc(pharmacyId).collection('prescriptions')
      const querySnapshot = await getDocs(prescriptionsRef);
      
      let prescriptions = [];
      querySnapshot.forEach((doc) => {

        prescriptions.push({ id: doc.id, ...doc.data() });
      });
      console.log(prescriptions);

      prescriptions = prescriptions.map(prescription=>{
        
      const formattedDate = moment(prescription?.prescriptionDate?.seconds * 1000).format('MM/DD/YYYY, h:mm:ss A');
    return { ...prescription, prescriptionDate:formattedDate };
    })
      
      return prescriptions;
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error; 
    }
  };





  //main inventory

  //vendor management

  // fetch vendors

  export const retrieveVendors =  async () =>{

    try{
      const procurementId =  await getCollectionId(hospitalRef, 'Procurement')
    
      const vendorsRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendors');
  
   const vendorsSnapshot = await getDocs(vendorsRef);
    const vendorsData = vendorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));

    return vendorsData
    }catch(error){
      throw error
    }

   
  }

  //add vendor


  export const addVendor  = async (vendor) =>{
    try{
      const procurementId =  await getCollectionId(hospitalRef, 'Procurement')
    
      const vendorRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendors');
  
      vendorRef.add(vendor)
  

    }catch(error){

      throw error
    }    
    
  }


  //update vendor

  export const updateVendor = async (vendorId, formData) =>{
    try{
      const procurementId = await getCollectionId(hospitalRef, 'Procurement');
      const vendorRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendors').doc(vendorId);
      await vendorRef.update(formData);
      console.log('Vendor updated successfully');
    }catch(error){
      throw error
    }
  }

  //delete vendor

  export const deleteVendor = async (vendorId) =>{
    try{
      const procurementId = await getCollectionId(hospitalRef, 'Procurement');
    const vendorRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendors').doc(vendorId);
    const vendorItemsRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendorItems').where('vendorId', '==', vendorId);

    const batch = firebase.firestore().batch();

    // Get all vendorItems linked to the vendor
    const snapshot = await vendorItemsRef.get();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete the vendor doc
    batch.delete(vendorRef);

    // Commit batch
    await batch.commit();
    }
    catch(error){
     throw error
    }
  }

  //add vendor item

  export const addVendorItem = async (vendorItem) =>{
    try{
      const procurementId = await getCollectionId(hospitalRef, 'Procurement');
      const vendorItemRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendorSupplies')
      
      vendorItemRef.add(vendorItem)
    }catch(error){
      throw error
    }
  }

  //update vendor item

  export const updateVendorItem = async (itemId,formData) =>{
    try{
      const procurementId = await getCollectionId(hospitalRef, 'Procurement');
    const vendorItemRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendorSupplies').doc(itemId);

    await vendorItemRef.update(formData);

    }catch(error){
      throw error
    }
  }


  //delete vendor item

  export const deleteVendorItem =  async(item)=>{
   try {
    const procurementId = await getCollectionId(hospitalRef, 'Procurement');
    const vendorItemsRef = hospitalRef.collection('Procurement').doc(procurementId).collection('vendorSupplies').doc(item);

    await vendorItemsRef.delete();
   } catch (error) {
    throw error
   }
  }



  // retrieve vendor items

  export const retrieveVendorItems  = async () =>{

    try{
        const procurementId = await getCollectionId(hospitalRef, 'Procurement');
        const vendorItemsCollection = hospitalRef.collection('Procurement').doc(procurementId).collection('vendorSupplies');
        const vendorsCollection = hospitalRef.collection('Procurement').doc(procurementId).collection('vendors');
    
        const vendorItemsSnapshot = await vendorItemsCollection.get();
        const vendorItemsData = await Promise.all(
          vendorItemsSnapshot.docs.map(async (doc) => {
            const vendorItemData = { id: doc.id, ...doc.data() };
            const vendorQuery = vendorsCollection.where('__name__', '==', vendorItemData.vendorId);
            const vendorSnapshot = await vendorQuery.get();
            const vendorData = vendorSnapshot.docs[0]?.data();
            return { ...vendorItemData, vendor: vendorData?.name || 'Unknown Vendor' };
          })
        );
    
        return vendorItemsData;
    }catch(error){
      throw error
    }
  }




  //retrieving data from the main inventory

  export const retrieveInventoryItems= async() =>{
    try {

      const procurementId =  await getCollectionId(hospitalRef, 'Procurement')
    
      const inventoryRef = hospitalRef.collection('Procurement').doc(procurementId).collection('inventory');
      
      
      const inventorySnapshot = await getDocs(inventoryRef);
  
      const inventoryData = inventorySnapshot.docs.map(doc => {
          
          const data = doc.data();
  
          return { id: doc.id, ...data };
      });
  
      return inventoryData
      
    } catch (error) {
      return error
    }
   
  }

  //requesting an item from procurement

 export const requestItem = async (item, department) =>{

    try {
    // const departmentNeedsRef = collection(db, 'departmentNeeds')

    // get parent collection document id
    const procurementId =  await getCollectionId(hospitalRef, 'Procurement')
    
    const departmentNeedsRef = hospitalRef.collection('Procurement').doc(procurementId).collection('departmentNeeds');
    
    
      await departmentNeedsRef.add({...item,department:department})
      
    } catch (error) {
      console.log(error);
    }
  }


  //manage items requested by departments

  export const retrieveDepartmentNeeds = async () =>{
    try {
     
      const procurementId = await getCollectionId(hospitalRef, 'Procurement')

      const departmentNeedsRef = hospitalRef.collection('Procurement').doc(procurementId).collection('departmentNeeds');
         
      const departmentNeedsSnapshot = await getDocs(departmentNeedsRef);
  
      const departmentNeedsData = departmentNeedsSnapshot.docs.map(doc => {
          
          const data = doc.data();
  
          return { id: doc.id, ...data };
      });
  
      return departmentNeedsData
      
    } catch (error) {
      console.log(error);
    }
  }


  //inpatient management

  //1 ward management

  export const addWard = async(ward) =>{
    try {
      const inpatientId = await getCollectionId(hospitalRef, 'Inpatient')

    const wardRef = hospitalRef.collection('Inpatient').doc(inpatientId).collection('wards');
  
      await wardRef.add(ward)
      
    } catch (error) {
      throw error
    }
  }

  export const addBed  = async (bed) =>{
    try {
      const inpatientId = await getCollectionId(hospitalRef, 'Inpatient')

    const bedRef = hospitalRef.collection('Inpatient').doc(inpatientId).collection('beds');
  
      await bedRef.add(bed)
    } catch (error) {
      throw error
    }
  }

export const  retrieveWards = async () =>{
  try{

    const inpatientId = await getCollectionId(hospitalRef, 'Inpatient')

    const wardRef = hospitalRef.collection('Inpatient').doc(inpatientId).collection('wards');
  
    const wardsSnapshot = await getDocs(wardRef);
  
    const wardsData = wardsSnapshot.docs.map(doc => {
        
        const data = doc.data();

        return { id: doc.id, ...data };
    });

    return wardsData
  }catch(error){
    throw error
  }
}


export const  retrieveBeds = async () =>{
  try{

    const inpatientId = await getCollectionId(hospitalRef, 'Inpatient')

    const bedRef = hospitalRef.collection('Inpatient').doc(inpatientId).collection('beds');
  
    const bedsSnapshot = await getDocs(bedRef);
  
    const bedData = bedsSnapshot.docs.map(doc => {
        
        const data = doc.data();

        return { id: doc.id, ...data };
    });

    return bedData
  }catch(error){
    throw error
  }
}

export const addExpense = async (expense) =>{
  try {
    const accountsId = await getCollectionId(hospitalRef, 'Financials')

    const expensesRef = hospitalRef.collection('Financials').doc(accountId).collection('expenses');
  
  
    await expensesRef.add(expense)

  } catch (error) {
    throw error
  }
}

export const retrieveExpenses = async () =>{
  try {
    const accountsId = await getCollectionId(hospitalRef, 'Financials')

    const expensesRef = hospitalRef.collection('Financials').doc(accountsId).collection('expenses');
   

    const expenseSnapshot = await getDocs(expensesRef);
  
    const expenseData = expenseSnapshot.docs.map(doc => {
        
        const data = doc.data();

        return { id: doc.id, ...data };
    });

    return expenseData
  } catch (error) {
    throw error
    
  }
}

export const addBudget = async (budget) =>{

  try {


    const accountsId = await getCollectionId(hospitalRef, 'Financials')

    const budgetsRef = hospitalRef.collection('Financials').doc(accountsId).collection('budgets');
   
  budgetsRef.add(budget)
  } catch (error) {
     throw error
  } 

}


export const retrieveBudgets = async () =>{
  try {
    const accountsId = await getCollectionId(hospitalRef, 'Financials')

    const budgetsRef = hospitalRef.collection('Financials').doc(accountsId).collection('budgets');
   
    const budgetSnapshot = await getDocs(budgetsRef);
  
    let budgetData = budgetSnapshot.docs.map(doc => {
        
        const data = doc.data();

        return { id: doc.id, ...data };
    });

    budgetData = budgetData.map(item=>{
        console.log(item);
      const formattedStartDate = moment(item.startDate.seconds * 1000).format('MM/DD/YYYY');
      const formattedEndDate = moment(item.endDate.seconds * 1000).format('MM/DD/YYYY');

    return { ...item, startDate:formattedStartDate,endDate:formattedEndDate };
    })

    return budgetData
  } catch (error) {
    throw error
  }
}


// lab management 

export const addLabTest = async(labtest) =>{
  try{
    const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

    const testsCatalogueRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('testsCatalogue');
   
    await testsCatalogueRef.add(labtest)

  }catch(error){
    throw error
  }
}

//update labtest

export const updateLabTest  = async(testId,labtest) =>{
  try {
    const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

  const testRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('testsCatalogue').doc(testId);
 
  await testRef.update(labtest)
  } catch (error) {
    throw error
  }
  
}

// delete test catalogue

export const deleteTestCatalogue = async (testId) =>{
  try {
    const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

    const testRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('testsCatalogue').doc(testId);
  
    await testRef.delete()
  } catch (error) {
    throw error
  }
}



//retrieve test catalogues
export const retrieveLabTestCatalogue = async () =>{

  const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

  const testsCatalogueRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('testsCatalogue');
 
  const testsCatalogueSnapshot = await getDocs(testsCatalogueRef, db)

  let testsCatalogueData = testsCatalogueSnapshot.docs.map(doc => {
        
    const data = doc.data();

    return { id: doc.id, ...data };
});

return testsCatalogueData

}

//retrieve lab orders

export const retrieveLabOrders = async () =>{
  try {
    const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

    const labOrdersRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('labTestOrders');
 
    const labOrdersSnapshot = await labOrdersRef.get()

   const labOrdersData = labOrdersSnapshot.docs.map(doc=>{
      const data = doc.data();

    return { id: doc.id, ...data };
    })
    
    return labOrdersData
  } catch (error) {
    throw error
  }
}

//update lab result 

export const updateLabTestResult  = async (orderId,labresult) =>{
  try{
    const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

    const labOrderRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('labTestOrders').doc(orderId);
 
    labOrderRef.update(labresult)
  }catch(error){
    throw error
  }
}

//drop labtest

export const deleteLabTest  = async (orderId) =>{
  try{
    const laboratoryId = await getCollectionId(hospitalRef, 'Laboratory')

    const labOrderRef = hospitalRef.collection('Laboratory').doc(laboratoryId).collection('labTestOrders').doc(orderId);
 
    labOrderRef.delete()
  }catch(error){
    throw error
  }
}