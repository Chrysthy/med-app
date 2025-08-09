import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pacientSchema = new Schema({

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
         validate: {
            validator: function (v) {
                return /\d{2} 9\d{4}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please use the following format: XX 9XXXX-XXXX`
        }
    },

    createAt: {
        type: Date,
        default: Date.now,
    }

});

const pacient = mongoose.model("Pacient", pacientSchema);

export default pacient;