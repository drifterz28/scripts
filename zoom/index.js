const images = document.querySelectorAll('.pirobox_gall');
const zoom = document.querySelector('.image-zoom');
const lightBoxShade = document.querySelector('.light-box-shade');
const lightBox = document.querySelector('.light-box');
const extraImageNav = document.querySelectorAll('.extra-images-nav');
const extraImages = document.querySelector('.ex-images');
const lightBoxExtraImages = document.querySelector('.light-box-ex-image');
const lightBoxNav = document.querySelectorAll('.images-nav');

const imageCount = images.length;
let imageIndex;
let extraImageSlidePos = 0;
const exImageWidth = (imageCount -1) * 110;
const steps = Math.ceil(exImageWidth / 200);

const getPos = function(e) {
  const rect = e.target.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * 100;
  const y = (e.clientY - rect.top) / rect.height * 100;
  zoom.style.backgroundPosition = x + '% ' + y + '%';
}

const addImage = function(e) {
  const target = e.target;
  removeImage();
  const image = target.getAttribute('href');
  zoom.style.display = 'block';
  zoom.style.backgroundImage = 'url(' + image +')';
}

const removeImage = function() {
  zoom.style.backgroundImage = 'none';
  zoom.style.display = 'none';
}

const showImageEvent = function(e) {
  e.preventDefault();
  const target = e.target;
  showImage(target);
}

const changeSelected = function() {
  const selected = document.querySelector('.selected');
  if(selected) {
    selected.classList.remove('selected');
  }
  document.querySelector('.light-box-images[index=\'' + imageIndex + '\']').classList.add('selected');
}

const showImage = function(elm) {
  const imageElm = elm.getAttribute('href') ? elm : elm.parentNode;
  imageIndex = imageElm.getAttribute('index');
  changeSelected();
  lightBox.querySelector('img').src = imageElm.getAttribute('href');
  lightBox.classList.add('show');
}

const closeLightBox = function() {
  lightBox.classList.remove('show');
}

const slideExtraImages = function(e) {
  const target = e.target;
  const isBack = target.classList.contains('back');
  const disable = document.querySelector('.disable');
  if(disable) {
    disable.classList.remove('disable');
  }

  if(isBack && extraImageSlidePos > 0) {
    extraImageSlidePos = extraImageSlidePos - 220;
  } else if(!isBack) {
    extraImageSlidePos = extraImageSlidePos + 220;
  }
  if(extraImageSlidePos <= 0) {
    extraImageSlidePos = 0;
    extraImageNav[0].classList.add('disable');
  }
  if(extraImageSlidePos > (exImageWidth - 240)) {
    extraImageSlidePos = exImageWidth - 240;
    extraImageNav[1].classList.add('disable');
  }
  extraImages.style.transform = 'translateX(-' + extraImageSlidePos + 'px)';
}

const lightBoxImages = function(e) {
  e.preventDefault();
  showImage(e.target);
}

const changeLightBoxImage = function(e) {
  const isBack = e.target.classList.contains('back');
  if(isBack) {
    imageIndex--;
  } else {
    imageIndex++;
  }
  if(imageIndex < 0) {
    imageIndex = imageCount - 1;
  }
  if(imageIndex >= imageCount) {
    imageIndex = 0;
  }
  const nextImage = document.querySelector('.light-box-images[index=\'' + imageIndex + '\']')
  showImage(nextImage);
}

if(imageCount) {
  document.querySelector('.light-box-close').addEventListener('click', closeLightBox);
  lightBoxShade.addEventListener('click', closeLightBox);

  for(let i = 0; i < imageCount; i++) {
    images[i].setAttribute('index', i);
    images[i].addEventListener('mouseenter', addImage);
    images[i].addEventListener('mouseleave', removeImage);
    images[i].addEventListener('click', showImageEvent);
    images[i].addEventListener('mousemove', getPos);
    const clone = images[i].cloneNode(true);
    clone.classList.remove('pirobox_gall');
    clone.classList.add('light-box-images');
    lightBoxExtraImages.appendChild(clone);
    clone.addEventListener('click', lightBoxImages);
  }

  if(imageCount > 1) {
    lightBoxNav[0].addEventListener('click', changeLightBoxImage);
    lightBoxNav[1].addEventListener('click', changeLightBoxImage);
  } else {
    lightBoxNav[0].classList.add('hide-nav');
    lightBoxNav[1].classList.add('hide-nav');
    lightBoxExtraImages.classList.add('hide-nav');
  }

  if(imageCount > 5) {
    extraImageNav[0].addEventListener('click', slideExtraImages);
    extraImageNav[1].addEventListener('click', slideExtraImages);
  }
}