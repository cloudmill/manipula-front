export function initContactsMap() {
  ymaps.ready(() => {
    if (document.querySelector('#contacts-map')) {
      try {
        const map = new ymaps.Map(
          'contacts-map',
          {
            center: [55.695393, 37.421967],
            zoom: 11,
            controls: ['smallMapDefaultSet'],
          },
          {
            maxZoom: 22,
          }
        )

        const coords1 = [55.695393, 37.421967]
        const coords2 = [55.681945, 37.424345]
        const markSize = 40

        const placemark1 = new ymaps.Placemark(
          coords1,
          {},
          {
            iconLayout: 'default#image',
            // iconImageHref: `${window.CONFIG.path}assets/images/svg/office-placemark.svg`,
            iconImageHref: `assets/images/svg/placemark-blue.svg`,
            iconImageSize: [markSize, markSize],
            iconImageOffset: [-markSize / 2, -markSize / 2],
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
          }
        )
        const placemark2 = new ymaps.Placemark(
          coords2,
          {},
          {
            iconLayout: 'default#image',
            // iconImageHref: `${window.CONFIG.path}assets/images/svg/office-placemark.svg`,
            iconImageHref: `assets/images/svg/placemark-dark.svg`,
            iconImageSize: [markSize, markSize],
            iconImageOffset: [-markSize / 2, -markSize / 2],
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
          }
        )

        map.geoObjects.add(placemark1)
        map.geoObjects.add(placemark2)

        map.YMap = map
      } catch (err) {
        console.error(err)
      }
    }

    if (document.querySelector('#where-buy-map')) {
      try {
        ymaps.ready(function () {
          const center = $('#where-buy-map').data('map-center').split(' ')
          const zoom = Number($('#where-buy-map').data('map-zoom'))

          var myMap = new ymaps.Map(
            'where-buy-map',
            {
              center: center ? center : [58.050234, 53.099332],
              zoom: zoom ? zoom : 5,
            },
            {
              searchControlProvider: 'yandex#search',
            }
          )

          // myPlacemark = new ymaps.Placemark(
          //   [59.934277, 30.309636],
          //   {},
          //   {
          //     iconLayout: 'default#image',
          //     // iconImageHref: '/local/templates/main/assets/images/placemark.svg',
          //     iconImageHref: window.config.path + 'assets/images/placemark.svg',
          //     iconImageSize: [45.71, 64],
          //     iconImageOffset: [-22, -64],
          //   }
          // )

          // myMap.geoObjects.add(myPlacemark)
        })
      } catch (err) {
        console.error(err)
      }
    }
  })
}
