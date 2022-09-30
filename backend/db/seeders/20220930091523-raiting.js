/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const raitingsData = [
      { userSourceId: 1, userTargetId: 2, raiting: 6 },
      { userSourceId: 1, userTargetId: 3, raiting: 7 },
      { userSourceId: 1, userTargetId: 4, raiting: 5 },
      { userSourceId: 1, userTargetId: 5, raiting: 6 },
      { userSourceId: 2, userTargetId: 1, raiting: 4 },
      { userSourceId: 2, userTargetId: 3, raiting: 3 },
      { userSourceId: 2, userTargetId: 4, raiting: 5 },
      { userSourceId: 3, userTargetId: 2, raiting: 5 },
      { userSourceId: 3, userTargetId: 1, raiting: 7 },
      { userSourceId: 4, userTargetId: 5, raiting: 5 },
      { userSourceId: 4, userTargetId: 2, raiting: 6 },
      { userSourceId: 5, userTargetId: 3, raiting: 7 },
      { userSourceId: 5, userTargetId: 4, raiting: 4 },
      { userSourceId: 6, userTargetId: 1, raiting: 3 },
      { userSourceId: 6, userTargetId: 4, raiting: 7 },
      { userSourceId: 7, userTargetId: 2, raiting: 6 },
      { userSourceId: 7, userTargetId: 9, raiting: 7 },
      { userSourceId: 8, userTargetId: 9, raiting: 7 },
      { userSourceId: 9, userTargetId: 6, raiting: 6 },
      { userSourceId: 10, userTargetId: 3, raiting: 7 },
      { userSourceId: 11, userTargetId: 10, raiting: 6 },
      { userSourceId: 11, userTargetId: 12, raiting: 7 },
      { userSourceId: 12, userTargetId: 16, raiting: 5 },
      { userSourceId: 13, userTargetId: 15, raiting: 6 },
      { userSourceId: 12, userTargetId: 10, raiting: 4 },
      { userSourceId: 12, userTargetId: 13, raiting: 3 },
      { userSourceId: 14, userTargetId: 9, raiting: 5 },
      { userSourceId: 16, userTargetId: 4, raiting: 5 },
      { userSourceId: 16, userTargetId: 17, raiting: 7 },
      { userSourceId: 14, userTargetId: 12, raiting: 5 },
      { userSourceId: 17, userTargetId: 7, raiting: 6 },
      { userSourceId: 17, userTargetId: 14, raiting: 7 },
      { userSourceId: 15, userTargetId: 14, raiting: 4 },
      { userSourceId: 14, userTargetId: 13, raiting: 3 },
      { userSourceId: 16, userTargetId: 7, raiting: 7 },
      { userSourceId: 7, userTargetId: 9, raiting: 6 },
      { userSourceId: 7, userTargetId: 13, raiting: 7 },
      { userSourceId: 8, userTargetId: 11, raiting: 7 },
      { userSourceId: 9, userTargetId: 10, raiting: 6 },
      { userSourceId: 10, userTargetId: 7, raiting: 7 },
    ];

    const raitings = raitingsData.map((raiting) => ({
      ...raiting,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Raitings', raitings);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Raitings');
  },
};
