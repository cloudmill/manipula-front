// import { defaults } from './fancybox'
// map
// const BREAKPOINT = 1280;
const BREAKPOINT = 1024
const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT}px)`)

export function initPlacemarks(map, isClearCurrent) {
  // vars
  const markWidth = 32
  const markHeight = 32

  if (isClearCurrent) {
    map.geoObjects.removeAll()
  }

  var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="balloon__content balloon__content_cluster">' +
      '$[properties.balloon]' +
      '</div>'
  )

  const clusterer = new ymaps.Clusterer({
    clusterIconLayout: ymaps.templateLayoutFactory.createClass(
      '<div class="cluster">{{ properties.geoObjects.length }}</div>'
    ),
    clusterBalloonItemContentLayout: customItemContentLayout,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    hideIconOnBalloonOpen: false,
    clusterIconShape: {
      type: 'Rectangle',
      coordinates: [
        [0, 0],
        [50, 50],
      ],
    },
  })

  clusterer.events.add(['balloonopen'], (e) => {
    const geoObjects = clusterer.getClusters()[0]?.getGeoObjects()
    geoObjects?.forEach((geoObject) => {
      const data = geoObject.properties._data
      const div = document.createElement('div')
      div.innerHTML = data.balloon
      const name = div.querySelector('.buy-page__title').textContent
      const placemarks = document.querySelectorAll('[data-placemark]')

      placemarks.forEach((item) => {
        const title = item.querySelector('.buy-page__title')

        if (title.textContent === name) {
          item.classList.add('active')
        }
      })
    })
  })

  clusterer.events.add(['balloonclose'], (e) => {
    const placemarks = document.querySelectorAll('[data-placemark].active')

    placemarks.forEach((item) => {
      item.classList.remove('active')
    })
  })

  // balloon layout
  const layout = ymaps.templateLayoutFactory.createClass(
    [
      '<div class="balloon">',
      '<div class="balloon__content">',
      '$[properties.balloon]',
      '</div>',
      '<div class="balloon__close"></div>',
      '<div class="balloon__arrow"></div>',
      '</div>',
    ].join(''),
    {
      build: function () {
        this.constructor.superclass.build.call(this)

        this._$element = $('.balloon', this.getParentElement())

        const close = this._$element.find('.balloon__close')
        close.bind('click', this.onCloseClick)
        this.applyElementOffset()
      },
      onSublayoutSizeChange: function () {
        layout.superclass.onSublayoutSizeChange.apply(this, arguments)

        if (!this._isElement(this._$element)) {
          return
        }

        this.applyElementOffset()

        this.events.fire('shapechange')
      },
      applyElementOffset: function () {
        this._$element.css({
          left: -(this._$element[0].offsetWidth / 2),
          top: -(this._$element[0].offsetHeight + markHeight + 4),
        })
      },
      getShape: function () {
        if (!this._isElement(this._$element)) {
          return layout.superclass.getShape.call(this)
        }

        var position = this._$element.position()

        return new ymaps.shape.Rectangle(
          new ymaps.geometry.pixel.Rectangle([
            [position.left, position.top],
            [
              position.left + this._$element[0].offsetWidth,
              position.top + this._$element[0].offsetHeight,
            ],
          ])
        )
      },
      onCloseClick: function () {
        map.balloon.close()
      },
      _isElement: function (element) {
        return element && element[0]
      },
    }
  )

  // добавление точек
  const placemarks = []
  let requests = []
  const placemarksParent = $('[data-placemarks]')
  const placemarksNodes = $('[data-placemark]')

  $('[data-placemark]').each(function () {
    console.log('GEO', $(this).data('placemark').trim())
    requests.push(ymaps.geocode($(this).data('placemark').trim()))
  })

  Promise.all(requests).then(function (res) {
    res.forEach((item, i) => {
      // данные
      let balloon = placemarksNodes.eq(i).html()
      const storeType = placemarksNodes.eq(i).data('store-type')

      // экспозиция
      const expositions = placemarksNodes.eq(i).data('placemark-exposition')

      if (expositions) {
        const expositionHtml = createExposition(expositions)

        balloon += expositionHtml
      }

      // placemark
      // const coordinates = $(this).data('placemark').split(' ');
      const coordinates = item.geoObjects.get(0).geometry.getCoordinates()
      const placemark = new ymaps.Placemark(
        coordinates,
        {
          balloon,
        },
        {
          iconLayout: 'default#image',
          // iconImageHref: `${window.CONFIG.path}/assets/images/svg/placemark-${storeType}.svg`,
          iconImageHref: `assets/images/svg/placemark-${storeType}.svg`,
          iconImageSize: [markWidth, markHeight],
          iconImageOffset: [-markWidth / 2, -markHeight / 2],

          balloonLayout: layout,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
        }
      )

      placemark.events.add(['balloonopen'], () => {
        placemarksNodes.eq(i).addClass('active')
      })

      placemark.events.add(['balloonclose'], () => {
        placemarksNodes.eq(i).removeClass('active')
      })

      if (mediaQuery.matches) {
        placemarksNodes.eq(i).on('click', function () {
          const parent = placemark.getParent()

          if (!parent) {
            map.setCenter(coordinates, 16)
          }

          try {
            placemark.balloon.open()
          } catch (e) {
            const cluster = findCluster(placemark, clusterer)

            clusterer.balloon.open(cluster)
          }
        })
      }

      placemarks.push(placemark)
    })
    // console.log(clusterer)
    clusterer.add(placemarks)
    map.geoObjects.add(clusterer)

    // позиционирование на точках
    map
      .setBounds(clusterer.getBounds(), {
        zoomMargin: Math.max(markWidth, markHeight),
      })
      .then(() => {
        if (placemarks.length === 1) {
          map.setZoom(15)
        }
      })
  })
}

function findCluster(placemark, clusterer) {
  const clusters = clusterer.getClusters()
  let result

  for (let i = 0; i < clusters.length; i++) {
    const objects = clusters[i].getGeoObjects()

    for (let j = 0; j < objects.length; j++) {
      if (objects[j] === placemark) {
        result = clusters[i]
        break
      }
    }
  }

  return result
}

export function initBuyMap() {
  if ($('#where-buy-map').length) {
    try {
      ymaps.ready(() => {
        const center = $('#where-buy-map').data('map-center').split(' ')
        const zoom = Number($('#where-buy-map').data('map-zoom'))

        // init
        const map = new ymaps.Map(
          'where-buy-map',
          {
            center: center ? center : [58.050234, 53.099332],
            zoom: zoom ? zoom : 5,
            controls: [],
          },
          {
            maxZoom: 22,
          }
        )

        if (!mediaQuery.matches) {
          map.behaviors.disable('drag')
        }

        initPlacemarks(map)

        // balloon close
        map.events.add('click', () => {
          if (map.balloon.isOpen()) {
            map.balloon.close()
          }
        })

        $('#where-buy-map')[0].YMap = map
      })
    } catch (err) {
      console.error(err)
    }
  }
}
