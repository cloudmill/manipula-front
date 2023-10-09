import * as ScrollMagic from 'scrollmagic'
import { TweenMax, TimelineMax } from 'gsap'
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap'
import Linear from 'gsap'
import Lottie from 'lottie-web'

ScrollMagicPluginGsap(ScrollMagic, TweenMax)

export function chickAnimation() {
  const list = document.querySelector('.chick-list')
  const el1 = document.querySelector('[data-lottie-1]')
  const el2 = document.querySelector('[data-lottie-2]')
  const el3 = document.querySelector('[data-lottie-3]')
  const el4 = document.querySelector('[data-lottie-4]')
  const el5 = document.querySelector('[data-lottie-5]')
  const el6 = document.querySelector('[data-lottie-6]')
  const card1 = document.querySelector('[data-chick-card-1]')
  const card2 = document.querySelector('[data-chick-card-2]')
  const chick = document.querySelector('[data-chick-parallax]')
  const chickSec = document.querySelector('[data-chick-section]')

  if (list) {
    const anim1 = Lottie.loadAnimation({
      wrapper: el1,
      animType: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/fruit.json',
    })
    const anim2 = Lottie.loadAnimation({
      wrapper: el2,
      animType: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/char.json',
    })
    const anim3 = Lottie.loadAnimation({
      wrapper: el3,
      animType: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/hat_yellow.json',
    })
    const anim4 = Lottie.loadAnimation({
      wrapper: el4,
      animType: 'svg',
      loop: false,
      autoplay: false,
      path: 'assets/animations/hat_green.json',
    })
    const anim5 = Lottie.loadAnimation({
      wrapper: el5,
      animType: 'svg',
      loop: true,
      autoplay: false,
      path: 'assets/animations/grass_yellow.json',
    })
    const anim6 = Lottie.loadAnimation({
      wrapper: el6,
      animType: 'svg',
      loop: true,
      autoplay: false,
      path: 'assets/animations/grass_green.json',
    })

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
    const callback1 = (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.hasAttribute('data-lottie-1')
        ) {
          anim1.play()
        }
        if (
          entry.isIntersecting &&
          entry.target.hasAttribute('data-lottie-2')
        ) {
          anim2.play()
        }
      })
    }
    const observer1 = new IntersectionObserver(callback1, options)
    observer1.observe(el1)
    observer1.observe(el2)

    const callback2 = (entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.target.hasAttribute('data-chick-card-1')
        ) {
          anim3.play()
          anim5.play()
        }
        if (
          entry.isIntersecting &&
          entry.target.hasAttribute('data-chick-card-2')
        ) {
          anim4.play()
          anim6.play()
        }
      })
    }
    const observer2 = new IntersectionObserver(callback2, options)
    observer2.observe(card1)
    observer2.observe(card2)
  }

  if (chick && chickSec) {
    var controller = new ScrollMagic.Controller()
    const timeLine = new TimelineMax()
    const SCENE_DURATION = document.documentElement.clientHeight - 200

    timeLine.add(
      TweenMax.fromTo(
        chick,
        5,
        { y: '10%' },
        { y: '0%', ease: 'linear', immediateRender: false }
      )
    )
    new ScrollMagic.Scene({
      triggerElement: chickSec,
      duration: SCENE_DURATION,
      triggerHook: 1,
    })
      .setTween(timeLine)
      .addTo(controller)
  }
}
