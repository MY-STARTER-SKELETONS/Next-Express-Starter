import { Router } from 'express';
import { exampleController } from './example.controller.js';

export const exampleRouter = Router();

exampleRouter.get('/', (req, res) => {
  exampleController.list(req, res);
});
exampleRouter.get('/:id', (req, res) => {
  exampleController.getById(req, res);
});
exampleRouter.post('/', (req, res) => {
  exampleController.create(req, res);
});
