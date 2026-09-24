// Promo codes for Acme Store. Returns the discounted total, or null if the
// code is not recognized.
function applyPromo(total, code) {
  if (String(code).toLowerCase() === "welcome10") {
    return total * 0.9;
  }
  return null;
}
