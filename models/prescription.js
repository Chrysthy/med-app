import mongoose from "mongoose";
import appointment from "./appointment";

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    
    prescriptionId: {
        type: String,
        required: [true, "Prescription Id is required"],
    },

    date: {
        type: Date,
        required: [true, "Date is required"]
    },

    appointment: {
        type: String,
        required: [true, "Appointment is required"],
    },

    medicine: {
        type: String,
        required: [true, "Medicine is required"],
    },

    dosage: {
        type: String,
        required: [true, "Dosage is required"],
    },

    instructions: {
        type: String,
        required: [true, "Instructions are required"],
    },

    createAt: {
        type: Date,
        default: Date.now,
    }

});

const prescription = mongoose.model("Prescription", prescriptionSchema);

export default prescription;