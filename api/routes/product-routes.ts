import { Router } from 'express';

const router = Router();

type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

let products: Array<Product> = [];
let id = 0;

router.get('/', (req, res) => {
    res.json({ products: [] })
});

router.post('/add', (req, res) => {
    const product = req.body;

    products.push(
        { 
            id: id++, 
            name: product.name, 
            price: product.price, 
            imageUrl: product.imageUrl, 
            description: product.description 
        }
    );

    res.send("Added Product");
});

router.put('/:id/edit', (req, res) => {
    const id = Number(req.params.id);
    const index = products.findIndex(product => product.id === Number(id))
    const { name, price, imageUrl, description } = req.body;

    products[index] = {
        id,
        name,
        price,
        imageUrl,
        description
    };

    res.send("Edited Product with id " + id);
});

router.delete("/:id/delete", (req, res) => {
    const id = Number(req.params.id);

    products = products.filter(product => product.id !== id);

    res.send("Deleted Product with id " + id);
})

export default router;
