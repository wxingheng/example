'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE,BOOLEAN } = app.Sequelize;

  const Lists = app.model.define('list', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    open_id: STRING(200),
    title: STRING(500),
    content: STRING(500),
    updated_at: DATE,
    created_at: DATE,
    done: BOOLEAN
  });

  Lists.prototype.associate = function() {
    app.model.Lists.hasMany(app.model.Post, { as: 'posts' });
  };

  return Lists;
};
