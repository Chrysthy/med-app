import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/med-app');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.once('open', function () {
    console.log('Connected to MongoDB');
});

export default db;