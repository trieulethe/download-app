const looksSame = require('looks-same');

// Hàm kiểm tra xem hai ảnh có giống nhau không, với ngưỡng khác biệt
function compareImages(image1, image2) {
  console.log('1')
  return new Promise((resolve, reject) => {
    looksSame(image1, image2, { tolerance: 5 }, (error, { equal }) => {
      if (error) return reject(error);
      console.log('equal', equal)
      resolve(equal); // Trả về true nếu ảnh giống nhau hoặc gần giống
    });
  });
}

// Sử dụng hàm để so sánh hai ảnh
const imgPath1 = './img/2024-06-23_21-42-23_UTC_2.jpg';
const imgPath2 = './img/2024-06-23_21-42-23_UTC_4.jpg';

// // equal will be true, if images looks the same
// const { equal } = await looksSame(imgPath1, imgPath2);
// console.log('equal', equal)
(async function main() {
  const { equal } = await looksSame(imgPath1, imgPath2, { ignoreAntialiasing: true });
  console.log('equal', equal)
  // await compareImages(imgPath1, imgPath2)
})();
// console.log('x', x)


