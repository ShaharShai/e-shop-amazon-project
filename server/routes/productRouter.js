import express from 'express';
import { getAll, getById, getByToken } from "../controllers/productController.js"
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', getAll);

productRouter.get('/:id', expressAsyncHandler(getById));

productRouter.get('/token/:token', expressAsyncHandler(getByToken));

export default productRouter;

