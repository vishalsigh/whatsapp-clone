import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: Number, required: true},
    password: {type: String, required: true},
})
export default mongoose.model('User', userSchema);