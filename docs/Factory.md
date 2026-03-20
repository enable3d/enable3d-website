## Factory

Enable3d provides a simple factory for creating physical objects.

```js
// will add a 5x3x1 red box
const box = physics.add.box(
  { x: 1, y: 2, z: 10, width: 5, height: 3, depth: 1, mass: 2, collisionFlags: 0 },
  { lambert: { color: 'red', transparent: true, opacity: 0.5 } }
)
```

If you want to use the factory without adding physics to the object, extract the factory from physics.

```js
// get the objects factory
const { factory } = physics

// add the same box as above, but without physics
const box = factory.add.box({ x: 1, y: 2, z: 10, width: 5, height: 3, depth: 1 }, { lambert: { color: 'red', transparent: true, opacity: 0.5 } })

// you can later add physics to it
physics.add.existing(box, { mass: 2, collisionFlags: 0 })
```

You can also add custom materials like so:

```js
physics.add.box({}, { custom: THREE.MeshLambertMaterial({ color: 0x2194ce }) })
```
