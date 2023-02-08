const bcrypt = require('bcryptjs');
const { createHmac } = require('crypto');

const SALT_ROUND = 10;

const hash = (plaintext) => {
  return bcrypt.hashSync(plaintext, SALT_ROUND);
};

const compareHash = (plaintext, hashed) => {
  return bcrypt.compareSync(plaintext, hashed);
};

const createAuthorization = (clientId, serverKey) => {
  return Buffer.from(`${clientId}:${serverKey}`).toString('base64');
};

const timingSafeEqual = (a, b) => {
  if (!Buffer.isBuffer(a)) return false;

  if (!Buffer.isBuffer(b)) return false;

  if (a.length !== b.length) return false;

  const len = a.length;
  let out = 0;
  let i = -1;

  // eslint-disable-next-line no-plusplus
  while (++i < len) {
    // eslint-disable-next-line no-bitwise
    out |= a[i] ^ b[i];
  }

  return out === 0;
};

const verifyAuthorization = (payload, clientId, serverKey) => {
  const base = Buffer.from(`${clientId}:${serverKey}`).toString('base64');
  return timingSafeEqual(Buffer.from(payload, 'base64'), Buffer.from(base, 'base64'));
};

const createSignature = (payload, secretKey) => {
  const hmac = createHmac('SHA256', secretKey);
  const auth = hmac.update(payload).digest();
  return auth.toString('hex');
};

const verifySignature = (signature, payload, secretKey) => {
  const hmac = createHmac('SHA256', secretKey);
  const auth = hmac.update(payload).digest('hex');
  return timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(auth, 'hex'));
};

module.exports = {
  hash,
  compareHash,
  createAuthorization,
  verifyAuthorization,
  createSignature,
  verifySignature,
};
