// Cart utilities for Acme Store.
function cartTotal(prices) {
  let total = 0;
  for (const p of prices) {
    total += Number(p);
  }
  return total;
}
