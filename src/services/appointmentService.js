import appointmentRepository from "../repositories/appointmentRepository.js";

const getAllAppointments = async (id) => {
    return await appointmentRepository.getAllAppointments(id);
}

const getAppointment = async (id) => {
    return await appointmentRepository.getAppointment(id);
}

const saveAppointment = async ({ date, doctorId, pacientId }) => {
    return await appointmentRepository.saveAppointment({ date, doctorId, pacientId });
}

const updateAppointment = async (id, data) => {
    return await appointmentRepository.updateAppointment(id, data);
}

const deleteAppointment = async (id) => {
    return await appointmentRepository.deleteAppointment(id);
}


const appointmentService = {
    getAllAppointments,
    getAppointment,
    saveAppointment,
    updateAppointment,
    deleteAppointment

};

export default appointmentService;
