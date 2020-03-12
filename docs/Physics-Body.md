## Physics Body

### Types

There are 4 different body types you can choose from by setting `object.body.setCollisionFlags(number)` accordingly.

- 0 - Dynamic
- 1 - Static
- 2 - Kinematic
- 4 - Ghost (aka Sensor or NO_CONTACT_RESPONSE).

#### Dynamic

The dynamic bodies react to force and gravity and you can apply velocity and torque to them.

```js
// example: https://enable3d.io/examples/first-phaser-game-3d-version.html

jump() {
  dynamicObject.body.applyForceY(16)
}
```

#### Static

These object are just there but do not move at all.

#### Kinematic

These bodies do NOT react to force or gravity. You can only move them by adjusting its position or rotation.

```js
// example: https://enable3d.io/examples/kinematic-body-orbiting-around-sun.html

update() {
  kinematicObject.position.set(0,5,0)
  kinematicObject.rotation.x =+ 0.01
  // set needUpdate to true, every time you want
  // to adjust the position or rotation of a kinematic body
  kinematicObject.body.needUpdate = true
}
```

#### Ghost

These bodies do never interact with other bodies. But they fire collision events. Use them as sensory in your game. Ghost can be dynamic (4), static (5) or kinematic (6), by settings the `collisionFlags` accordingly.

## Methods

You can use all these methods on a dynamic body:

- **body.setVelocity(x, y, z)**
- **body.setAngularVelocity(x, y, z)**
- **body.applyForce(x, y, z)**
- **body.setRestitution(value)** _A value from 0 to 1_
- **body.setFriction(value)** _A value from 0 to 1_
- **body.setLinearFactor(x, y, z)** _0 for disable, 1 for enable_
- **body.setAngularFactor(x, y, z)** _0 for disable, 1 for enable_

Getters:

- **body.velocity.(x,y,z)**
- **body.angularVelocity.(x,y,z)**
