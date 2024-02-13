export function initContactsMap() {
  if (document.querySelector('#contacts-map')) {
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

          const assetsPath = window.location.hostname && (window.location.hostname !== 'cloudmill.github.io') ? '/local/templates/main/assets' : 'assets';

          const coords1 = [55.695393, 37.421967]
          const coords2 = [55.681945, 37.424345]
          const markSize = 40

          const placemark1 = new ymaps.Placemark(
            coords1,
            {},
            {
              iconLayout: 'default#image',
              // iconImageHref: `${window.CONFIG.path}assets/images/svg/office-placemark.svg`,
              iconImageHref: `${assetsPath}/images/svg/placemark-blue.svg`,
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
              iconImageHref: `${assetsPath}/images/svg/placemark-dark.svg`,
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
    })
  }
}
