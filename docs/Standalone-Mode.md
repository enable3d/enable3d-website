## Using Enable3d in Standalone Mode

```js
import { ThreeScene, PhysicsLoader, THREE } from '@enable3d/three-graphics'

class MainScene extends ThreeScene {
  init() {
    // setPixelRatio
    const DPR = window.devicePixelRatio
    this.renderer.setPixelRatio(Math.min(2, DPR))
  }

  preload() {
    // preload your assets here
  }

  create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    this.warpSpeed()

    // enable physics debug
    this.physics.debug.enable()

    // position camera
    this.camera.position.set(10, 10, 20)

    // blue box
    this.box = this.add.box({ y: 2 }, { lambert: { color: 'deepskyblue' } })

    // pink box
    this.physics.add.box({ y: 10 }, { lambert: { color: 'hotpink' } })

    // green sphere
    const geometry = new THREE.SphereGeometry(0.8, 16, 16)
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(0.2, 3, 0)
    this.scene.add(cube)

    // add physics green sphere
    this.physics.add.existing(cube)
  }

  update() {
    this.box.rotation.x += 0.01
    this.box.rotation.y += 0.01
  }
}
PhysicsLoader('/lib', () => new MainScene())
```
