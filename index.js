const image = document.getElementById("cover");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const blurValue = Math.min(scrollY / 50, 10);
    image.style.filter = `blur(${blurValue}px)`;
});


const buttons = document.querySelectorAll('.image-button');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const closeBtn = document.getElementById('closeBtn');
const saveBtn = document.getElementById('saveBtn');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const fullImage = button.getAttribute('data-full');
    const title = button.getAttribute('data-title') || 'image';

    overlayImage.src = fullImage;
    overlay.classList.add('active');

    saveBtn.href = fullImage;
    saveBtn.download = `${title}.jpg`;
  });
});

closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
  overlayImage.src = '';
});