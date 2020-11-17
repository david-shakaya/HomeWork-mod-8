
import galleryListImg from './gallery-items.js'



// >>>> - 1)

const galleryRef = document.querySelector('.js-gallery'); // Находит UL в котором разметка галереи
const lightboxRef = document.querySelector('.js-lightbox'); // Див с модалкой
const lightboxImageRef = document.querySelector('.lightbox__image'); 
const btnCloseRef = document.querySelector('button[data-action="close-lightbox"]');
const overlayRef = document.querySelector('div.lightbox__overlay');



let numberImg = 0
//  Добавляет в ДОМ-документ все елементы масива
const  getMarkup =(arr) => arr.reduce((acc, img) => 
  acc + `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      data-number="${numberImg +=1}"
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


  console.log(event.target.dataset.number); //--- Это номер дата атрибута открытой картинки. Нужно добавить слушатель во время отркития модалки. И типа если стрелка вправо то +1 влево -1

  window.addEventListener('keydown', keyPress)  //Вешаем слушатель для закрытия при нажитии искейп

  if (event.target.nodeName !== 'IMG') {
    return null
  }
   
  lightboxRef.classList.add('is-open')
  const galleryImage = document.querySelector('.gallery__image');

  changesAtributeSrc(event)

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
    window.removeEventListener('keydown', keyPress )   // Снимает с esc слушатель
   lightboxRef.classList.remove('is-open')     //удаляет класс 
 lightboxImageRef.removeAttribute('src')       // Удаляет атрибут 
}


// window.addEventListener('keydown', (e) => {
  
//  console.log( e.code);
// })