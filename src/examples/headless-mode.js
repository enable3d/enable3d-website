var _ammo = require('@enable3d/ammo-on-nodejs/ammo/ammo.js')
const { Physics, ServerClock } = require('@enable3d/ammo-on-nodejs')

class ServerScene {
  constructor() {
    this.init()
    this.create()
  }

  init() {
    // test if we have access to Ammo
    console.log('Ammo', new Ammo.btVector3(1, 2, 3).y() === 2)

    // init the Physics
    this.physics = new Physics()
    this.factory = this.physics.factory
  }

  create() {
    const ground = this.physics.add.box({
      name: 'ground',
      width: 40,
      depth: 40,
      collisionFlags: 2,
      mass: 0
    })

    const box = this.physics.add.box({ name: 'box', y: 5 })

    /**
     * "this.physics.add.box({ name: 'box', y: 5 })"
     * is exactly the same as you would do:
     *
     * const geometry = new THREE.BoxGeometry()
     * const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
     * const box = new THREE.Mesh(geometry, material)
     * box.name = 'box' // give it a name
     * box.position.set(0, 5, 0) // set y to 5
     * this.physics.add.existing(box) // add physics to the box
     *
     * of course you would have to include three first
     * const THREE = require('three')
     */

    this.objects = [ground, box]

    // clock
    const clock = new ServerClock()

    // for debugging you disable high accuracy
    // high accuracy uses much more cpu power
    if (process.env.NODE_ENV !== 'production') clock.disableHighAccuracy()

    clock.onTick(delta => this.update(delta))
  }

  update(delta) {
    this.physics.update(delta * 1000)

    const box = this.objects[1]
    const y = box.position.y.toFixed(2)

    // will print the y position of the box from 5.00 to 1.00
    if (y > 1) console.log('y:', y)

    // TODO
    // send new positions to the client
  }
}

// wait for Ammo to be loaded
_ammo().then(ammo => {
  globalThis.Ammo = ammo

  // start server scene
  new ServerScene()
})
