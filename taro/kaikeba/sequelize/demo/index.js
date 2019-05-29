const Sequelize = require('sequelize');
const sequelize = new Sequelize('egg-sequelize-example-dev', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  //storage: 'path/to/database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

console.log(Sequelize.STRING)
const User = sequelize.define('users', {
  name: Sequelize.STRING,
});

sequelize.sync()
  .then(() => User.create({
    name: 'janedoe',
  }))
  .then(jane => {
    console.log(jane.toJSON());
  });
