'use strict'

// non render-blocking way to defer a task
const task = task => setTimeout(task, 0)

const main = function () {
  const { jsx, render } = nanoJSX

  const addFloatingButton = () => {
    // link to repository
    let repo = 'https://github.com/enable3d/enable3d-website/tree/master/src'
    let pathname = window.location.pathname

    // link to .js file if it is a "headless mode" example
    if (/\headless/.test(pathname)) pathname = pathname.replace(/\.html$/, '.js')

    // add css to the head
    task(() => {
      const element = jsx`<link rel="stylesheet" href="/css/floating-action-button.css?ver=1.0.0" />`
      render(element, document.head, false)
    })

    // add button
    task(() => {
      const element = jsx`
        <div>
          <a href="${repo + pathname}">
            <div id="floating-action-button">
              <div>${'❮❯'}</div>
            </div>
          </a>
        </div>`
      render(element, document.body, false)
    })
  }

  const addGithubCorner = () => {
    task(() => {
      const githubCorner = jsx`
        <div>
        </div>`
      render(githubCorner, document.body, false)
    })
  }

  addFloatingButton()
  addGithubCorner()
}

// first of all, load Nano JSX, then execute all the rest
window.addEventListener('load', function () {
  const script = document.createElement('script')
  script.src = 'https://unpkg.com/nano-jsx@0.0.15/bundles/nano.slim.min.js'
  script.type = 'text/javascript'
  script.addEventListener('load', main)
  document.getElementsByTagName('head')[0].appendChild(script)
})
