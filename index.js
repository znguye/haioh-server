import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
