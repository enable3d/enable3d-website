var _ammo = require('@enable3d/ammo-on-nodejs/ammo/ammo.js')
const { Physics, ServerClock, Loaders, ExtendedObject3D } = require('@enable3d/ammo-on-nodejs')
const path = require('path')

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

    this.objects = [ground]

    const GLTFLoader = new Loaders.GLTFLoader()
    GLTFLoader.load(path.resolve(__dirname, '../assets/glb/suzanne.glb')).then(gltf => {
      const child = gltf.scene.children[0]
      const suzanne = new ExtendedObject3D()

      suzanne.add(child)
      suzanne.position.set(0, 5, 0)

      const physicsOptions = {
        addChildren: false,
        shape: 'hacd' // or any other shape you want
      }

      this.factory.add.existing(suzanne)
      this.physics.add.existing(suzanne, physicsOptions)

      suzanne.body.setFriction(1)

      this.objects.push(suzanne)
    })

    // clock
    const clock = new ServerClock()

    // for debugging you disable high accuracy
    // high accuracy uses much more cpu power
    if (process.env.NODE_ENV !== 'production') clock.disableHighAccuracy()

    clock.onTick(delta => this.update(delta))
  }

  update(delta) {
    this.physics.update(delta * 1000)

    const suzanne = this.objects[1]
    if (!suzanne) return // suzanne has not been parsed yet

    const y = suzanne.position.y.toFixed(2)

    // watch the y position fall down from 5 to the ground
    if (y > 2) console.log('y:', suzanne.body.position.y.toFixed(2))

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
