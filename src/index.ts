import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';
import Routes from './routes';
import ErrorHandler from './middlewares/error_handler';
import path from "path";

dotenv.config();

const app: Express = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(Routes);
app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://0.0.0.0:${port}`);
});