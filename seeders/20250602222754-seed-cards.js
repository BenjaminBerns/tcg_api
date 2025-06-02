'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cards', null, {});
    await queryInterface.bulkInsert('cards', [
      { id: 1, name: "Bulbizarre", rarity: "common" },
      { id: 4, name: "Salamèche", rarity: "common" },
      { id: 7, name: "Carapuce", rarity: "common" },
      { id: 20, name: "Sablaireau", rarity: "common" },
      { id: 28, name: "Nosferalti", rarity: "common" },
      { id: 30, name: "Pikachu", rarity: "rare" },
      { id: 38, name: "Poussifeu", rarity: "rare" },
      { id: 45, name: "Racaillou", rarity: "rare" },
      { id: 86, name: "Tiplouf", rarity: "rare" },
      { id: 95, name: "Tortipousse", rarity: "rare" },
      { id: 150, name: "Mewtwo", rarity: "legendary" },
      { id: 180, name: "Lugia", rarity: "legendary" },
      { id: 200, name: "Kyogre", rarity: "legendary" },
      { id: 201, name: "Groudon", rarity: "legendary" },
      { id: 202, name: "Rayquaza", rarity: "legendary" }
    ]);
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkInsert('users', [
      { id: 1, username: "admin", password: "admin", token: null, lastBooster: 0, currency: 0 }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('cards', null, {});
  }
};
