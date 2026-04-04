import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { apiRouter } from './api/index.js';
import { corsOptions } from './config/cors.js';
import { cookieParserSecret } from './config/cookies.js';

export const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(cookieParserSecret));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', apiRouter);
