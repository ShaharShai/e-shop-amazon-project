import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));

app.listen(5000, () => console.log(`Listening on ${8080}`));