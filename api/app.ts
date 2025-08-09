import express from "express";
import cors from "cors";

import { connect } from "./db.ts";
import productRoutes from './routes/product-routes.ts';
import authRoutes from './routes/auth-routes.ts';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/products', productRoutes);
app.use('/auth', authRoutes);

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
