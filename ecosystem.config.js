module.exports = {
    apps: [{
      name: "fizzBuzz",
      script: "./server.js",
      env: {
        USER: "admin",
        PASSWORD: 'password',
        SECRET: 'myAppSecret'
      }
    }]
  }