const sharp = require('sharp');
sharp('public/images/logo.jpeg')
  .extract({ left: 300, top: 150, width: 936, height: 600 })
  .toFile('public/images/logo_cropped.jpeg')
  .then(() => console.log('Cropped!'))
  .catch(err => console.error(err));
