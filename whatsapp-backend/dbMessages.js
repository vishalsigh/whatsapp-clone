import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    message: String,
    name: {type: mongoose.Schema.Types.ObjectId ,
    ref: "User"},
    timestamps: true,
    received: Boolean,
})
export default mongoose.model('messagecontents', whatsappSchema);