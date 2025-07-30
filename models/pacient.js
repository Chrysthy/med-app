import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({
    
    pacientId: {
        type: String,
        required: [true, "Pacient ID is required"],
    },

    name: {
        type: String,
        required: [true, "Pacient name is required"],
    },

    birthDate: {
        type: Date,
        required: [true, "Birth date is required"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },

    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: true,
    },

    createAt: {
        type: Date,
        default: Date.now,
    }

});

const pacient = mongoose.model("Pacient", pacientSchema);

export default pacient;