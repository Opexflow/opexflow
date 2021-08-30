module.exports = {
  facebook_api_key: '2969806906408505',
  facebook_api_secret: '4e4c8607d69bec65298a406838026b89',
    // 'http://localhost:3001/api/auth/facebook/callback',
    callback_url: 'https://opexflow.com/api/auth/facebook/callback',
    host: '78.24.216.16',
    username: 'opexbetausr',
    password: 'P6y5H0e9',
    database: 'opexbetadb',
    HOSTNAME: 'http://localhost:3000',
    SERVERHOSTNAME: 'http://localhost:12345',

    github_api_key: 'a9a7ccfdbd39d66f30dc',
    github_api_secret: '8f5456e3e7fbd0772c3ac9a0061aac053c17c7e8',
    github_callback_url: 'http://localhost:3001/api/auth/github/callback',

    mongodb: {
      username: 'opexbetausr',
      password: 'P6y5H0e9',
      host: 'cluster0.o4e8w.mongodb.net',
      database: 'opexbetadb',
      collections: {
        users: "Users",
        marketplace: "Marketplace",
        proposals: "Proposals",
        chat: "Chat",
        message: "Message",
      }
    }
};
