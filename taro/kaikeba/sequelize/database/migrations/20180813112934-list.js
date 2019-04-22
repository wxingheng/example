"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable("lists", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      open_id: STRING(200),
      title: STRING(500),
      content: STRING(500),
      updated_at: DATE,
      created_at: DATE,
      done: BOOLEAN
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable("lists");
  }
};
