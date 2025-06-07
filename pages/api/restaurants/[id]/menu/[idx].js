import nc from 'next-connect';
import { connectDb } from '../../../../../lib/db';
import { Restaurant } from '../../../../../models/Restaurant';

const handler = nc();
handler.delete(async (req, res) => {
  const { id, idx } = req.query;
  await connectDb();
  const rest = await Restaurant.findById(id);
  rest.menu.splice(idx, 1);
  await rest.save();
  res.status(204).end();
});
export default handler;
