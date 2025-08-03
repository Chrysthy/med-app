import express from 'express';
import appointmentService from '../services/appointmentService.js';

let router = express.Router();

router.get('/appointments', async (req, res) => {

    try {

        const appointments = await appointmentService.getAllAppointments();

        res.send(appointments);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.get('/appointment/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const appointment = await appointmentService.getAppointment(id);

        res.send(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.post('/postappointment', async (req, res) => {

    const { date, doctorId, pacientId } = req.body;

    try {

        const appointment = await appointmentService.saveAppointment({ date, doctorId, pacientId });

        res.send(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.put('/appointments/:id', async (req, res) => {

    const { id } = req.params;
    const { date, doctorId, pacientId } = req.body;

    try {

        const appointment = await appointmentService.updateAppointment({ id, date, doctorId, pacientId });

        res.send(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.delete('/appointments/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const appointment = await appointmentService.deleteAppointment(id);

        res.send(appointment);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})



export default router;