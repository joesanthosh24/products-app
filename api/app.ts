import express from "express";

import productRoutes from './routes/product-routes.ts';

const app = express();
const router = express.Router();

app.use(express.json());

app.use('/products', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port " + port);
})