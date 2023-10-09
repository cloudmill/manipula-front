import Lottie from 'lottie-web'

const loader = document.getElementById('loader-main')
const loaderEl = document.getElementById('loader')

if (loader) {
  Lottie.loadAnimation({
    wrapper: loaderEl,
    animType: 'svg',
    loop: true,
    path: 'assets/animations/preloader.json',
  })

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded')
    }, 1000)

    setTimeout(() => {
      loader.remove()
    }, 2500)
  })
}
