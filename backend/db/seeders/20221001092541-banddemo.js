/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const userInstrumentsData = [
      { bandId: 6, demoFile: 'uchat.mp3', songTitle: 'Гимн Эльбруса' },
    ];
    const userInstruments = userInstrumentsData.map((userInstrument) => ({
      ...userInstrument,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('BandDemos', userInstruments);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('BandDemos');
  },
};
