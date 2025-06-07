const assert = require('node:assert/strict');
const { describe, it } = require('node:test');

describe('calculateDeliveryFee', () => {
  it('calculates fee with base and per km rate', async () => {
    const { calculateDeliveryFee } = await import('../utils/deliveryFee.js');
    assert.equal(calculateDeliveryFee(4), 4);
  });

  it('caps the fee at 15 euros', async () => {
    const { calculateDeliveryFee } = await import('../utils/deliveryFee.js');
    assert.equal(calculateDeliveryFee(100), 15);
  });
});
