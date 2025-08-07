import express from "express";
import cors from "cors";

import { connect } from "./db.ts";
import productRoutes from './routes/product-routes.ts';

const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/products', productRoutes);

const port = process.env.PORT || 3000;

connect()
    .then(() => {
        app.listen(port, () => {
            console.log("Listening on port " + port);
        });
    })
    .catch(err => {
        console.error("Error connecting to Database", err);
    })