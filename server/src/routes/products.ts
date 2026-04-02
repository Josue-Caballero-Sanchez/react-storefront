import express, { Request, Response } from 'express';
const router = express.Router();

module.exports = router;

router.get('/', async (req: Request, res: Response): Promise<void> => {
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
});

router.get('/search/:searchInput', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/search?q=${req.params.searchInput}`);

    if (!response.ok) {
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

router.get('/product/:productId', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${req.params.productId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.send(data);
  }
  catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).send("Failed to fetch product");
  }
})

router.get('/:category', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${req.params.category}`);

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
});