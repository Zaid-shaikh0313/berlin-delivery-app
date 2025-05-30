import mongoose from 'mongoose';
const MenuItemSchema = new mongoose.Schema({
  name:       String,
  description:String,
  price:      Number,
  _id:        false,            // embed, no separate id
});
const RestaurantSchema = new mongoose.Schema({
  name:        String,
  description: String,
  image:       String,
  priceRange:  String,
  address:     String,
  location:    { type: { type: String, default: 'Point' }, coordinates: [Number] },
  menu:        [MenuItemSchema], // ← new field
  createdAt:   { type: Date, default: Date.now },
});
export const Restaurant = mongoose.models.Restaurant || 
    mongoose.model('Restaurant', RestaurantSchema);
