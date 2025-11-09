const {Sequelize} =require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port : process.env.DB_PORT,
        dialect : 'mysql',
        logging :false,
        pool: {
            max : 5, 
            min : 0,
            acquire : 30000,
            idle : 10000
        }
    }
);

// Test the connection
const testConnection = async () => {
    try{
        sequelize.authenticate();
        console.log("Database Connection Established Succesfully : ")
    }catch(err){
        console.error("Database Connection Failed : ",err.message)
        process.exit(1);
    }
}

module.exports = { sequelize, testConnection };