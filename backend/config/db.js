// Database configuration placeholder
// Replace with actual DB connection (MongoDB, PostgreSQL, etc.)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  name: process.env.DB_NAME || 'agrichain',
};

export default dbConfig;
