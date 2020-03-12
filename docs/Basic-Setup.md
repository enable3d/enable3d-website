## Basic Setup

The project enable3d can be used in 3 different ways. As a physics plugin for [three.js](https://threejs.org/), as a 3d objects and physics extension for [Phaser](http://phaser.io/), or as a standalone 3d framework.

Take a look at the [examples](https://enable3d.io/examples.html) to see what Enable3d can do.

### Using as a physics plugin for three.js

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="/lib/three.min.js"></script>
    <script src="/lib/enable3d.ammoPhysics.min.js"></script>
  </head>

  <body>
    <script>
      // or get it from npm @enable3d/ammo-physics
      const { AmmoPhysics, PhysicsLoader } = ENABLE3D

      const MainScene = () => {
        // scene
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf0f0f0)

        // camera
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.set(10, 10, 20)

        // renderer
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(renderer.domElement)

        // lights
        scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1))
        scene.add(new THREE.AmbientLight(0x666666))
        const light = new THREE.DirectionalLight(0xdfebff, 1)
        light.position.set(50, 200, 100)
        light.position.multiplyScalar(1.3)

        // physics
        const physics = new AmmoPhysics(scene)

        // blue box
        const geometry = new THREE.BoxBufferGeometry()
        const material = new THREE.MeshLambertMaterial({ color: 0x2194ce })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(0, 5, 0)
        scene.add(cube)

        // add physics to the box
        physics.add.existing(cube)

        // clock
        const clock = new THREE.Clock()

        // animation loop
        const animate = () => {
          physics.update(clock.getDelta() * 1000)

          renderer.render(scene, camera)

          requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }

      // load ammo.js from the /lib folder
      PhysicsLoader('/lib', () => MainScene())
    </script>
  </body>
</html>
```
