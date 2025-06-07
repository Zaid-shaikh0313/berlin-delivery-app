import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default function handler(req, res) {
  const file = path.join(process.cwd(), 'Data', 'german_restaurnts_2024.csv');
  const counts = {};
  fs.createReadStream(file)
    .pipe(csv())
    .on('data', row => {
      const cat = row.categoryName || 'Unknown';
      counts[cat] = (counts[cat] || 0) + 1;
    })
    .on('end', () => {
      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      res.status(200).json(sorted);
    })
    .on('error', err => {
      console.error(err);
      res.status(500).end();
    });
}
