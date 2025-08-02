import express from 'express';
import appointmentController from './appointmentController.js'
import doctorController from './doctorController.js'
import patientController from './patientController.js';
import prescriptionController from './prescriptionController.js';

let router = express.Router();
router.get('/', (req, res) => {
    console.log('Received a GET request');
    res.status(200).json({ message: 'Received a GET request' })

});

router.use('/', appointmentController);
router.use('/', doctorController);
router.use('/', patientController);
router.use('/', prescriptionController);

export default router;
