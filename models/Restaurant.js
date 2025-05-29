import { Schema, models, model } from 'mongoose';
const RestaurantSchema = new Schema({
  name: String,
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
});
export const Restaurant = models.Restaurant || model('Restaurant', RestaurantSchema);
