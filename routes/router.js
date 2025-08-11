import express from 'express';
import appointmentController from './appointmentController.js'
import doctorController from './doctorController.js'
import pacientController from './pacientController.js';
import prescriptionController from './prescriptionController.js';
import doctorService from '../services/doctorService.js';
import bcrypt from 'bcrypt';
import verifyToken from '../middleware/authMiddleware.js';

let router = express.Router();
router.get('/', (req, res) => {
    console.log('Received a GET request');
    res.status(200).json({ message: 'Received a GET request' })

});

//mapeamento do login
router.post('/login', async (req, res) => {

    try {

        const { login, password } = req.body;
        const doctor = await doctorService.getDoctorByLogin(login)

        if (!doctor) {
            return res.status(401).json({ error: 'Authentication failed!' })
        }

        const passwordMatch = await bcrypt.compare(password, doctor.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed!' })
        }

        const token = jwt.sign({ doctorId: doctor._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }

})

router.use('/', verifyToken, appointmentController);
router.use('/', verifyToken, doctorController);
router.use('/', verifyToken, pacientController);
router.use('/', verifyToken, prescriptionController);

export default router;
