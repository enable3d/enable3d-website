'use strict'
var lazyLoad = function () {
  var lazyImages = Array.from(document.querySelectorAll('img.lazy'))
  lazyImages.forEach(function (lazyImage) {
    if (lazyImage.dataset && lazyImage.dataset.src) {
      // fetch the image to the browser cache
      fetch(lazyImage.dataset.src, { mode: 'no-cors' })
        .then(function () {
          // replace the new image with the placeholder
          lazyImage.src = lazyImage.dataset.src
        })
        .catch(function () {
          console.warn('Failed to fetch', lazyImage.dataset.src)
        })
    }
  })
}
setTimeout(function () {
  lazyLoad()
}, 200)
