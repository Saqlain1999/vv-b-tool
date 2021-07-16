const mongoose = require('mongoose')
const {
    ObjectId
} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        trim: true,
        required: true,
        maxlength: 60
    },
    description: {
        type: 'string',
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: {
        type: Number,
    },
    sold: {
        type: Number,
        default: 0,
    },
    image: {
        data: Buffer,
        contentType: String,
    },

}, {
    timestamps: true
});


module.exports = mongoose.model("Product", productSchema);