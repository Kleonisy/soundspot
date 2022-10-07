/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const testUserData = [
      {
        login: 'John Lennon',
        email: 'john@gmail.com',
        password: await bcrypt.hash('john@gmail.com', 10),
        about: 'A singer, songwriter, musician and peace activist who achieved worldwide fame as the founder, co-songwriter, co-lead vocalist and rhythm guitarist of the Beatles.',
        latitude: 59.93815,
        longitude: 30.37099,
        contact: 't.me/johnLenon',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/John_Lennon_1969_%28cropped%29.jpg',
      },
      {
        login: 'Paul McCartney',
        email: 'paul@gmail.com',
        password: await bcrypt.hash('paul@gmail.com', 10),
        about: 'A singer, songwriter and musician who gained worldwide fame with the Beatles, for whom he played bass guitar and shared primary songwriting and lead vocal duties with John Lennon.',
        latitude: 59.90115,
        longitude: 30.32945,
        contact: 't.me/paulMC',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3DiD-5X3OOut1P4kH9OOEIzUM9owgSIjNWw&usqp=CAU',
      },
      {
        login: 'Ringo Starr',
        email: 'starr@gmail.com',
        password: await bcrypt.hash('starr@gmail.com', 10),
        about: 'A musician, singer, songwriter and actor who achieved international fame as the drummer for the Beatles',
        latitude: 59.91957,
        longitude: 30.37065,
        contact: 't.me/starr',
        photo: 'https://wallpaperaccess.com/full/4636658.jpg',
      },
      {
        login: 'George Harrison',
        email: 'harrison@gmail.com',
        password: await bcrypt.hash('harrison@gmail.com', 10),
        about: 'A musician and singer-songwriter who achieved international fame as the lead guitarist of the Beatles.',
        latitude: 59.92576,
        longitude: 30.29718,
        contact: 't.me/harrisonG',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/George_Harrison_1974.jpg/440px-George_Harrison_1974.jpg',
      },
      {
        login: 'Eminem',
        email: 'eminem@gmail.com',
        password: await bcrypt.hash('eminem@gmail.com', 10),
        about: 'A rapper and record producer',
        latitude: 59.95672,
        longitude: 30.22783,
        contact: 't.me/eminem',
        photo: 'https://thesource.com/wp-content/uploads/2016/10/photo.jpg',
      },
      {
        login: 'XXXTentacion',
        email: 'xxxtentacion@gmail.com',
        password: await bcrypt.hash('xxxtentacion@gmail.com', 10),
        about: 'American rapper, singer, and songwriter.',
        latitude: 59.9605,
        longitude: 30.28928,
        contact: 't.me/xxxtentacion',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Xxxtentacion_%28cropped%29.jpg',
      },
      {
        login: 'Niall Horan',
        email: 'horan@gmail.com',
        password: await bcrypt.hash('horan@gmail.com', 10),
        about: 'Irish singer and songwriter',
        latitude: 59.85997,
        longitude: 30.27278,
        contact: 't.me/Niallhoran',
        photo: 'https://lastfm.freetls.fastly.net/i/u/ar0/095db5bfcde146d4aac5d270686cacf1',
      },
      {
        login: 'Liam Payne',
        email: 'payne@mail.com',
        password: await bcrypt.hash('payne@mail.com', 10),
        about: 'English singer and a member of the boy band One Direction',
        latitude: 60.01784,
        longitude: 30.30368,
        contact: 't.me/payne-com',
        photo: 'https://akamai.sscdn.co/uploadfile/letras/fotos/d/a/2/1/da2193fa7b4d151226ed0ce996377193.jpg',
      },
      {
        login: 'Harry Styles',
        email: 'styles@gmail.com',
        password: await bcrypt.hash('styles@gmail.com', 10),
        about: 'English singer, songwriter, and actor. A member of the boy band One Direction',
        latitude: 59.95224,
        longitude: 30.42315,
        contact: 't.me/harryST',
        photo: 'https://avatars.yandex.net/get-music-content/2399641/104894a9.p.631842/m1000x1000',
      },
      {
        login: 'Louis Tomlinson',
        email: 'tomlinson@gmail.com',
        password: await bcrypt.hash('tomlinson@gmail.com', 10),
        about: 'English singer and songwriter.  A member of the boy band One Direction',
        latitude: 59.98076,
        longitude: 30.36273,
        contact: 't.me/tomlinson',
        photo: 'https://i.pinimg.com/originals/91/89/5c/91895cba6aba423fb2599157824b8911.jpg',
      },
      {
        login: 'Zayn Malik',
        email: 'malil@gmail.com',
        password: await bcrypt.hash('malil@gmail.com', 10),
        about: 'British singer. Born and raised in Bradford, a member of the boy band One Direction',
        latitude: 59.95533,
        longitude: 30.32633,
        contact: 't.me/malilZ',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvfgKv_hA3dX7txcUve1jf08Hbk3TDoOykiOrioRnYYNMV98nrDCMEI-eteg6L0-jRpGU&usqp=CAU',
      },
      {
        login: 'NF',
        email: 'nf@gmail.com',
        password: await bcrypt.hash('nf@gmail.com', 10),
        about: 'American rapper, singer, songwriter and record producer.',
        latitude: 59.90683,
        longitude: 30.417,
        contact: 't.me/nfgm',
        photo: 'https://studio21.ru/wp-content/uploads/2019/08/NF.jpg',
      },
      {
        login: 'Luke Pritchard',
        email: 'pritchard@gmail.com',
        password: await bcrypt.hash('pritchard@gmail.com', 10),
        about: 'British guitarist and singer, born 2 March 1985 in Worthing, Sussex, England, UK.',
        latitude: 59.92095,
        longitude: 30.28997,
        contact: 't.me/pritchard',
        photo: 'https://i0.wp.com/fault-magazine.com/wp-content/uploads/2018/09/Luke-Pritchard-The-Kooks-Robert-K-Baggs-Acufocal-interview-4-800x533.jpg?resize=800%2C533',
      },
      {
        login: 'Hugh Harris',
        email: 'harris@gmail.com',
        password: await bcrypt.hash('harris@gmail.com', 10),
        about: 'English musician, most known for song "Rhythm of Life',
        latitude: 59.89098,
        longitude: 30.28445,
        contact: 't.me/harrisHu',
        photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6qYRfXjyRun6-is50-pkkv3VAXrOy1UaxCg&usqp=CAU',
      },
      {
        login: 'Alexis Nuñez',
        email: 'alexis@gmail.com',
        password: await bcrypt.hash('alexis@gmail.com', 10),
        about: 'Drummer and percussionist from London, England, UK and member of Hejira.',
        latitude: 59.93986,
        longitude: 30.47053,
        contact: 't.me/alexisNun',
        photo: 'https://www.porteranddavies.co.uk/wp-content/uploads/2016/08/alexis-nunez.jpg',
      },
      {
        login: 'Lars Ulrich',
        email: 'ulrich@gmail.com',
        password: await bcrypt.hash('ulrich@gmail.com', 10),
        about: 'A musician best known as the drummer and co-founder of American heavy metal band Metallica.',
        latitude: 59.9316,
        longitude: 30.25836,
        contact: 't.me/ulrichLars',
        photo: 'https://lastfm.freetls.fastly.net/i/u/770x0/925d1618e55d49d68ebf1bc644af64e5.jpg',
      },
      {
        login: 'Kimberly Perry',
        email: 'perry@gmail.com',
        password: await bcrypt.hash('perry@gmail.com', 10),
        about: 'A singer and music personality associated with the band, ‘The Band Perry’. ',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/perryKim',
        photo: 'https://www.soundslikenashville.com/wp-content/uploads/2018/03/Kimberly-Perry-The-Band-Perry-1521826749.png',
      },
      {
        login: 'Anatoly Bashkatoff',
        email: 'anatoly@gmail.com',
        password: await bcrypt.hash('anatoly@gmail.com', 10),
        about: 'Likes to catch bream and give bream to bad students. If he drinks, he sings in karaoke "I\'ll go out into the field with a horse"',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/anatolyBash',
        photo: 'T03JMRMKG9W-U03PPAN3QDU-6948d24e8c67-512.jpeg',
      },
      {
        login: 'Mister Yuriy',
        email: 'yuriy@gmail.com',
        password: await bcrypt.hash('yuriy@gmail.com', 10),
        about: 'Even Layla herself is afraid of him.',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/misterYurii',
        photo: 'T03JMRMKG9W-U03J34GTK53-911def767cdf-512.jpeg',
      },
      {
        login: 'Lena Lushnikova',
        email: 'lena@gmail.com',
        password: await bcrypt.hash('lena@gmail.com', 10),
        about: 'Likes to beat people with an iron stick',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/lenaLush',
        photo: 'T03JMRMKG9W-U03JBK7R170-374842e32469-512.jpeg',
      },
      {
        login: 'Uncle Lyosha',
        email: 'leha@gmail.com',
        password: await bcrypt.hash('leha@gmail.com', 10),
        about: 'He left for Georgia to learn new technologies: khinkali, satsivi and kindzmarauli',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/uncleLyosha',
        photo: 'T03JMRMKG9W-U03JDR6GG3C-448dd2fd84bf-512.jpeg',
      },
      {
        login: 'Anna The Queen',
        email: 'anna@gmail.com',
        password: await bcrypt.hash('anna@gmail.com', 10),
        about: 'Watch out "pink semi-sweet" - the Goddess of React is coming for you!',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/annaQueen',
        photo: 'T03JMRMKG9W-U03MFMM56FJ-5cfebfdbfd43-512.jpeg',
      },
      {
        login: 'Artem the Mysterious',
        email: 'artem@gmail.com',
        password: await bcrypt.hash('artem@gmail.com', 10),
        about: 'Likes computer games, modern art and. Periodically goes into the astral plane on yoga.',
        latitude: 59.89408,
        longitude: 30.27072,
        contact: 't.me/artemMyst',
        photo: 'T03JMRMKG9W-U03K3L3SA1H-1926761efff5-512.jpeg',
      },
    ];

    const testUsers = testUserData.map((user) => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', testUsers);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
