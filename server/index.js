import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRouter.js';
import productRouter from './routes/productRouter.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 8080;

app.use("/api/v1/seed", seedRouter);
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
})

app.use("/api/v1/products", productRouter);

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`)))
.catch(err => console.error(err.message));
