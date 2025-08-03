// import { pkg, urlencoded } from 'body-parser';
import express from 'express';
import { router } from './routes/router.js';
import db from './database/database.js'

const app = express();
// const { json, urlencoded } = pkg;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');

});

app.use('/', router);
