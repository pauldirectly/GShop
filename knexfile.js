const path = require("path");
const BASE_PATH = path.join(__dirname, "src", "server", "db" );

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'goldshopdb',
      user:     'paul',
      password: 'wongnoi1'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory : path.join( BASE_PATH, "migrations"),
    },
    seeds: {
      directory : path.join( BASE_PATH, "seeds"),
    }
  },

  development2: {
    client: "pg",
    connection: "postgres://paul:wongnoi1@localhost:5432/goldshopdb",
    migrations: {
      directory : path.join( BASE_PATH, "migrations"),
    },
    seeds: {
      directory : path.join( BASE_PATH, "seeds"),
    }
  },

  test: {
    client: "pg",
    connection: "postgres://paul:wongnoi1@localhost:5432/goldshopdb_test",
    migrations: {
      directory : path.join( BASE_PATH, "migrations")
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
