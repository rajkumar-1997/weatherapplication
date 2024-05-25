const dotenv = require('dotenv');
dotenv.config();
exports.PORT = process.env.PORT;
exports.DBName = process.env.DB_NAME;
exports.DBPassword = process.env.DB_PASSWORD;
exports.DBUserName = process.env.DB_USERNAME;
exports.DBHost = process.env.DB_HOST;
