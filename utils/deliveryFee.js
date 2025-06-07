export function calculateDeliveryFee(distanceKm) {
  const base = 2; // base charge in euros
  const perKm = 0.5; // per kilometer rate
  const max = 15; // cap the fee
  const fee = base + distanceKm * perKm;
  return Math.min(max, Math.round(fee * 100) / 100);
}
