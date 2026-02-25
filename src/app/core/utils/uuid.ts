const HEX_LUT = new Array<string>(256);
for (let i = 0; i < 256; i++) {
  HEX_LUT[i] = (i + 0x100).toString(16).slice(1);
}

let lastTimestamp = 0n;
let sequence = 0;
let randBase = 0;

export function uuid(): string {
  const bytes = new Uint8Array(16);
  let timestamp = BigInt(Date.now());

  if (timestamp !== lastTimestamp) {
    // Novo ms → gera base aleatória de 12 bits
    randBase = crypto.getRandomValues(new Uint16Array(1))[0] & 0x0fff;
    sequence = 0;
  } else {
    sequence++;
    if (sequence > 0x0fff) {
      while (timestamp <= lastTimestamp) {
        timestamp = BigInt(Date.now());
      }
      randBase = crypto.getRandomValues(new Uint16Array(1))[0] & 0x0fff;
      sequence = 0;
    }
  }

  lastTimestamp = timestamp;

  const rand12 = (randBase + sequence) & 0x0fff;

  // Timestamp 48 bits
  bytes[0] = Number((timestamp >> 40n) & 0xffn);
  bytes[1] = Number((timestamp >> 32n) & 0xffn);
  bytes[2] = Number((timestamp >> 24n) & 0xffn);
  bytes[3] = Number((timestamp >> 16n) & 0xffn);
  bytes[4] = Number((timestamp >> 8n) & 0xffn);
  bytes[5] = Number(timestamp & 0xffn);

  // Version + 4 bits altos
  bytes[6] = 0x70 | ((rand12 >> 8) & 0x0f);

  // 8 bits baixos
  bytes[7] = rand12 & 0xff;

  const random = crypto.getRandomValues(new Uint8Array(8));

  // Variant
  bytes[8] = (random[0] & 0x3f) | 0x80;

  bytes.set(random.subarray(1), 9);

  return (
    HEX_LUT[bytes[0]] +
    HEX_LUT[bytes[1]] +
    HEX_LUT[bytes[2]] +
    HEX_LUT[bytes[3]] +
    '-' +
    HEX_LUT[bytes[4]] +
    HEX_LUT[bytes[5]] +
    '-' +
    HEX_LUT[bytes[6]] +
    HEX_LUT[bytes[7]] +
    '-' +
    HEX_LUT[bytes[8]] +
    HEX_LUT[bytes[9]] +
    '-' +
    HEX_LUT[bytes[10]] +
    HEX_LUT[bytes[11]] +
    HEX_LUT[bytes[12]] +
    HEX_LUT[bytes[13]] +
    HEX_LUT[bytes[14]] +
    HEX_LUT[bytes[15]]
  );
}
