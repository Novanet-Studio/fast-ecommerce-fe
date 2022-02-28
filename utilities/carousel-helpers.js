export const carouselFullwidth = {
    loop: true,
    slidesPerView: 7,
    spaceBetween: 1,
    scrollbar: {
        draggable: true
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: false
    },
    breakpoints: {
        1680: {
            slidesPerView: 6
        },
        1366: {
            slidesPerView: 5
        },
        1024: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 10
        }
    }
};
export const carouselStandard = {
    loop: true,
    slidesPerView: 5,
    spaceBetween: 10,
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
    },
    pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true
    },
    breakpoints: {
        1680: {
            slidesPerView: 5
        },
        1366: {
            slidesPerView: 4
        },
        1200: {
            pagination: false
        },
        1024: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 3
        },
        480: {
            slidesPerView: 2
        }
    }
};
export const carouselSingle = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 1,
    navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev'
    }
};
