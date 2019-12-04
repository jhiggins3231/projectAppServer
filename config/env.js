const env = { // Declaring a variable and setting it to be an object
    PORT: process.env.PORT || 8080,
    DATABASE_NAME: 'RedBadge',
    DATABASE_HOST: 'localhost',
    DATABASE_USERNAME:'postgres',
    DATABASE_PASSWORD: '1qaz!QAZ',
    DATABASE_DIALECT: 'postgres',

    JWT_SECRET: 'I_AM_SECRET',
   
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  
  module.exports = env; // Exporting our obejct for user in other files

  // lines (2-11) setting up our objects key/value pairings