import './styles/app.scss'
// import AOS from 'aos'

// import './scripts/preloader'
import './scripts/forms'

// import { swiperInit } from './scripts/sliders.ts'
import { fancyboxInit } from './scripts/fancybox.ts'

window.addEventListener('DOMContentLoaded', () => {
  //   const loader = document.getElementById('loader-main')
  //   if (loader) {
  //     document.querySelector('body').style.overflow = 'hidden'
  //   }

  fancyboxInit()
})

// window.addEventListener('load', () => {
//   const loader = document.getElementById('loader-main')
//   if (loader) {
//     setTimeout(() => {
//       AOS.init({
//         once: true,
//         offset: 0,
//         duration: 500,
//       })
//       document.querySelector('body').style.overflow = ''
//     }, 1500)
//   } else {
//     AOS.init({
//       once: true,
//       offset: 0,
//       duration: 500,
//     })
//   }

//   if (document.querySelector('[data-slider-id=main]')) {
//     swiperInit()
//   }

//   chickAnimation()
// })
