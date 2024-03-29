const env = { // Declaring a variable and setting it to be an object
    PORT: process.env.PORT || 3000,
    DATABASE_NAME: process.env.DATABASE_NAME || 'RedBadge',
    DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
    DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'postgres',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'Bluelips32',
    DATABASE_DIALECT:  process.env.DATABASE_DIALECT || 'postgres',

    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:Bluelips32@localhost/RedBadgeDatabase',

    JWT_SECRET: process.env.JWT_SECRET || 'JUST_STAY_CLOSE_TO_THE_WATER',
  
    NODE_ENV: process.env.NODE_ENV || 'development',
  };
  
  module.exports = env; // Exporting our obejct for user in other files

  // lines (2-11) setting up our objects key/value pairings