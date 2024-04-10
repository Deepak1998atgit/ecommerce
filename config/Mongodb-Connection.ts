import mongoose from 'mongoose';

export async function connectToMongoDB(): Promise<void> {
    try {
        const uri = 'mongodb://localhost:27017/ecommerce-project';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


export default connectToMongoDB;
