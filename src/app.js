import './styles/app.scss'
// import AOS from 'aos'

// import './scripts/preloader'
// import './scripts/forms'

// import { swiperInit } from './scripts/sliders.ts'
import { fancyboxInit } from './scripts/fancybox.ts'
// import { tooltip } from './scripts/tippy'
// import { dropdown } from './scripts/dropdown'
// import { tabs } from './scripts/tabs'
// import { chickAnimation } from './scripts/main-animations'

window.addEventListener('DOMContentLoaded', () => {
  //   const loader = document.getElementById('loader-main')
  //   if (loader) {
  //     document.querySelector('body').style.overflow = 'hidden'
  //   }

  fancyboxInit()
  //   tooltip()
  //   dropdown()
  //   tabs()

  //   // на главной свайпер за пускается по load
  //   if (!document.querySelector('[data-slider-id=main]')) {
  //     swiperInit()
  //   }

  //   const searchReset = document.querySelector('[data-search-reset]')

  //   if (searchReset) {
  //     // console.log(searchReset)
  //     searchReset.addEventListener('click', () => {
  //       console.log(document.querySelector('[data-search]'))
  //       document.querySelector('[data-search]').value = ''
  //     })
  //   }

  //   const insertScript = document.querySelector('[data-insert-script]')
  //   if (insertScript) {
  //     insertScript.innerText =
  //       "function cityChoose(name) {document.querySelector('[data-cities-drop-inner]').innerText = name}"
  //   }
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
