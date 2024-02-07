import express from 'express';
import { getAll, getById, getByToken, getCategories, getProductsByQuery } from "../controllers/productController.js"
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', getAll);

productRouter.get('/categories', expressAsyncHandler(getCategories));

productRouter.get('/search', expressAsyncHandler(getProductsByQuery));

productRouter.get('/token/:token', expressAsyncHandler(getByToken));

productRouter.get('/:id', expressAsyncHandler(getById));

export default productRouter;

