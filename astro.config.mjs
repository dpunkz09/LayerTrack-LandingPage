// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv }      from 'vite';
import node             from '@astrojs/node';

// loadEnv reads .env into a plain object — available to this config file
// (process.env alone does NOT read .env)
const env = loadEnv('', process.cwd(), '');

export default defineConfig({
  site: 'https://layertrack.jpaworx.com',

  // SSR with Node.js standalone server
  output: 'server',
  adapter: node({ mode: 'standalone' }),

  server: {
    host: env.HOST ?? '127.0.0.1',
    port: parseInt(env.PORT ?? '6699', 10),
  },
});
