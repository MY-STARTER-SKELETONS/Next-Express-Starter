import { Router } from 'express';
import { authRouter } from './auth/auth.routes.js';
import { exampleRouter } from './example/example.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/examples', exampleRouter);
