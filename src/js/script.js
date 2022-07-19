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
