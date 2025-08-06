import { Router } from 'express';

const router = Router();

type Product = {
    id: number,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

let products: Array<Product> = [
    {
        id: 0,
        name: 'Headphones',
        price: 115.99,
        description: 'High quality noise cancelling headphones',
        imageUrl: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg'
    },
    {
        id: 1,
        name: 'Playstation 5',
        price: 520.99,
        description: 'New generation playstation video game console',
        imageUrl: 'https://gmedia.playstation.com/is/image/SIEPDC/ps5-pro-dualsense-image-block-01-en-16aug24'
    },
    {
        id: 2,
        name: 'Wilson Basketball',
        price: 25.99,
        description: 'Wilson NCAA basketball, 23.5 inches',
        imageUrl: 'https://www.wilson.com/en-gb/media/catalog/product/article_images/WZ2007601XB_/WZ2007601XB__c835a08f8b8518d50dc06c48fabd0c08.png'
    },
    {
        id: 3,
        name: 'Vacuum Cleaner',
        price: 29.99,
        description: 'Cordless vacuum cleaner. Foldable with suction capability',
        imageUrl: 'https://m.media-amazon.com/images/I/61jidzHuW4L.jpg'
    },
    {
        id: 4,
        name: 'Michael Kors Watch',
        price: 263.99,
        description: 'Oversized Hutton Two-Tone Watch',
        imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQr9osSkcck0juIMtWTTFreTBZ5wpNN9BvxH5kX5IDZuuFSwGDVZzS_vNJX7Vrq5yIPuLWtmQhMBwZfKxfXjtLovRJJz4POvlLrh1yHMms8D4N0Re_3p0D-M5WM4tilHPqUAoBJAwM&usqp=CAc'
    }
];
let id = products.length;

router.get('/', (req, res) => {
    res.json({ products });
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
