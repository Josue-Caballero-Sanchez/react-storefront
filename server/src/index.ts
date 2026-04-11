import express, { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

dotenv.config();

const productsRouter = require("./routes/products");
const app = express();
const PORT = process.env.PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",").map(origin => origin.trim());

if (!ALLOWED_ORIGINS) {
  console.error("Missing Environment variables");
  process.exit(1);
}

// Middleware
app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(new Error(`No origin header, request rejected`));
    }
    if (ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin} is not allowed`));
  },
  credentials: true,
}));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/products', productsRouter);

// Requests
app.get("/health", (req: Request, res: Response): void => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (err.message.startsWith("CORS blocked") || err.message.startsWith("No origin header")) {
    res.status(403).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});