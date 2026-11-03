// Configure apenas quando o número de atendimento estiver confirmado.
// Use código do país e DDD, somente dígitos (formato internacional).
const WHATSAPP_NUMBER = '';

const slides = [...document.querySelectorAll('.collection-slide')];
let activeSlide = 0;
let selectedFit = 'regular';
const fitNames = { regular: 'Regular', oversized: 'Oversized' };
const animalNames = { boto: 'Boto', uirapuru: 'Uirapuru', onca: 'Onça' };
function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.hidden = i !== activeSlide;
    const name = animalNames[slide.dataset.animal];
    const shirt = slide.querySelector('.featured-shirt');
    shirt.style.setProperty('--x', selectedFit === 'regular' ? '50%' : '100%');
    shirt.setAttribute('aria-label', `Camisa raglan ${selectedFit} ${name}`);
    slide.querySelector('[data-product]').dataset.product = `Camisa raglan ${selectedFit} e ecobag ${name}`;
  });
  const key = slides[activeSlide].dataset.animal;
  document.querySelectorAll('[data-animal-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.animalChoice === key)));
  document.querySelector('#slide-status').textContent = `${String(activeSlide + 1).padStart(2, '0')} / 03 — ${animalNames[key]} · ${fitNames[selectedFit]}`;
}
 document.querySelector('#previous-products').addEventListener('click', () => showSlide(activeSlide - 1));
 document.querySelector('#next-products').addEventListener('click', () => showSlide(activeSlide + 1));
 document.querySelector('.pair-carousel').addEventListener('keydown', event => {
   if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
     event.preventDefault();
     showSlide(activeSlide + (event.key === 'ArrowLeft' ? -1 : 1));
   }
 });
 document.querySelectorAll('[data-animal-choice]').forEach(button => button.addEventListener('click', () => showSlide(slides.findIndex(slide => slide.dataset.animal === button.dataset.animalChoice))));
 document.querySelectorAll('[data-fit]').forEach(button => button.addEventListener('click', () => {
   selectedFit = button.dataset.fit;
   document.querySelectorAll('[data-fit]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
   showSlide(activeSlide);
 }));
showSlide(0);

document.querySelectorAll('[data-product]').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      const message = `Olá! Tenho interesse na ${product} do Projeto Uirapurú. Quais tamanhos, preços e opções estão disponíveis?`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      return;
    }
    const status = document.querySelector('#contact-status');
    status.textContent = `Seu interesse: ${product}. O WhatsApp da loja ainda não foi disponibilizado. Em breve você poderá consultar preços e tamanhos por aqui.`;
    status.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    status.focus({ preventScroll: true });
  });
});
