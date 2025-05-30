import { geocodeZip } from '../../scripts/geocodeZip';
import { connectDb } from '../../lib/db';
import { Restaurant } from '../../models/Restaurant';
import { calculateDeliveryFee } from '../../utils/deliveryFee';

export default async function handler(req, res) {
  const { zip, restId } = req.query;
  await connectDb();
  const rest = await Restaurant.findById(restId).lean();
  if (!rest) return res.status(404).end();

  const { lat: userLat, lng: userLng } = await geocodeZip(zip);
  const [restLng, restLat] = rest.location.coordinates;
  // Haversine formula
  const R = 6371; // km
  const dLat = (userLat - restLat) * Math.PI/180;
  const dLng = (userLng - restLng) * Math.PI/180;
  const a = 
    Math.sin(dLat/2)**2 +
    Math.cos(restLat*Math.PI/180)
    * Math.cos(userLat*Math.PI/180)
    * Math.sin(dLng/2)**2;
  const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const fee = calculateDeliveryFee(dist);
  res.json({ fee });
}
