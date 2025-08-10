import mongoose from "mongoose";
import doctor from "./doctor.js";
import pacient from "./pacient.js";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {
        type: Date,
        required: [true, "Date is required"],
    },

    doctorId: {
        type: String,
        required: [true, "Doctor ID is required"],
        validate: {
            validator: function (v) {
                const id = new mongoose.Types.ObjectId(v); //convertendo uma string em objeto id para ser encontrado no banco

                return doctor.exists({ _id: id });
            },
            message: props => `Doctor ID${props.value} not found.`
        }
    },

    pacientId: {
        type: String,
        required: [true, "Pacient ID is required"],
         validate: {
            validator: function (v) {
                const id = new mongoose.Types.ObjectId(v); //convertendo uma string em objeto id para ser encontrado no banco

                return pacient.exists({ _id: id });
            },
            message: props => `Pacient ID${props.value} not found.`
        }
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const appointment = mongoose.model("Appointment", appointmentSchema);

export default appointment;