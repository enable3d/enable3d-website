// https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video

let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'))
let active = false

const lazyLoad = function () {
  setTimeout(function () {
    lazyImages.forEach(function (lazyImage) {
      if (
        lazyImage.getBoundingClientRect().top <= window.innerHeight &&
        lazyImage.getBoundingClientRect().bottom >= 0 &&
        getComputedStyle(lazyImage).display !== 'none'
      ) {
        lazyImage.src = lazyImage.dataset.src
        if (lazyImage.dataset && lazyImage.dataset.srcset) lazyImage.srcset = lazyImage.dataset.srcset
        lazyImage.classList.remove('lazy')

        lazyImages = lazyImages.filter(function (image) {
          return image !== lazyImage
        })
      }
    })
  }, 200)
}
lazyLoad()
