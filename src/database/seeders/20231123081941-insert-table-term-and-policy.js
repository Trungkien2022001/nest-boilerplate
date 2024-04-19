'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('terms_and_policy', [
      {
        version: 'v1',
        terms_of_service: 'https://www.termsfeed.com/public/uploads/2021/12/sample-terms-of-service-template.pdf',
        privacy_policy: 'https://termly.io/wp-content/uploads/Privacy-Policy-Free-Template_PDF-1.pdf'
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
