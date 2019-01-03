import express from 'express';
import logger from 'morgan';
import restRouter from './api/restRouter';


const app = express();
//app.use(logger('dev'));
// app.use(express.json());
app.use('/api/v1', restRouter);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to REST API for Questioner App' });
});

// app.get('/meetups', (req, res) => {
//   res.status(200).json({ message: 'Welcome meetups' });
// });

app.listen(6000, () => {
  console.log(`APi Listerning on Port 6000`);
});

export default app;
