import express, { Request, Response } from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world from server!");
});

app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});