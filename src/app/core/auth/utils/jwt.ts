import { environment } from '@/environments/environment';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const SECRET = environment.NG_APP_JWT_SECRET;

// 🔹 Base64Url encode
function base64UrlEncode(input: Uint8Array): string {
  let binary = '';
  input.forEach(b => (binary += String.fromCharCode(b)));
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

// 🔹 Base64Url decode
function base64UrlDecode(input: string): Uint8Array {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = input.length % 4;
  if (pad) input += '='.repeat(4 - pad);

  const binary = atob(input);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

// 🔹 Criar chave HMAC
async function getKey() {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

// 🔐 Criar Token
export async function createToken(payload: object, expiresInSeconds = 3600): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Math.floor(Date.now() / 1000);

  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const encodedHeader = base64UrlEncode(encoder.encode(JSON.stringify(header)));

  const encodedPayload = base64UrlEncode(encoder.encode(JSON.stringify(fullPayload)));

  const data = `${encodedHeader}.${encodedPayload}`;

  const key = await getKey();

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(data));

  const signature = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${data}.${signature}`;
}

// ✅ Validar e Decodificar
export async function verifyAndDecodeToken<T>(token: string): Promise<T | null> {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const data = `${encodedHeader}.${encodedPayload}`;

    const key = await getKey();

    const signatureBytes = base64UrlDecode(signature);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes.buffer as ArrayBuffer,
      encoder.encode(data),
    );

    if (!isValid) {
      throw new Error('Assinatura inválida');
    }

    const payload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload)));

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      throw new Error('Token expirado');
    }

    return payload as T;
  } catch (error) {
    console.error('Token inválido:', error);
    return null;
  }
}
