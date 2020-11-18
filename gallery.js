
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


// >>>> - 2)

galleryRef.addEventListener('click', openModl)  // Слушатель клика, откр. модалку
btnCloseRef.addEventListener('click', closesModal) // При клике на кнопку закр. модалку
overlayRef.addEventListener('click', closesModal) // При клике на Оверлей закр. модалку

function openModl(event) {
  event.preventDefault();



  const allImg = document.querySelectorAll('.gallery__image');
  // console.log(allImg[2].dataset.source);
  const getUserNames = (ar) => ar.forEach((array) => {   // ГДЕТО ТУТ ИСКАТЬ РЕШЕНИЕ С КНОПКОЙ ВПРАВО
    console.log(array);
  })
  getUserNames(allImg)


  // console.log(allImg);




  
  window.addEventListener('keydown', movesRightAndLeft)
 

  let numberPicture = +event.target.dataset.number
  function movesRightAndLeft(e) {
    if (e.code === 'ArrowRight') {
      numberPicture += 1
      console.log('Листнули вправо! Картинка номер', numberPicture);
    }
  
    if (e.code === 'ArrowLeft') {
      numberPicture -= 1
      console.log('Листнули влево! Картинка номер', numberPicture)
    }
   
    // lightboxImageRef.src =  тогда срс равен  срс - event.target.dataset.number 1 +
        
    // if (numberPicture === +event.target.dataset.number + 1) {  // Тут наверное нужно искать с помощю перебирающих методов
    // lightboxImageRef.src = (numberPicture = event.target.dataset.number )      // Возможно подойдет .find
    // верни src равный дата атрибуту текущему
    // const arr = (array) => array.find((elem) => {
          
    //   return elem
    // }  )
    //  console.log(+event.target.dataset.number + 1);
    // }
     
    // console.log(numberPicture); //--- Это номер дата атрибута открытой картинки.
  }
 
  
  if (event) {
    lightboxImageRef.src = event.target.dataset.source
     
  }

  window.addEventListener('keydown', keyPress)

  if (event.target.nodeName !== 'IMG') {
    return null
  }

  lightboxRef.classList.add('is-open')
  const galleryImage = document.querySelectorAll('.gallery__image');
  // const allAtributes =  galleryImage.attributes
  // galleryImage.forEach(e => e);

  // const s = (ar) => ar.foreach((el) => {
  //   console.log(el);
    
  //  })


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
  window.removeEventListener('keydown', keyPress)   // Снимает с esc слушатель
  lightboxRef.classList.remove('is-open')     //удаляет класс 
  lightboxImageRef.removeAttribute('src')       // Удаляет атрибут 
}
