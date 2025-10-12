module.exports = {
  apps: [
    {
      name: 'yolube-webapp',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        BROWSER: 'none'
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      cwd: '/home/user/webapp'
    }
  ]
}