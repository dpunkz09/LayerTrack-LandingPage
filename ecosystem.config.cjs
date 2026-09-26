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

      env_production: {
        NODE_ENV : 'production',
        HOST     : '127.0.0.1',
        PORT     : 6699,

        // APK release metadata — read at RUNTIME via import.meta.env
        // in SSR mode these are real environment variables, not baked-in at build time.
        // Update here and run: pm2 reload ecosystem.config.cjs --env production
        PUBLIC_APK_URL     : 'https://github.com/dpunkz09/LayerTrack/releases/download/v1.1/LayerTrack.v.1.1.apk',
        PUBLIC_APK_NAME    : 'LayerTrack.v1.1.apk',
        PUBLIC_APP_VERSION : '1.1',
        PUBLIC_APP_SIZE    : '16.1 MB',
      },
    },
  ],
};
