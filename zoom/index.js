const images = document.querySelectorAll('.images img');
const zoom = document.querySelector('.image-zoom');
const lightBox = document.querySelector('.light-box');
const lightBoxShade = document.querySelector('.light-box-shade');

const getPos = (e) => {
  const rect = e.target.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width * 100;
  const y = (e.clientY - rect.top) / rect.height * 100;
  zoom.style.backgroundPosition = `${x}% ${y}%`;
}

const addImage = (e) => {
  const target = e.target;
  removeImage();
  const image = target.getAttribute('src');
  zoom.style.backgroundImage = `url(${image})`;
}

const removeImage = () => {
  zoom.style.backgroundImage = 'none';
}

const showImage = (e) => {
  e.preventDefault();
  const target = e.target;
  const image = target.getAttribute('src');
  lightBox.style.backgroundImage = `url(${image})`;
  lightBox.classList.add('show');
}

const closeLightBox = () => {
  lightBox.innerHTML = '';
  lightBox.classList.remove('show');
}

lightBox.addEventListener('click', closeLightBox);
[...images].forEach((image) => {
  image.addEventListener('mouseenter', addImage);
  image.addEventListener('mouseleave', removeImage);
  image.addEventListener('click', showImage);
  image.addEventListener('mousemove', getPos);
});
