import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import Routes from './routes/route.js';
import helmet from 'helmet'
const app = express();

dotenv.config();
app.use(helmet())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/players', Routes);

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true

}).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('server start');
  });
}).catch((err) => {
  console.log('Error: ', err.message);
});
