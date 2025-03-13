module.exports = {
    apps: [
      {
        name: "webhook-api",
        script: "npm",
        args: "run start",
        cwd: "C:/lnt/lnt-webhook-api", // Thay bằng đường dẫn đúng đến thư mục dự án của bạn
        interpreter: "none", // Quan trọng: Không sử dụng Node.js để chạy npm
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  };