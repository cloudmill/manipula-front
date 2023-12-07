import './styles/app.scss'
// import AOS from 'aos'

import './scripts/forms'

import { swiperInit } from './scripts/sliders.ts'
import { fancyboxInit } from './scripts/fancybox.ts'
import { dropdown } from './scripts/dropdown.js'
import { tabs } from './scripts/tabs.js'

window.addEventListener('DOMContentLoaded', () => {
  swiperInit()
  fancyboxInit()
  dropdown()
  tabs()
})
