// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
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
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default firebaseConfig;

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
      const pharmacyInventoryRef = collection(db, 'pharmacyInventory')
      await addDoc( pharmacyInventoryRef, item)
      
    } catch (error) {
      return error
    }
  }


  export const retrievePharmacyInventory  = async () =>{
    try{
      const pharmacyInventoryRef = collection(db, 'pharmacyInventory')
      
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
      const prescriptionsRef = collection(db, 'prescriptions');
      await addDoc(prescriptionsRef, prescription);
      console.log('Prescription added successfully');
    } catch (error) {
      console.error('Error adding prescription:', error);
      throw error; 
    }
  };


  //retrieve all prescriptions

  export const retrievePrescriptions = async () => {
    try {
      const prescriptionsRef = collection(db, 'prescriptions');
      const querySnapshot = await getDocs(prescriptionsRef);
      
      let prescriptions = [];
      querySnapshot.forEach((doc) => {

        prescriptions.push({ id: doc.id, ...doc.data() });
      });
      console.log(prescriptions);

      prescriptions = prescriptions.map(prescription=>{
        
      const formattedDate = moment(prescription.prescriptionDate.seconds * 1000).format('MM/DD/YYYY, h:mm:ss A');
    return { ...prescription, prescriptionDate:formattedDate };
    })
      
      return prescriptions;
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error; 
    }
  };





  //main inventory

  //retrieving data from the main inventory

  export const retrieveInventoryItems= async() =>{
    try {
      const inventoryRef = collection(db, 'inventory')
      
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
    const departmentNeedsRef = collection(db, 'departmentNeeds')
    await addDoc(departmentNeedsRef,{...item,department:department})
      
    } catch (error) {
      console.log(error);
    }
  }


  //manage items requested by departments

  export const retrieveDepartmentNeeds = async () =>{
    try {
      const departmentNeedsRef = collection(db, 'departmentNeeds')
      
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
      const wardsRef = collection(db, 'wards')

      await addDoc(wardsRef,ward)
   
      
    } catch (error) {
      throw error
    }
  }

  export const addBed  = async (bed) =>{
    try {
      const bedsRef = collection(db, 'beds')

      await addDoc(bedsRef,bed)
    } catch (error) {
      throw error
    }
  }

export const  retrieveWards = async () =>{
  try{

    const wardsCollection = collection(db, 'wards')
    

    const wardsSnapshot = await getDocs(wardsCollection);
  
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

    const bedCollection = collection(db, 'beds')
    

    const bedsSnapshot = await getDocs(bedCollection);
  
    const bedData = bedsSnapshot.docs.map(doc => {
        
        const data = doc.data();

        return { id: doc.id, ...data };
    });

    return bedData
  }catch(error){
    throw error
  }
}