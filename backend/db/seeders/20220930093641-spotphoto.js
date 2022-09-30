/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const spotPhotosData = [
      { photo: 'https://images.squarespace-cdn.com/content/v1/5a287709a8b2b044b1c900b2/1562597623655-B04RDHLVSFQBUKOZ6BSY/IMG_1879.jpg?format=750w', spotId: 1 },
      { photo: 'https://images.squarespace-cdn.com/content/v1/5a287709a8b2b044b1c900b2/1561568646297-BT5S6KQ3ZM6218SWBD76/11A?format=1500w', spotId: 1 },
      { photo: 'https://images.squarespace-cdn.com/content/v1/5a287709a8b2b044b1c900b2/1561568646297-BT5S6KQ3ZM6218SWBD76/11A?format=1500w', spotId: 1 },
      { photo: 'https://images.squarespace-cdn.com/content/v1/5a287709a8b2b044b1c900b2/1561568646297-BT5S6KQ3ZM6218SWBD76/11A?format=1500w', spotId: 1 },
      { photo: 'https://dramaleague.org/wp-content/uploads/2022/03/20220301-ET3A0874-scaled.jpg', spotId: 2 },
      { photo: 'https://dramaleague.org/wp-content/uploads/2022/03/20220301-ET3A0900-scaled.jpg', spotId: 2 },
      { photo: 'https://dramaleague.org/wp-content/uploads/2022/03/20220301-ET3A0864-Edit-scaled.jpg', spotId: 2 },
      { photo: 'https://s3-media0.fl.yelpcdn.com/bphoto/BED3jmmQyzK1yxJMycQr-g/o.jpg', spotId: 3 },
      { photo: 'https://s3-media0.fl.yelpcdn.com/bphoto/_v-AiSHdWFh-An_cR72mxQ/o.jpg', spotId: 3 },
      { photo: 'https://s3-media0.fl.yelpcdn.com/bphoto/wNHdcfsaVHZp3Nw4iVkAMA/o.jpg', spotId: 3 },
      { photo: 'https://s3-media0.fl.yelpcdn.com/bphoto/ECt2S5hHwd6lFFU0pb0-bg/o.jpg', spotId: 3 },
      { photo: 'https://experiencerws.com/wp-content/uploads/2021/08/studio-5.jpg', spotId: 4 },
      { photo: 'https://experiencerws.com/wp-content/uploads/2021/08/studio-4.jpg', spotId: 4 },
      { photo: 'https://experiencerws.com/wp-content/uploads/2021/08/studio-a-1.jpg', spotId: 4 },
      { photo: 'https://avatars.mds.yandex.net/get-altay/1938795/2a000001732871cb73a87a9aaee701090348/XXL', spotId: 6 },
      { photo: 'https://avatars.mds.yandex.net/get-altay/2752367/2a0000017328722568b58a15130ea70ba4e4/XXL', spotId: 6 },
      { photo: 'https://avatars.mds.yandex.net/get-altay/2425845/2a0000017328737667a669e1e8c72a4ce1c7/XXL', spotId: 6 },
    ];
    const spotPhotos = spotPhotosData.map((spotPhoto) => ({
      ...spotPhoto,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('SpotPhotos', spotPhotos);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('SpotPhotos');
  },
};
