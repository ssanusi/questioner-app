import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to REST API for Questioner App' });
});

app.listen(6000, () => {
  console.log(`APi Listerning on Port 6000`);
});

export default app;
