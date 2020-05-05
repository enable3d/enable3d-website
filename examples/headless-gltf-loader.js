const ENABLE3D = require('@enable3d/ammo-physics')
const Ammo = require('@enable3d/ammo-physics/ammo/ammo.js')

// ExtendedObject3D will be exported from '@enable3d/ammo-physics' in the future
const ExtendedObject3D = require('@enable3d/common/dist/extendedObject3D').default

// we use the GLTFLoader from three.js
// so we include and prepare everything we need to make it work
const fs = require('fs')
const path = require('path')
const THREE = require('three')
global.THREE = THREE
require('three/examples/js/loaders/GLTFLoader')
// https://gist.github.com/donmccurdy/323c6363ac7ca8a7de6a3362d7fdddb4
const trimBuffer = buffer => {
  const { byteOffset, byteLength } = buffer
  return buffer.buffer.slice(byteOffset, byteOffset + byteLength)
}
const Loader = new THREE.GLTFLoader()
const suzannePath = path.resolve(__dirname, '../assets/glb/suzanne.glb')
const suzanneFile = fs.readFileSync(suzannePath)
const suzanneTrimmed = trimBuffer(suzanneFile)

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

    this.objects = [ground]

    Loader.parse(
      suzanneTrimmed,
      '',
      gltf => {
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
      },
      e => {
        console.error(e)
      }
    )

    // you can use you own clock if you want
    // '@enable3d/ammo-physics' does also exports the three.js Clock
    this.clock = new ServerClock()
    this.clock.onTick(delta => this.update(delta))
  }

  update(delta) {
    this.physics.update(delta * 1000)

    const suzanne = this.objects[1]
    if (!suzanne) return // suzanne has not been parsed yet

    suzanne.body.transform()
    const y = suzanne.body.position.y.toFixed(2)

    /**
     * In version > 0.0.17 you will be able to simply do
     * "const y = suzanne.position.y.toFixed(2)"
     * without calling "suzanne.body.transform()"
     * just like you would in non-headless mode
     */

    // watch the y position fall down from 5 to the ground
    if (y > 2) console.log('y', suzanne.body.position.y.toFixed(2))

    // TODO
    // send new positions to the client (via geckos.io)
  }
}

// wait for Ammo to be loaded
Ammo().then(() => {
  new ServerScene()
})
