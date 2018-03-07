
const path = require("path");
const BASE_PATH = path.join(__dirname, "src", "server", "db" );

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_NAME || 'no_db_name',
      user:     process.env.DATABASE_USER || 'no_db_user',
      password: process.env.DATABASE_PASSWORD || 'no_db_password'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory : path.join( BASE_PATH, "migrations"),
    },
    seeds: {
      directory : path.join( BASE_PATH, "seeds"),
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: `${process.env.DATABASE_NAME}_test` || 'no_db_name',
      user:     process.env.DATABASE_USER || 'no_db_user',
      password: process.env.DATABASE_PASSWORD || 'no_db_password'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory : path.join( BASE_PATH, "migrations"),
    },
    seeds: {
      directory : path.join( BASE_PATH, "seeds"),
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
