const env = { // Declaring a variable and setting it to be an object
    PORT: process.env.PORT || 3000,
    DATABASE_NAME: 'RedBadge',
    DATABASE_HOST: 'localhost',
    DATABASE_USERNAME:'postgres',
    DATABASE_PASSWORD: '1qaz!QAZ',
    DATABASE_DIALECT: 'postgres',

<<<<<<< HEAD
    DATABASE_URL: 'postgresql://postgres:Bluelips32@localhost/RedBadgeDatabase',

    JWT_SECRET: 'JUST_STAY_CLOSE_TO_THE_WATER',
  
=======
    JWT_SECRET: 'I_AM_SECRET',
   
>>>>>>> fb1a684a7cb50da9f6e03b9ba68a7fa10ce646c3
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  
  module.exports = env; // Exporting our obejct for user in other files

  // lines (2-11) setting up our objects key/value pairings