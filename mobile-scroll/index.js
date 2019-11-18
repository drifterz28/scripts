let touchStart = 0;
let touchmove = 0;
let onImage = 0;
let imageStatus;
let windowWidth;
let imageCount;

const nextImage = (elm) => {
  onImage++;
  if(onImage >= imageCount) {
    onImage = imageCount -1;
  }
  touchStart = 0;
  updateStatus();
  elm.style.transform = `translateX(${-onImage * windowWidth}px)`;
}

const prevImage = elm => {
  onImage--;
  if(onImage < 0) {
    onImage = 0;
  }
  touchStart = 0;
  updateStatus();
  elm.style.transform = `translateX(${-onImage * windowWidth}px)`;
}

const updateStatus = () => {
  const currentActive = imageStatus.querySelector(`.active`);
  if(currentActive) {
    currentActive.classList.remove('active');  
  }
  imageStatus.querySelector(`div:nth-child(${onImage + 1})`).classList.add('active');
}

(() => {
  const imgsElm = document.querySelector('.images');
  const body = document.body;
  const images = imgsElm.querySelectorAll('li');
  const imgRect = body.getBoundingClientRect();
  const nextButton = document.querySelector('.next-image');
  const prevButton = document.querySelector('.prev-image');
  imageStatus = document.querySelector('.image-status');

  windowWidth = imgRect.width;
  imageCount = images.length;

  [...images].map(img => {
    imageStatus.insertAdjacentHTML('afterbegin', '<div></div>');
    img.style.width = windowWidth + 'px';
  });
  updateStatus();

  nextButton.addEventListener('click', () => nextImage(imgsElm));
  prevButton.addEventListener('click', () => prevImage(imgsElm));

  imgsElm.style.width = (windowWidth * imageCount) + 'px';
  imgsElm.addEventListener('touchstart', e => {
    e.preventDefault();
    touchStart = e.touches[0].pageX;
  }, false);

  imgsElm.addEventListener('touchmove', e => {
    e.preventDefault();
    touchmove = e.touches[0].pageX;
    const diff = touchStart - touchmove;
    imgsElm.style.transform = `translateX(-${diff + onImage * windowWidth}px)`;
  }, false);
  
  imgsElm.addEventListener('touchend', e => {
    e.preventDefault();
    const diff = touchStart - touchmove;
    if(diff > 30) {
      nextImage(imgsElm);
    } else if(diff < -30) {
      prevImage(imgsElm);
    }
  }, false);
})();
