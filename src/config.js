const dotenv = require("dotenv");

dotenv.config();

const config = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    INFURA_PATH: process.env.INFURA_PATH,
};

module.exports = config;
