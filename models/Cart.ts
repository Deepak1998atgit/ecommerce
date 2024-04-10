import { Schema, model, Document, Types } from 'mongoose';
interface Product {
    price: number;
}

interface CartItem {
    productId: Types.ObjectId;
    quantity: number;
}

export interface Cart extends Document {
    userId: Types.ObjectId;
    items: CartItem[];
    totalPrice: number;
    dateAdded: Date;
    calculateTotalPrice: () => void;
}


const cartSchema = new Schema<Cart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true
    }
});


cartSchema.methods.calculateTotalPrice = async function(this: Cart) {
    let totalPrice = 0;
    await this.populate('items.productId')
    for (const item of this.items) {
        if (item.productId && 'price' in item.productId) {
            totalPrice += item.quantity * (item.productId as Product).price;
        }
    }
    this.totalPrice = totalPrice;
};


const CartModel = model<Cart>('Cart', cartSchema);
export default CartModel;

