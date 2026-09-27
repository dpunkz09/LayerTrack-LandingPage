// LayerTrack Landing Page — PM2 config (SSR mode)
//
// Astro is built with output: 'server' + @astrojs/node (standalone).
// The build produces dist/server/entry.mjs which is a self-contained
// Node.js HTTP server. Nginx proxies to it on PORT 6699.
//
// Deploy steps on the server:
//   1. git pull
//   2. npm ci
//   3. npm run build
//   4. pm2 reload ecosystem.config.cjs --env production
//
// Nginx should proxy_pass to http://127.0.0.1:6699

module.exports = {
  apps: [
    {
      name   : 'layertrack-landing',
      script : './dist/server/entry.mjs',
      cwd    : '/var/www/jpaworx.com/LayerTrack-LandingPage',

      interpreter: 'node',

      autorestart  : true,
      watch        : false,
      max_restarts : 10,
      restart_delay: 3000,
      exec_mode    : 'fork',
      instances    : 1,
    },
  ],
};
