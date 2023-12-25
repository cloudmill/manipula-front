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

        case 'news':
          slider_options = {
            ...slider_options,

            modules: [Navigation],

            slidesPerView: 'auto',

            breakpoints: {
              [1024]: {
                slidesPerView: 1,
              },
            },
          }
          break

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

      if (
        slider_id === 'main' &&
        window.matchMedia('(min-width: 1024px)').matches
      ) {
        const controlPrev = document.querySelector('[data-prev=main]')
        const controlNext = document.querySelector('[data-next=main]')

        function getSlideBg(selector: string) {
          return document
            .querySelector(`.main-slider-slide.swiper-slide-${selector}`)
            ?.querySelector('[data-for-parallax]')
        }

        // controlPrev?.addEventListener('click', () => {
        //   getSlideBg('active')?.setAttribute('data-swiper-parallax', '')
        //   getSlideBg('prev')?.setAttribute('data-swiper-parallax', '-30%')

        //   slider_el.slidePrev()
        // })

        // controlNext?.addEventListener('click', () => {
        //   getSlideBg('active')?.setAttribute('data-swiper-parallax', '30%')
        //   getSlideBg('next')?.setAttribute('data-swiper-parallax', '')

        //   slider_el.slideNext()
        // })
      }
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
}
