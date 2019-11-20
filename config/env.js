const env = { // Declaring a variable and setting it to be an object
    PORT: process.env.PORT || 3000,
    DATABASE_NAME: 'RedBadgeDatabase',
    DATABASE_HOST: 'localhost',
    DATABASE_USERNAME:'postgres',
    DATABASE_PASSWORD: 'Bluelips32',
    DATABASE_DIALECT: 'postgres',

    JWT_SECRET: 'I_AM_SECRET',
  
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  
  module.exports = env; // Exporting our obejct for user in other files

  // lines (2-11) setting up our objects key/value pairings