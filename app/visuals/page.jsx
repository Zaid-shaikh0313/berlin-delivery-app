'use client';
import { useEffect, useState } from 'react';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function VisualsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/category-stats')
      .then((res) => res.json())
      .then((stats) => {
        setData({
          labels: stats.map((s) => s[0]),
          datasets: [
            {
              label: 'Restaurants',
              data: stats.map((s) => s[1]),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      });
  }, []);

  if (!data) return <p className="p-8">Loading…</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Top Categories</h1>
      <Bar data={data} />
    </main>
  );
}
