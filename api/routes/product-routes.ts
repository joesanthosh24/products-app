import { Router } from 'express';

import Product from '../models/product.ts';
import AuditLog from '../models/audit-log.ts';
import { verifyAdmin, verifyToken } from '../middleware/auth.middleware.ts';
import { auditLog } from '../middleware/audit-log.middleware.ts';

const router = Router();

type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
};

router.get('/', verifyToken, async (req, res) => {
    try {
        const products = await Product.find({});

        res.json({ products });
    }
    catch(err) {
        console.error("Error fetching products from database", err);
        res.status(500).send({errorMsg: "Error fetching products"});
    }
});

router.post('/add', verifyAdmin, auditLog, async (req, res) => {
    const product = req.body;

    try {
        let _id: string;

        const data = await Product.insertOne(product);

        _id = data.id;

        const { name, price, imageUrl, description, isDeleted } = product;
        res.json({
            message: "Added product to database",
            _id,
            name,
            price,
            imageUrl,
            description,
            isDeleted
        });
    }
    catch(err) {
        console.error("Error adding to database", err);
        res.status(500).send({errorMsg: "Error adding product"});
    }

    res.send("Added Product");
});

router.put('/:id/edit', verifyAdmin, auditLog, async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Product.findByIdAndUpdate(id, { price: req.body.price, imageUrl: req.body.imageUrl });
        
        res.json({
            message: 'Updated product',
            id: data?.id,
            price: data?.price,
            imageUrl: data?.imageUrl
        });
    }
    catch(err) {
        console.error("Error Editing the product with id ", id);
        res.status(500).send({errorMsg: "Error Editing the product"});
    }
});

router.delete("/:id/delete", verifyAdmin, auditLog, async (req, res) => {
    const id = req.params.id;

    try {
        await Product.findByIdAndUpdate(id, { isDeleted: true });

        res.json({
            message: "Safe Deleted Product",
            id
        });
    }
    catch(err) {
        console.error("Error Safe Deleting the product with id ", id);
        res.status(500).send({errorMsg: `Error Safe Deleting the product`});
    }
})

export default router;
