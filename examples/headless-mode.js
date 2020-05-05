const ENABLE3D = require('@enable3d/ammo-physics')
const Ammo = require('@enable3d/ammo-physics/ammo/ammo.js')

const { ServerClock, AmmoPhysics } = ENABLE3D

class ServerScene {
  constructor() {
    this.init()
    this.create()
  }

  init() {
    // init the AmmoPhysics in 'headless' mode
    this.physics = new AmmoPhysics('headless')
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

    // you can use you own clock if you want
    // '@enable3d/ammo-physics' does also exports the three.js Clock
    const clock = new ServerClock()

    /**
     * Once version > 0.0.17 is available, you should disable
     * high accuracy clocking while developing to save some cpu power.
     * "clock.disableHighAccuracy()"
     */

    clock.onTick(delta => this.update(delta))
  }

  update(delta) {
    this.physics.update(delta * 1000)

    const box = this.objects[1]

    box.body.transform()
    const y = box.body.position.y.toFixed(2)

    /**
     * In version > 0.0.17 you will be able to simply do
     * "const y = box.position.y.toFixed(2)"
     * without calling "box.body.transform()"
     * just like you would in non-headless mode
     */

    // will print the y position of the box from 5.00 to 1.00
    if (y > 1) console.log('y', box.body.position.y.toFixed(2))

    // TODO
    // send new positions to the client (via geckos.io)
  }
}

// wait for Ammo to be loaded
Ammo().then(() => {
  new ServerScene()
})
