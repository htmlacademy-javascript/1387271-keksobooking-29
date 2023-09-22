const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarPhoto = document.querySelector('.ad-form-header__input');
const previewAvatarPhoto = document.querySelector('.ad-form-header__preview img');
const housePhoto = document.querySelector('.ad-form__input');
const previewHousePhoto = document.querySelector('.ad-form__photo');
//загрузка фото
const setPreviewPictureLoader = () => {
  avatarPhoto.addEventListener('change', () => {
    const file = avatarPhoto.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      previewAvatarPhoto.src = URL.createObjectURL(file);
    }
  });
  housePhoto.addEventListener('change', () => {
    const file2 = housePhoto.files[0];
    const fileName2 = file2.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName2.endsWith(it));
    if (matches) {
      const photo = document.createElement('img');
      photo.style.width = '70px';
      photo.style.height = '70px';
      photo.src = URL.createObjectURL(file2);
      previewHousePhoto.append(photo);
    }
  });
};
//удалекние фоток
const resetPhotos = ()=>{
  previewAvatarPhoto.src = 'img/muffin-grey.svg';
  previewHousePhoto.replaceChildren();
};
export {setPreviewPictureLoader,resetPhotos};
