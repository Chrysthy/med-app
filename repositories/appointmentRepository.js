import appointment from '../models/appointment.js';

const getAllAppointments = async () => {
    return await appointment.find();
}

const getAppointment = async (id) => {
    try {
        return await appointment.findById(id);

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

const updateAppointment = async (id, { date, doctorId, pacientId }) => {

    try {

        return await appointment.findByIdAndUpdate(id, { date, doctorId, pacientId }, { new: true });

    } catch (error) {
        throw new Error(error);

    }
}

const deleteAppointment = async (id) => {

    try {

        return await appointment.findByIdAndDelete(id);

    } catch (error) {
        throw new Error(error);
    }
}

const appointmentRepository = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment
}

export default appointmentRepository;