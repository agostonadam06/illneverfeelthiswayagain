const image = document.getElementById("cover");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const blurValue = Math.min(scrollY / 50, 20);
    const opValue = Math.min(scrollY / 10, 50);
    image.style.filter = `blur(${blurValue}px) opacity(${100 - opValue}%)`;
});


const buttons = document.querySelectorAll('.image-button, .text-button');
const overlay = document.getElementById('overlay');
const overlayImage = document.getElementById('overlayImage');
const overlayPDF = document.getElementById('overlayPDF');
const closeBtn = document.getElementById('closeBtn');
const saveBtn = document.getElementById('saveBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = -1;

function openFile(index) {
  const button = buttons[index];
  if (!button) return;

  const fullImage = button.getAttribute('data-full');
  const pdfFile = button.getAttribute('data-pdf');
  const title = button.getAttribute('data-title') || 'file';

  currentIndex = index;
  overlay.classList.add('active');

  overlayImage.style.display = 'none';
  overlayPDF.style.display = 'none';
  overlayPDF.src = '';
  overlayImage.src = '';

  if (pdfFile) {
    overlay.classList.add('show-pdf');
    overlay.classList.remove('show-image');
    overlayPDF.src = pdfFile;
    overlayPDF.style.display = 'block';
    saveBtn.href = pdfFile;
    saveBtn.download = `${title}.jpg`;
  } else if (fullImage) {
    overlay.classList.add('show-image');
    overlay.classList.remove('show-pdf');
    overlayImage.src = fullImage;
    overlayImage.style.display = 'block';
    saveBtn.href = fullImage;
    saveBtn.download = `${title}.jpg`;
  }

  prevBtn.style.visibility = index > 0 ? 'visible' : 'hidden';
  nextBtn.style.visibility = index < buttons.length - 1 ? 'visible' : 'hidden';
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => openFile(index));
});

closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active', 'show-image', 'show-pdf');
  overlayImage.src = '';
  overlayPDF.src = '';
  currentIndex = -1;
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) openFile(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < buttons.length - 1) openFile(currentIndex + 1);
});

document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') closeBtn.click();
});