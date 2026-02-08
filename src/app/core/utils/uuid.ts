export function uuid(): string {
  const now = BigInt(Date.now());

  // 48 bits de timestamp (ms)
  const timeHigh = Number((now >> 16n) & 0xffffn);
  const timeLow = Number(now & 0xffffn);

  // 74 bits de random
  const randA = crypto.getRandomValues(new Uint8Array(10));

  // version (0111)
  randA[0] = (randA[0] & 0x0f) | 0x70;

  // variant (10xx)
  randA[2] = (randA[2] & 0x3f) | 0x80;

  return (
    timeHigh.toString(16).padStart(4, '0') +
    timeLow.toString(16).padStart(4, '0') +
    '-' +
    randA[0].toString(16).padStart(2, '0') +
    randA[1].toString(16).padStart(2, '0') +
    '-' +
    randA[2].toString(16).padStart(2, '0') +
    randA[3].toString(16).padStart(2, '0') +
    '-' +
    randA[4].toString(16).padStart(2, '0') +
    randA[5].toString(16).padStart(2, '0') +
    '-' +
    randA.slice(6).reduce((acc, b) => acc + b.toString(16).padStart(2, '0'), '')
  );
}
