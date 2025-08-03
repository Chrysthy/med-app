import prescription from "../models/prescription.js"

const getAllPrescriptions = async () => {
    try{
        return await prescription.find();
    }catch(error){
        throw new Error(error);
    }
}

const getPrescription = async (id) => {
    try{
        return await prescription.findById(id);
    }catch(error){
        throw new Error(error);
    }
}

const savePrescription = async ({ date, appointmentId, medicine, dosage, instructions }) => {
    try{
        const newPrescription = new prescription({ date, appointmentId, medicine, dosage, instructions });
        return await newPrescription.save();
    }catch(error){
        throw new Error(error);
    }
}

const updatePrescription = async (id, { date, appointmentId, medicine, dosage, instructions, file }) => {
    try{
        return await prescription.findByIdAndUpdate(id,
             { date, appointmentId, medicine, dosage, instructions, file }, { new: true });
    }catch(error){
        throw new Error(error);
    }
}

const deletePrescription = async (id) => {
    try{
        return await prescription.findByIdAndDelete(id);
    }catch(error){
        throw new Error(error);
    }
}
 
const prescriptionRepository = {
    getAllPrescriptions,
    getPrescription,
    savePrescription,
    updatePrescription,
    deletePrescription
}

export default prescriptionRepository;