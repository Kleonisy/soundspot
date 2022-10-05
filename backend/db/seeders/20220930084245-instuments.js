/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const instrData = [
      { instrument: 'guitar' },
      { instrument: 'violin' },
      { instrument: 'drums' },
      { instrument: 'harpschord' },
      { instrument: 'piano' },
      { instrument: 'bass guitar' },
      { instrument: 'keyoard' },
      { instrument: 'bass drum' },
      { instrument: 'electric guitar' },
      { instrument: 'snare drum' },
      { instrument: 'voсals' },
      { instrument: 'flute' },
      { instrument: 'percussion' },
      { instrument: 'saxophone' },
      { instrument: 'cello' },
      { instrument: 'trumpet' },
      { instrument: 'harmonica' },
      { instrument: 'clarinet' },
      { instrument: 'gong' },
      { instrument: 'mandolin' },
    ];
    const instruments = instrData.map((band) => ({
      ...band,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Instruments', instruments);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Instruments');
  },
};
