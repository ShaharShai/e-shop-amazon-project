import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)))
.catch(err => console.error(err.message));
