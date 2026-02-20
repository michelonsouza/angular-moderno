import type { ProxyOptions } from 'vite';

const proxyConfig: Record<string, ProxyOptions> = {
  '/api': {
    target: 'http://localhost:3333',
    secure: false,
    changeOrigin: true,
    rewrite: path => path.replace(/^\/api/, ''),
  },
};

export default proxyConfig;
