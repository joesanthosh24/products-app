import express from "express";

const app = express();
const router = express.Router();

app.get('/', (req, res) => {
    res.send("Hello");
});

const port = 3000;
app.listen(port, () => {
    console.log("Listening on port " + port);
})