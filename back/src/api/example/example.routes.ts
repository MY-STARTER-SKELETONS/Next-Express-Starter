import { Router } from 'express';
import { wrapAsync } from '../../middleware/wrap-async.js';
import { exampleController } from './example.controller.js';

export const exampleRouter = Router();

exampleRouter.get('/', wrapAsync(exampleController.list));
exampleRouter.get('/:id', wrapAsync(exampleController.getById));
exampleRouter.post('/', wrapAsync(exampleController.create));
