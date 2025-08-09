import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin:  { type: Boolean, required: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next();

    try {
        const generatedSalt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, generatedSalt);
        return next();
    }
    catch(err) {
        return next(err);
    }
});

export default mongoose.model('User', userSchema);
