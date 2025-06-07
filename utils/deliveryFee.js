export function calculateDeliveryFee(distanceKm) {
  if (typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm <= 0) {
    return 0;
  }
  // Simple pricing: €2 base fee plus €1 per km (rounded up)
  const baseFee = 2;
  const perKm = 1;
  return baseFee + Math.ceil(distanceKm) * perKm;
}
