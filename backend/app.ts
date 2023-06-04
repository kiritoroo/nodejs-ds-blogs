import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from "@util/logger";
import swaggerDocs from "@util/swagger";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT
const MODE = process.env.NODE_ENV

app.set("trust proxy", 1)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://127.0.0.1:5173'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true,
  })
);

import behavioralRouter from '@route/behavioral.route';
import creationalRouter from '@route/creational.route';
import structuralRouter from '@route/structural.route';
app.use('/api', creationalRouter);
app.use('/api', structuralRouter);
app.use('/api', behavioralRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Root Endpoint: Test API');
});

app.listen(PORT, async () => {
  logger.info(`Server is running at http://0.0.0.0:${PORT} in ${MODE} mode.`);
    swaggerDocs(app, PORT!);
});