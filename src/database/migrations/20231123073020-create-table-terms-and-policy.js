/* eslint-disable @typescript-eslint/naming-convention */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('terms_and_policy',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
        onUpdate: Sequelize.fn('now'),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      version: {
        allowNull: false,
        type: Sequelize.STRING
      },
      terms_of_service: {
        allowNull: false,
        type: Sequelize.STRING
      },
      privacy_policy: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('terms_and_policy');
  }
};
