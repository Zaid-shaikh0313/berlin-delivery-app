// scripts/seed-restaurants.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const { geocodeZip } = require('./geocodeZip');

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ Missing MONGODB_URI in .env.local');
    process.exit(1);
  }
  await mongoose.connect(uri);
}

// Define the Restaurant schema inline (so we don't import your Next.js model)
const RestaurantSchema = new mongoose.Schema({
  name:        String,
  description: String,
  image:       String,
  priceRange:  String,
  address:     String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [lng, lat]
  },
  menu:        Array,
  createdAt:   { type: Date, default: Date.now },
});

// Use existing model if present, or create a new one
const Restaurant = mongoose.models.Restaurant ||
                   mongoose.model('Restaurant', RestaurantSchema);

async function seed() {
  await connectDb();

  const filePath = path.join(__dirname, '..', 'data', 'german_restaurnts_2024.csv');
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', row => rows.push(row))
    .on('end', async () => {
      console.log(`Seeding ${rows.length} restaurants…`);
      for (const r of rows) {
        // Try geocoding if you have a postalCode column
        let loc;
        if (r.postalCode) {
          const { lat, lng } = await geocodeZip(r.postalCode);
          loc = { type: 'Point', coordinates: [lng, lat] };
        }

        await Restaurant.create({
          name:        r.title,
          description: r.categoryName || '',
          image:       '',               // fill later
          priceRange:  r.price || '',
          address:     `${r.street}, ${r.city}`,
          location:    loc,
          menu:        [],               // fill later
        });
      }
      console.log('✅ Seeding complete');
      process.exit(0);
    });
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
