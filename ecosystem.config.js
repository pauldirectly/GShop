

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'GShop',
      script    : 'src/server/index.js',
      // args        : ["--toto=heya coco", "-d", "1"],
      // watch       : true,
      // node_args   : "--harmony",
      merge_logs  : true,
      cwd         : "~/products/GShop/current",      
      env: {
        COMMON_VARIABLE: "true",
        NODE_ENV: "development",
        AWESOME_SERVICE_API_TOKEN: "xxx"
      },
      env_production : {
        NODE_ENV: "production",
      },

      env_staging : {
        NODE_ENV : "staging",
        TEST     : true,
      }
    
    },

    // Second application
    // {
    //   name      : 'WEB',
    //   script    : 'web.js'
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'production',
      host : '128.199.162.31',
      ref  : 'origin/master', // branch
      repo : 'https://github.com/pauldirectly/GShop.git',
      path : '/home/production/products/GShop', // Path of the application on target servers
      ssh_options: ["StrictHostKeyChecking=no"],

      // To prepare the host by installing required software (eg: git) 
      // even before the setup process starts
      // can be multiple commands separated by the character ";"
      // or path to a script on your local machine
       "pre-setup" : "echo pre-setup ; cd ~/products/GShop; rm -rf source",

      // Commands / path to a script on the host machine
      // This will be executed on the host after cloning the repository
      // eg: placing configurations in the shared dir etc
      "post-setup": "cd ~/products/GShop/current; yarn",

      // Commands to execute locally (on the same machine you deploy things)
      // Can be multiple commands separated by the character ";"
      // "pre-deploy-local" : "echo 'This is a local executed command'"

      // Commands to be executed on the server after the repo has been cloned
      // "post-deploy" : "npm install && pm2 startOrRestart ecosystem.json --env production"
      "post-deploy" : "cd ~/products/GShop/current; yarn ; pm2 startOrRestart --env production",
      
      // Environment variables that must be injected in all applications on this env
      "env"  : {
        "NODE_ENV": "production"
      }
   },
    dev : {
      user : 'node',
      host : ["212.83.163.1"],
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/development',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
