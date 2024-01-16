import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

// app.post('/addUser', routes);

mongoose.connect("mongodb+srv://shahar:12345@e-shop.r1l6bex.mongodb.net/e-shop-amazon-project?retryWrites=true&w=majority")
.then(() => app.listen(5000, () => console.log(`Listening on ${5000}`)))
.catch(err => console.error(err));
