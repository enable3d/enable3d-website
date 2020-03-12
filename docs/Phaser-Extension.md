## Using Enable3d as a 3d objects and physics extension for Phaser

```js
// STEP 1: Add the libraries with "npm install phaser @enable3d/phaser-extension"
import Phaser from 'phaser'
import enable3d, { Scene3D, Canvas } from '@enable3d/phaser-extension'

// Extend your Scene with Scene3D instead of Phaser.Scene
class MainScene extends Scene3D {
  constructor() {
    super({ key: 'MainScene' })
  }

  init() {
    // Request a worm whole to the third dimension.
    this.requestThirdDimension()
  }

  create() {
    // Drive through the hole into the third dimension.
    this.accessThirdDimension()

    // Journey through the third dimension at warp speed.
    this.third.warpSpeed()

    // Add your first 3d object.
    this.third.add.box()

    // Add another box with physics enabled.
    this.third.physics.add.box()
  }
}

const config = {
  // Set type to Phaser.WEBGL
  type: Phaser.WEBGL,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  scene: [MainScene],
  // Add a custom canvas
  // The default Phaser canvas is not compatible with three.js
  ...Canvas()
}

window.addEventListener('load', () => {
  // Wrap enable3d around your Phaser game.
  // (First copy all ammo file to your public folder)
  enable3d(() => new Phaser.Game(config)).withPhysics('/lib')
})
```
