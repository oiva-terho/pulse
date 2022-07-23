// Tabi item sides switch
const tabs = document.querySelectorAll('.catalog__panel')
tabs.forEach(tab => tab.addEventListener('click', (e) => {
  if (e.target.nodeName === 'A') {
    e.preventDefault();
    console.log(e.target.parentNode);
    if (e.target.parentNode.nextSibling) {
      e.target.parentNode.classList.toggle('catalog-item__content_active');
      e.target.parentNode.nextSibling.classList.toggle('catalog-item__list_active');
    } 
    if (e.target.parentNode.previousSibling){
      e.target.parentNode.classList.toggle('catalog-item__list_active');
      e.target.parentNode.previousSibling.classList.toggle('catalog-item__content_active');
    }
  }
}))

// Scroll up arrow
window.addEventListener("scroll", function() {
  if (window.scrollY > 1200) {
      document.querySelector('.pageup').style.display = "block";
  } else {
      document.querySelector('.pageup').style.display = "none";
  }
});

document.querySelectorAll("a[href^='#']").forEach(function(link) {
  link.addEventListener("click", function(event) {
      event.preventDefault();
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      const offsetTop = target.offsetTop;
      
      window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
      });
  });
});

// Modal windows
const openConsultationButtons = document.querySelectorAll('[data-modal="consultation"]');
const consultationModal = document.getElementById('consultation');
openConsultationButtons.forEach(button => button.addEventListener('click', () => {
  consultationModal.showModal();
}))
consultationModal.addEventListener('click', (e) => {
  if (!e.target.closest('.modal__wrapper')) {
    consultationModal.close();
  }
})
