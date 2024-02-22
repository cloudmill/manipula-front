import { log } from 'console'
import Swiper from 'swiper'
import {
  Navigation,
  Pagination,
  Autoplay,
  Parallax,
  Thumbs,
} from 'swiper/modules'
import { SwiperOptions } from 'swiper/types/swiper-options'

export function swiperInit() {
  const sliders = document.querySelectorAll('[data-slider-id]')

  if (sliders.length > 0) {
    sliders.forEach((slider) => {
      const slider_id = slider.getAttribute('data-slider-id')

      let slider_options: SwiperOptions = {
        navigation: {
          prevEl: `[data-prev=${slider_id}]`,
          nextEl: `[data-next=${slider_id}]`,
        },
      }

      switch (slider_id) {
        case 'main':
          slider_options = {
            ...slider_options,

            modules: [Pagination, Autoplay],

            loop: true,
            speed: 1000,
            autoplay: {
              delay: 4000,
            },

            pagination: {
              el: `[data-swiper-pagination=${slider_id}]`,
              type: 'bullets',
            },
          }

          break

        case 'products':
          slider_options = {
            ...slider_options,

            modules: [Navigation],

            slidesPerView: 'auto',
            spaceBetween: 20,

            // breakpoints: {
            //   [1024]: {
            //     slidesPerView: 6,
            //     spaceBetween: 20,
            //   },
            // },
          }
          break

        case 'about':
          slider_options = {
            ...slider_options,

            modules: [Navigation, Pagination, Autoplay],

            loop: true,
            speed: 1000,
            autoplay: {
              delay: 4000,
            },

            pagination: {
              el: `[data-swiper-pagination=${slider_id}]`,
              type: 'bullets',
            },
          }
          break

        case 'series':
        case 'solutions':
        case 'brands':
          slider_options = {
            ...slider_options,

            modules: [Navigation],

            slidesPerView: 'auto',
          }
          break

        // case 'news':
        // case 'news-mob':
        //   slider_options = {
        //     ...slider_options,

        //     modules: [Navigation],

        //     slidesPerView: 'auto',

        //     breakpoints: {
        //       [1024]: {
        //         slidesPerView: 1,
        //       },
        //     },
        //   }
        //   break

        case 'sol-steps':
          function getInitSlide() {
            return Number(slider.getAttribute('data-active-slide'))
          }

          slider_options = {
            slidesPerView: 'auto',
            initialSlide: getInitSlide(),
          }
          break

        default:
          break
      }

      const slider_el = new Swiper(
        `[data-slider-id="${slider_id}"]`,
        slider_options
      )
    })
  }

  const productThumbs = new Swiper('#product-thumbs', {
    slidesPerView: 'auto',
    spaceBetween: 8,
  })

  new Swiper('#product-slider', {
    modules: [Navigation, Thumbs],

    loop: true,

    navigation: {
      prevEl: `#product-slider-prev`,
      nextEl: `#product-slider-next`,
    },

    thumbs: {
      swiper: productThumbs,
    },
  })

  const historyThumbs = new Swiper('#history-thumbs', {
    slidesPerView: 'auto',
  })

  new Swiper('#history-slider', {
    modules: [Navigation, Thumbs],

    loop: true,

    navigation: {
      prevEl: `#history-slider-prev`,
      nextEl: `#history-slider-next`,
    },

    thumbs: {
      swiper: historyThumbs,
    },
  })

  new Swiper('#product-bottom-slider', {
    modules: [Navigation, Thumbs],

    slidesPerView: 1,
    spaceBetween: 8,

    breakpoints: {
      [375]: {
        slidesPerView: 'auto',
      },
      [1024]: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },

    navigation: {
      prevEl: `#product-bottom-prev`,
      nextEl: `#product-bottom-next`,
    },
  })

  const newsThumbs = new Swiper('#news', {
    slidesPerView: 'auto',
    initialSlide: 1,
  })

  const newsMain = new Swiper('#news-main', {})

  const newsPrev = document.getElementById('news-prev')
  const newsNext = document.getElementById('news-next')

  if (newsMain.activeIndex === 0) {
    newsPrev?.setAttribute('disabled', 'true')
  }

  newsPrev?.addEventListener('click', () => {
    newsThumbs.slidePrev()
    newsMain.slidePrev()

    const slidesCount = newsThumbs.slides.length

    if (newsMain.activeIndex === 0) {
      newsPrev?.setAttribute('disabled', 'true')
    } else {
      newsPrev?.removeAttribute('disabled')
    }
    if (newsThumbs.activeIndex === slidesCount - 2) {
      newsNext?.setAttribute('disabled', 'true')
    } else {
      newsNext?.removeAttribute('disabled')
    }
  })
  newsNext?.addEventListener('click', () => {
    newsThumbs.slideNext()
    newsMain.slideNext()

    const slidesCount = newsThumbs.slides.length

    if (newsThumbs.activeIndex === slidesCount - 2) {
      newsNext?.setAttribute('disabled', 'true')
    } else {
      newsNext?.removeAttribute('disabled')
    }
    if (newsMain.activeIndex === 0) {
      newsPrev?.setAttribute('disabled', 'true')
    } else {
      newsPrev?.removeAttribute('disabled')
    }
  })
}
