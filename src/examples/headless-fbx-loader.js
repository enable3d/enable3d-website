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

    const FBXLoader = new Loaders.FBXLoader()
    FBXLoader.load(path.resolve(__dirname, '../assets/fbx/Idle.fbx')).then(fbx => {
      const robot = new ExtendedObject3D()
      robot.name = 'robot'

      robot.add(fbx)
      robot.scale.set(0.05, 0.05, 0.05)
      robot.position.set(0, 10, 0)

      const physicsOptions = {
        addChildren: false,
        shape: 'hull' // or any other shape you want
      }

      this.physics.add.existing(robot, physicsOptions)
      this.robot = robot
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

    if (!this.robot) return // robot has not been parsed yet

    const y = this.robot.position.y.toFixed(2)

    // watch the y position fall down from 5 to the ground
    if (y > 2) console.log('y:', y)

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
