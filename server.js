import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import Routes from './routes/route.js';
const app = express();

dotenv.config();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/players', Routes);

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true

}).then(() => {
  app.listen($PORT || 3000, () => {
    console.log('server start');
  });
}).catch((err) => {
  console.log('Error: ', err.message);
});
