import doctor from '../models/doctor.js'

const getAllDoctors = async () => {
    try {
        return await doctor.find();
    } catch (error) {
        throw new Error(error);
    }
}

const getDoctor = async (id) => {
    try {
        return await doctor.findById(id);
    } catch (error) {
        throw new Error(error);
    }
}

const saveDoctor = async ({ name, login, password, medicalSpecialty, medicalRegistration, email, phone }) => {

    try {
        const newDoctor = new doctor({ name, login, password, medicalSpecialty, medicalRegistration, email, phone });

        return await newDoctor.save();

    } catch (error) {
        throw new Error(error);
    }

}

const updateDoctor = async (id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone }) => {

    try {
        return await doctor.findByIdAndUpdate(id, { name, login, password, medicalSpecialty, medicalRegistration, email, phone }, { new: true });
    } catch (error) {
        throw new Error(error);
    }
}

const deleteDoctor = async (id) => {
    try {
        return await doctor.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error);
    }

}

const getDoctorByLogin = async (login) => {
    try {
        return await doctor.findOne({ 'login': login })
    } catch (error) {
        throw new Error(error);
    }
}

const doctorRepository = {
    getAllDoctors,
    getDoctor,
    saveDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorByLogin
}

export default doctorRepository;