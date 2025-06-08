import express from 'express';
import emailRoutes from './routes/emailRoutes';
import dotenv from 'dotenv';
dotenv.config();


const app = express(); 


const ragRoutes = require('./routes/rag');


app.use(express.json());
app.use('/api/rag', ragRoutes);


app.use('/api/email', emailRoutes);

export default app;
