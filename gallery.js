
import galleryListImg from './gallery-items.js'



// >>>> - 1)

const galleryRef = document.querySelector('.js-gallery'); // Находит UL в котором разметка галереи
const lightboxRef = document.querySelector('.js-lightbox'); // Див с модалкой
const lightboxImageRef = document.querySelector('.lightbox__image');
const btnCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('div.lightbox__overlay');



let numberImg = 0
//  Добавляет в ДОМ-документ все елементы масива
const getMarkup = (arr) => arr.reduce((acc, img) =>
  acc + `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      data-number="${numberImg += 1}"
      alt="${img.description}"
    />
  </a>
</li>`

  , '')
galleryRef.innerHTML = getMarkup(galleryListImg)


let numberPicture = 0 
const arrAllMarkup = []
  const getAllMarkup = (ar) => ar.forEach((array) => {   
    arrAllMarkup.push(array)
  })

// >>>> - 2)

galleryRef.addEventListener('click', openModl)  // Слушатель клика, откр. модалку
btnCloseRef.addEventListener('click', closesModal) // При клике на кнопку закр. модалку
overlayRef.addEventListener('click', closesModal) // При клике на Оверлей закр. модалку

function openModl(event) {
  event.preventDefault();
  window.addEventListener('keydown', movesRightAndLeft) // Кнопка влево вправо
  window.addEventListener('keydown', keyPress)  //Кнопка  Esc 

  const allImg = document.querySelectorAll('.gallery__image');
  // const galleryImage = document.querySelectorAll('.gallery__image');

  getAllMarkup(allImg)
  movesRightAndLeft(event)
  numberPicture = +event.target.dataset.number 

  if (event) {
    lightboxImageRef.src = event.target.dataset.source
  }


  if (event.target.nodeName !== 'IMG') {
    return null
  }

  lightboxRef.classList.add('is-open')

}

const keyPress = (ev) => {         
  if (ev.code === 'Escape') {
    closesModal()
  }

};

function changesAtributeSrc(url) {    // меняет src  атрибут. Подставляет дата атрибут взятый с event.target.dataset.source  с адресом кртинки 
  lightboxImageRef.src = url.target.dataset.source

}

function closesModal() {
  window.removeEventListener('keydown', movesRightAndLeft) // Снимает с стрелок слушатель
  window.removeEventListener('keydown', keyPress)   // Снимает с esc слушатель
  lightboxRef.classList.remove('is-open')     //удаляет класс 
  lightboxImageRef.removeAttribute('src')       // Удаляет атрибут 
}

function movesRightAndLeft(e) {
  if (e.code === 'ArrowRight') {
    if (numberPicture === galleryListImg.length) {
        numberPicture = galleryListImg.length
      }
    else {
      numberPicture += 1
     } 
      console.log('Листнули вправо! Картинка номер', numberPicture);
    
      returnsOriginalImg()

    }
  if (e.code === 'ArrowLeft') {
    console.log(e);
       if (numberPicture === 1) {
        numberPicture = 1
      }
    else {
      numberPicture -= 1
     } 
      
      console.log('Листнули влево! Картинка номер', numberPicture)

     returnsOriginalImg()
    }
}
  
    function returnsOriginalImg (){
      const findSrcPrew = arrAllMarkup.filter(arr => +arr.attributes[3].value === numberPicture).map(arr => arr.src);
      const findSrcOriginal = galleryListImg.find(arr => arr.preview === findSrcPrew[0])
      lightboxImageRef.src =[findSrcOriginal][0].original
  }