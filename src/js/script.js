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
  button.addEventListener('click', (e) => {
    // Add item name to modal
    const itemName = e.target.parentNode.parentNode.querySelector('.catalog-item__subtitle').innerHTML;
    orderModal.querySelector('.modal__descr').innerHTML = itemName;
    // Add item code data to form
    const itemCode = e.target.parentNode.parentNode.getAttribute('data-item-code');
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "item-code";
    hiddenInput.value = itemCode;
    orderModal.querySelector('form').appendChild(hiddenInput);
    // open modal and fix scroll
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
  fetchErr: 'Что-то пошло не так. Попробуйте позже',
};

const forms = document.getElementsByTagName('form');
Array.from(forms).forEach(form =>
  form.addEventListener('submit', async (e) => {
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

    // Submit form
    async function handleFetchResult(message) {
      if (message === '200') {
        e.target.reset();

        consultationModal.close();
        orderModal.close();
        thanksModal.showModal();
      }
      if (message === '400') {
        err.innerHTML = errors.fetchErr;
      }
      setTimeout(() => {
        thanksModal.close();
      }, 6000);
    }

    await fetchSubmit(new FormData(form))
      .then((status) => {
        handleFetchResult(status);
      })
      .catch((error) => {
        handleFetchResult(error.message);
      });
    return;
  })
);

// Server logic placeholder
function fetchSubmit(data) {
  //Here should be backend endpoint for submitting
  console.log(data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.5) {
        resolve('200');
      } else {
        reject(new Error('400'));
      }
    }, 2000); // Simulating a delay of 2 seconds
  });
}