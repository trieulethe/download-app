const fs = require('fs-extra');
const path = require('path');
const looksSame = require('looks-same');

// Đường dẫn đến thư mục chứa ảnh
const folderPath = './img';

// Hàm kiểm tra xem hai ảnh có giống nhau không, với ngưỡng khác biệt
function compareImages(image1, image2) {
  return new Promise((resolve, reject) => {
    looksSame(image1, image2, { tolerance: 5 }, (error, { equal }) => {
      if (error) return reject(error);
      resolve(equal); // Trả về true nếu ảnh giống nhau hoặc gần giống
    });
  });
}

// Hàm xóa ảnh trùng lặp hoặc gần giống
async function removeDuplicates(folderPath) {
  const files = await fs.readdir(folderPath);
  const images = files.filter(file => ['.png', '.jpg', '.jpeg', '.bmp', '.gif'].includes(path.extname(file).toLowerCase()));
  console.log('images', images)
  const duplicates = [];

  // So sánh từng cặp ảnh
  for (let i = 0; i < images.length; i++) {
    const imagePath1 = path.join(folderPath, images[i]);

    for (let j = i + 1; j < images.length; j++) {
      const imagePath2 = path.join(folderPath, images[j]);

      const isDuplicate = await compareImages(imagePath1, imagePath2);

      if (isDuplicate) {
        duplicates.push(imagePath2);
        console.log(`Ảnh trùng lặp hoặc gần giống: ${imagePath2} giống với ${imagePath1}`);
        break;
      }
    }
  }

  // Xóa các ảnh trùng lặp
  await Promise.all(duplicates.map(duplicate => {
    console.log(`Đã xóa ảnh trùng lặp hoặc gần giống: ${duplicate}`);
    return fs.remove(duplicate);
  }));
}

// Gọi hàm để xóa ảnh trùng lặp
removeDuplicates(folderPath)
  .then(() => console.log('Hoàn thành việc xóa ảnh trùng lặp hoặc gần giống'))
  .catch(error => console.error('Có lỗi xảy ra:', error));
