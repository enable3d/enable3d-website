## Getting Started

The project enable3d offers 4 different ways. As a Standalone 3D Framework, a Physics Plugin for [three.js](https://threejs.org/), as a 3D Objects and Physics extension for [Phaser](http://phaser.io/) or as a library to run Ammo.js on Node.js

In this guide, you will learn how to use the Standalone 3D Framework. Most of what you learn, will be applicable to all packages. Just take a look at the [examples](https://enable3d.io/examples.html) to see what Enable3d can do and how to use the different packages.

_Note: Not everything is documented yet, the [examples](https://enable3d.io/examples.html) page helps a lot!_

_Help: Do you know something that is not documented yet? Help improving the documentation on [GitHub](https://github.com/enable3d/enable3d-website/tree/master/src/docs)!_

### Introduction Video

Watch a great introduction video on <a target="_blank" href="https://youtu.be/j6nv3JIAFLk">YouTube</a>

### Basic Setup

```ts
// import the UMD bundle enable3d.framework.min.js
// or from npm enable3d
import { Project, Scene3D, PhysicsLoader } from 'enable3d'

class MainScene extends Scene3D {
  constructor() {
    super('MainScene')
  }

  async init() {
    this.renderer.setPixelRatio(1)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  async preload() {
    // preload your assets here
  }

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    // enable physics debug
    this.physics.debug.enable()

    // position camera
    this.camera.position.set(10, 10, 20)

    // blue box (without physics)
    this.add.box({ y: 2 }, { lambert: { color: 'deepskyblue' } })

    // pink box (with physics)
    this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })
  }

  update() {
    this.box.rotation.x += 0.01
    this.box.rotation.y += 0.01
  }
}

// set your project configs
const config = { scenes: [MainScene] }

// load the ammo.js file from the /lib folder and start the project
PhysicsLoader('/lib', () => new Project(config))
```

### Native Three.js Objects

You can use native Three.js objects if you include THREE

```ts
import { THREE } from 'enable3d'

// green sphere
const geometry = new THREE.SphereGeometry(0.8, 16, 16)
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0.2, 3, 0)
this.scene.add(cube)
// add physics to an existing object
this.physics.add.existing(cube)
```

### Extended Three.js Objects

To have more functionalities and a better compatibility, use `new ExtendedMesh()` and `new ExtendedObject3D()` instead of `new THREE.Mesh()` and `new THREE.Object3D()`

```ts
import { THREE, ExtendedMesh, ExtendedObject3D } from 'enable3d'

const cube = new THREE.Mesh(geometry, material)
// instead of
const cube = new ExtendedMesh(geometry, material)

const object = new ExtendedObject3D()
// instead of
const object = new THREE.Object3D()
```
