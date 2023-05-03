import express from 'express';
import cacauTrybe from './cacautrybe';

const app = express();

app.use(express.json());

app.listen(3001, () => console.log('Listening on port 3000'));

app.put('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const chocolate = await cacauTrybe.updateChocolate(Number(id), body.name, body.brandId);
  if(!chocolate) return res.status(404).json({ message: 'Chocolate not found' });
  res.status(200).json(chocolate);
});

app.get('/chocolates', async (req, res) => {
  const chocolates = await cacauTrybe.getAllChocolates();
  res.status(200).json({ chocolates });
});

app.get('/chocolates/total', async (req, res) => {
  const totalChocolates = await cacauTrybe.getTotalQuantityOfChocolates();
  res.status(200).json({ totalChocolates });
});

app.get('/chocolates/search', async (req, res) => {
  const { name } = req.query;
  const chocolates = await cacauTrybe.getChocolatesByName(String(name));
  if (!chocolates.length) return res.status(404).json({ message: 'Chocolate not found' });
  res.status(200).json({ chocolates });
});

app.get('/chocolates/:id', async (req, res) => {
  const { id } = req.params;
  // Usamos o Number para converter o id em um inteiro
  const chocolate = await cacauTrybe.getChocolateById(Number(id));
  if (!chocolate) return res.status(404).json({ message: 'Chocolate not found' });
  res.status(200).json({ chocolate });
});

app.get('/chocolates/brand/:brandId', async (req, res) => {
  const { brandId } = req.params;
  const chocolates = await cacauTrybe.getChocolatesByBrand(Number(brandId));
  res.status(200).json({ chocolates });
});

export default app;