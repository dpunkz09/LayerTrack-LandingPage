// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv }      from 'vite';

// loadEnv reads .env (and .env.local etc.) into a plain object.
// mode '' loads all variables regardless of NODE_ENV or prefix.
const env = loadEnv('', process.cwd(), '');

export default defineConfig({
  site: 'https://layertrack.jpaworx.com',

  server: {
    port: parseInt(env.PORT ?? '4321', 10),
  },
});
