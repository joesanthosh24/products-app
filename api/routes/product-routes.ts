import { Router } from 'express';
import { ObjectId } from 'mongodb';

import { getDatabase } from '../db.ts';

const router = Router();

type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

router.get('/', async (req, res) => {
    try {
        const database = getDatabase();
        const products = await database.collection("products").find().toArray();

        res.json({ products });
    }
    catch(err) {
        console.error("Error fetching products from database", err);
        res.status(500).send("Server Error");
    }
});

router.post('/add', async (req, res) => {
    const product = req.body;

    try {
        const database = getDatabase();
        await database.collection("products").insertOne(product)
            .then(value => {
                console.log(value);
            })

        res.json({ message: "Added product to database" });
    }
    catch(err) {
        console.error("Error adding to database", err);
        res.status(500).send("Server Error");
    }

    res.send("Added Product");
});

router.put('/:id/edit', async (req, res) => {
    const id = req.params.id;

    try {
        const database = getDatabase();
        await database.collection("products").updateOne(
            { _id: new ObjectId(id) },
            { $set: { "price": req.body.price, "imageUrl": req.body.imageUrl } }
        )

        res.json({ message: `Updated product with id ${id}` });
    }
    catch(err) {
        console.error("Error Editing the product with id ", id);
        res.status(500).send("Server Error");
    }
});

router.delete("/:id/delete", async (req, res) => {
    const id = req.params.id;

    try {
        const database = getDatabase();
        await database.collection("products").deleteOne({ _id: new ObjectId(id) });

        res.json({ message: `Deleted product with id ${id}` });
    }
    catch(err) {
        console.error("Error Deleting the product with id ", id);
        res.status(500).send("Server Error");
    }
})

export default router;
