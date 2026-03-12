import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",").map(origin => origin.trim());

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

app.get('/', (req: Request, res: Response): void => {
  res.send("Hello, world from server!");
});

app.get('/products', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if(!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.send(data.products);
  }
  catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).send("Failed to fetch products");
  }
})

app.listen(PORT, (): void => {
  console.log(`Server is running on http://localhost:${PORT}`);
});