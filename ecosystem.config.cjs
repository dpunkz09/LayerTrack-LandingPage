// LayerTrack Landing Page — PM2 config
//
// This is a STATIC Astro site (output: 'static').
// Nginx serves the built files directly from /dist — no Node.js server runs.
//
// PM2 is used here only to keep a lightweight watcher alive that can:
//   - restart itself if crashed
//   - be managed alongside other PM2 apps on the same server
//
// Deploy steps on the server:
//   1. git pull
//   2. npm ci
//   3. npm run build           ← writes static files to dist/
//   4. pm2 reload ecosystem.config.cjs --env production   ← (no-op, just updates env)
//   5. nginx reloads automatically (or: sudo systemctl reload nginx)
//
// There is NO dist/server/entry.mjs — that file only exists for SSR builds.

module.exports = {
  apps: [
    {
      name: 'layertrack-landing',

      // 'serve' mode — PM2's built-in static file server.
      // This is a safety fallback; nginx should be the primary server.
      script: 'serve',
      args: 'dist',

      // Required for pm2's 'serve' module
      env: {
        PM2_SERVE_PATH: 'dist',
        PM2_SERVE_PORT: 6699,
        PM2_SERVE_SPA : 'false',   // NOT a SPA — use 404 for missing routes
        PM2_SERVE_HOMEPAGE: '/index.html',
      },

      // Production env — also passed through to the 'serve' process
      env_production: {
        NODE_ENV       : 'production',
        PM2_SERVE_PATH : 'dist',
        PM2_SERVE_PORT : 6699,
        PM2_SERVE_SPA  : 'false',

        // APK release metadata — read by Astro at BUILD TIME via import.meta.env.
        // Changing these here has no effect on already-built files.
        // Re-run `npm run build` after updating these values.
        PUBLIC_APK_URL     : 'https://github.com/dpunkz09/LayerTrack/releases/download/v1.1/LayerTrack.v.1.1.apk',
        PUBLIC_APK_NAME    : 'LayerTrack.v1.1.apk',
        PUBLIC_APP_VERSION : '1.1',
        PUBLIC_APP_SIZE    : '16.1 MB',
      },

      autorestart  : true,
      watch        : false,
      max_restarts : 10,
      restart_delay: 3000,
      exec_mode    : 'fork',
      instances    : 1,
    },
  ],
};
