import { Schema, model, Document } from 'mongoose';

interface Product extends Document {
    name: string;
    description?: string;
    price: number;
    images: string[];
    rating: number;
    dateAdded: Date;
}

const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const ProductModel = model<Product>('Product', productSchema);
export default ProductModel;
