'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    open_id: STRING(100),
    token: STRING(500)
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts' });
  };

  return User;
};
