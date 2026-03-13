import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const productsRouter = require("./routes/products");
const app = express();
const PORT = process.env.PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",").map(origin => origin.trim());


// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS?.includes(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error(`CORS blocked: ${origin} is not allowed`));
    }
  },
  credentials: true,
}));

app.use('/products', productsRouter);

// Requests
app.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});