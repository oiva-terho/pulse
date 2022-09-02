$(document).ready(function(){
    $('.carousel__inner').slick({
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [{
            breakpoint: 992,
            settings: {
            arrows: false,
            }
        }]
    });

    //Goods tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

    $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
    });

    async function getResource(url) {
        let result = await fetch(url);
        if (!result.ok) {
            throw new Error(`Could not fetch ${url}. Status ${result.status}`);
        }
        return await result.json();
    }

    class NewCard {
        constructor (img, title, descr, list, oldPrice, newPrice, parent) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.list = document.createElement('ul');
            this.oldPrice = oldPrice;
            this.newPrice = newPrice;
            this.parent = document.querySelector(parent);

            list.forEach((li) => {this.list.append(document.createElement('li').innerHTML(li));});
        }
        render() {
            const element = document.createElement('div');
            element.classList.add('catalog-item');
            element.innerHTML = `
            <div class="catalog-item__wrapper">
                <div class="catalog-item__content catalog-item__content_active">
                    <img src=${this.img} alt=${this.title} class="catalog-item__img">
                    <div class="catalog-item__subtitle">${this.title}</div>
                    <div class="catalog-item__descr">${this.descr}</div>
                    <a href="#" class="catalog-item__link">Подробнее</a>
                </div>
                <div class="catalog-item__list">
                    ${this.list}
                    <a href="#" class="catalog-item__link">Назад</a>
                </div>
            </div>
            <hr>
            <div class="catalog-item__footer">
                <div class="catalog-item__prices">
                    <div class="catalog-item__old-price">${this.oldPrice} руб.</div>
                    <div class="catalog-item__price">${this.newPrice} руб.</div>
                </div>
                <button class="button button_cat-item">Купить</button>
            </div>
            `;
            this.parent.append(element);
        }
    }

    getResource('./data/db.json')
        .then(data => {
            data.forEach(({img, title, descr, list, oldPrice, newPrice}) => {
                new NewCard(img, title, descr, list, oldPrice, newPrice, '.catalog__content').render();n jm.//
            });
        });

      //Modal windows
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });
    $('.button_cat-item').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true,
                },
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Имя не может быть короче {0} символов")
                },
                
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, ввдедите свой e-mail",
                    email: "Некорректный email"
                },
            },
        });
    };
    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');
    
    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
        });
        return false; 
    });

    //Smooth scroll and page up

    $(window).scroll(function() {
        if($(this).scrollTop() >1200) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: 
            $(_href).offset().top+"px"
        });
        return false;
    });
});