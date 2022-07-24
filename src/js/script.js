// Tabi item sides switch
const tabs = document.querySelectorAll('.catalog__panel');
tabs.forEach(tab =>
  tab.addEventListener('click', e => {
    if (e.target.classList.contains('catalog-item__link')) {
      e.preventDefault();
      if (e.target.parentNode.nextSibling) {
        e.target.parentNode.classList.toggle('catalog-item__content_active');
        e.target.parentNode.nextSibling.classList.toggle(
          'catalog-item__list_active'
        );
      }
      if (e.target.parentNode.previousSibling) {
        e.target.parentNode.classList.toggle('catalog-item__list_active');
        e.target.parentNode.previousSibling.classList.toggle(
          'catalog-item__content_active'
        );
      }
    }
  })
);

// Scroll up arrow
window.addEventListener('scroll', function () {
  if (window.scrollY > 1200) {
    document.querySelector('.pageup').style.display = 'block';
  } else {
    document.querySelector('.pageup').style.display = 'none';
  }
});

document.querySelectorAll("a[href^='#']").forEach(function (link) {
  const href = link.getAttribute('href');
  if (href.slice(1) === "1" || "2" || "3") return;
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector(href);
    const offsetTop = target.offsetTop;

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  });
});

// Modal windows
const body = document.querySelector('body');
// Consultation
const openConsultationButtons = document.querySelectorAll(
  '[data-modal="consultation"]'
);
const consultationModal = document.getElementById('consultation');
openConsultationButtons.forEach(button =>
  button.addEventListener('click', () => {
    consultationModal.showModal();
    body.style.overflow = 'hidden';
  })
);
consultationModal.addEventListener('click', e => {
  if (!e.target.closest('.modal__wrapper')) {
    consultationModal.close();
    body.style.overflow = 'auto';
  }
});

// Buy
const openOrderButtons = document.querySelectorAll('.button_cat-item');
const orderModal = document.getElementById('order');
openOrderButtons.forEach(button =>
  button.addEventListener('click', () => {
    orderModal.showModal();
    body.style.overflow = 'hidden';
  })
);
orderModal.addEventListener('click', e => {
  if (!e.target.closest('.modal__wrapper')) {
    orderModal.close();
    body.style.overflow = 'auto';
  }
});

// Thanks
const thanksModal = document.getElementById('thanks');
thanksModal.addEventListener('click', e => {
  if (!e.target.closest('.modal__wrapper')) {
    thanksModal.close();
    body.style.overflow = 'auto';
  }
});

// Form validation
const errors = {
  noName: 'Пожалуйста, введите свое имя',
  shortName: 'Имя не может быть короче 2 символов',
  numbersName: 'Имя не может содержать цифры',
  noPhone: 'Пожалуйста, введите свой номер телефона',
  phoneLength: 'Неверная длина телефона',
  noEmail: 'Пожалуйста, ввдедите свой e-mail',
  wrongEmail: 'Некорректный email',
};

const forms = document.getElementsByTagName('form');
Array.from(forms).forEach(form =>
  form.addEventListener('submit', e => {
    e.preventDefault();
    const err = form.querySelector('.feed-form_err');
    if (!form.querySelector('[name="name"]').value)
      return (err.innerHTML = errors.noName);
    if (form.querySelector('[name="name"]').value.replace(/\D/g, '').length) {
      return (err.innerHTML = errors.numbersName);
    }
    if (
      form.querySelector('[name="name"]').value.replace(/[^a-zA-Z]/g, '')
        .length < 2
    )
      return (err.innerHTML = errors.shortName);
    if (!form.querySelector('[name="phone"]').value)
      return (err.innerHTML = errors.noPhone);
    const phoneLength = form
      .querySelector('[name="phone"]')
      .value.replace(/\D/g, '').length;
    if (phoneLength < 10 || phoneLength > 11)
      return (err.innerHTML = errors.phoneLength);
    if (!form.querySelector('[name="email"]').value)
      return (err.innerHTML = errors.noEmail);
    err.innerHTML = '';
    console.log(new FormData(e.target));
    e.target.reset();
  })
);
