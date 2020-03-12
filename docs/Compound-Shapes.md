## Compound shapes

There are 2 ways to use compound shapes. Automatically generated and manually generated. The automatically generated follow the parent child structure of three.js objects. To manually generate a compound shape, simply add multiple shapes to the second parameter of `physics.add.existing()`

### Automatically

```javascript
// example: https://enable3d.io/examples/native-three-with-physics.html

const material = new THREE.MeshLambertMaterial({ color: 0xffff00 })

const sphere = new THREE.Mesh(new THREE.SphereBufferGeometry(0.25), material)
sphere.position.set(0, -0.8, 0)

const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(0.4, 0.8, 0.4), material)
cube.position.set(5, 2, 5)

// add sphere as child of cube
cube.add(sphere)

// add cube to the scene
scene.add(cube)

cube.position.set(5, 5, 5)
cube.rotation.set(0, 0.4, 0.2)

// add physics to the cube
// this will automatically generate a compound shape
physics.add.existing(cube)
```

### Manually

```javascript
// example: https://enable3d.io/examples/compare-physics-body-shapes.html

physics.add.existing(object, {
  shapes: [
    { shape: 'box', width: 0.5, height: 1, depth: 0.4, y: -0.5, z: 0.5 },
    { shape: 'box', width: 2.4, height: 0.6, depth: 0.4, z: -0.4, y: 0.2 },
    { shape: 'sphere', radius: 0.65, z: -0.25, y: 0.35 },
    { shape: 'box', width: 1.5, height: 0.8, depth: 1, y: 0.2, z: 0.2 }
  ]
})
```
