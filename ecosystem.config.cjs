module.exports = {
  apps: [
    {
      name: 'layertrack',
      script: './dist/server/entry.mjs',
      cwd: '/var/www/jpaworx.com/LayerTrack-LandingPage',

      interpreter: 'node',

      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 3000,

      exec_mode: 'fork',
      instances: 1,

      // Secrets are injected at deploy time via environment variables or
      // a .env.production file that is NOT committed to source control.
      // Run:  pm2 start ecosystem.config.cjs --env production
      env_production: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: 6699,
        PUBLIC_APK_URL: 'https://github.com/dpunkz09/LayerTrack/releases/download/v1.1/LayerTrack.v.1.1.apk',
        PUBLIC_APK_NAME: 'LayerTrack.v1.1.apk',
        PUBLIC_APP_VERSION: '1.1',
        PUBLIC_APP_SIZE: '16.1 MB',
      },
    },
  ],
};
