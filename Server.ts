import express  from 'express';
import morgan from 'morgan';
import connectToMongoDB from './config/Mongodb-Connection';
import authRoutes from './routes/Auth-Routes';
import productRoutes from './routes/Product-Routes';
import cartRouter from './routes/Cart-Routes';
import cors from 'cors';
import session from 'express-session';
import configKeys from './config/configKeys';
const app = express();
app.use(cors());
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const customFormat = ':method :url :status :response-time ms - :res[content-length]';
app.use(morgan(customFormat));
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart',cartRouter);
connectToMongoDB().then(() => {
    const PORT = configKeys.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});