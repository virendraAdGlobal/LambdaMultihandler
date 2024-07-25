// migrate-mongo-config.js

const { connectToDatabase } = require('./src/config/dbconnection');

const config = {
  mongodb: {
    // Provide a dummy URL as migrate-mongo requires it
    url: 'mongodb://localhost:27017/',

    databaseName: 'lambda',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },

    async connect() {
      // Use the connectToDatabase function to get the database instance
      const db = await connectToDatabase();
      return db;
    }
  },

  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;
