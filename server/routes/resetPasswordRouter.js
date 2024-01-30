import express from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/resetPasswordController.js';

const resetPasswordRouter = express.Router();

resetPasswordRouter.post('/request-reset', requestPasswordReset);
resetPasswordRouter.post('/reset-password', resetPassword);

export default resetPasswordRouter;