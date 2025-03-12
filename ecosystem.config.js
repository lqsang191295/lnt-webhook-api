module.exports = {
    apps: [
      {
        name: "webhook-api",
        script: "npm",
        args: "run start",
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "500M",
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  };
  