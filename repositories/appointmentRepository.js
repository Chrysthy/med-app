import { Appointment } from '../models/appointment.js';

const getAllAppointments = async () => {
    return await Appointment.find();
}

const getAppointments = async (id) => {
    try {
        return await Appointment.findById(id);

    } catch (error) {
        throw new Error(error);
    }
}

const saveAppointment = async ({ date, doctorId, pacientId }) => {

    try {

        const prescription = new Appointment({ date, doctorId, pacientId });

        return await prescription.save();

    } catch (error) {
        throw new Error(error);
    }

}



const appointmentRepository = {

}

export default appointmentRepository;