## Position, Rotation and Scale

### Position

You can only set the position (and rotation) at any moment if it the body is of type [kinematic](#kinematic). See [Body Types](#body-types). For all other types, you have to set the position and the rotation before you add a physics body to it.

Example of a non kinematic box:

```js
const { factory } = physics

// add a box without physics
const box = factory.add.box()
// set position and rotation
box.position.set(10, 10, 0)
box.rotation.set(0, Math.PI / 2, 0)
// add physics to the box
physics.add.existing(box)
```

But if you really need to set a new position or rotation to any other type than kinematic, see the [Teleport Example](https://enable3d.io/examples/teleport-a-dynamic-body.html).

### Rotation

Same as [Position](#position).

### Scale

You can't scale a physics body after added to the world. But you can scale your object before adding physics to it or remove the physics body and add a new one.

Example of a Torus:

```js
const { factory } = physics

// add torus (without physics)
let torus = factory.add.torus()
// scale the torus
torus.scale.set(2, 2, 2)
// add a rigid body to it
physics.add.existing(torus, { shape: 'hacd' })

// add torus (with physics)
let torus = physics.add.torus()
// remove the rigid body
physics.destroy(torus.body)
// scale the torus
torus.scale.set(2, 2, 2)
// add a new rigid body to it
physics.add.existing(torus, { shape: 'hacd' })
```
