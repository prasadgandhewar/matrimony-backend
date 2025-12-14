import "dotenv/config";
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import helmet from 'helmet';
import bootstrapDB from './core/dbInitalize.js';
import "./core/redis.js";
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRoutes);

bootstrapDB();


app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
});