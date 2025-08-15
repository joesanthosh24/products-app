import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://joesanthosh:${password}@cluster0.fn7p16c.mongodb.net/ProductAppDatabase?retryWrites=true&w=majority&appName=Cluster0`;

export const connect = async () => {
    try {
        await mongoose.connect(uri);
    }
    catch (err) {
        console.error("Connection Error", err);
    }
}
