## Collisions

You can check all collisions on a single body or check for collision between 2 specific bodies or check all collisions on bodies with checkCollisions set to true. The event will be `start`, `colliding` or `end`.

```javascript
// all collision for blueBox (will set body.checkCollisions = true, on the blueBox)
blueBox.body.on.collision((otherObject, event) => {
  if (otherObject.name !== 'ground') {
    console.log('blueBox collided with another object than the ground')
  }
})
```

```javascript
// collision between blueBox and redBox (will set body.checkCollisions = true, on the blueBox and the redBox)
physics.add.collider(blueBox, redBox, event => {
  console.log(`blueBox and redBox: ${event}`)
})
```

```javascript
// show all collision for object that have { checkCollisions: true }
physics.collisionEvents.on('collision', data => {
  const { bodies, event } = data
  console.log(bodies[0].name, bodies[1].name, event)
})

const box = physics.add.box({ y: 10 })
box.body.checkCollisions = true // set checkCollisions to true
```

See the [collisions example](https://enable3d.io/examples/collision-detection.html) for details on implementing and using this event.

### Motion Clamping

When an object has a high velocity, collisions can be missed if it moves through and past other objects between simulation steps. To fix this, enable CCD motion clamping. For a cube of size 1 try:

```javascript
// Enable CCD if the object moves more than 1 meter in one simulation frame
object.body.setCcdMotionThreshold(1)

// Set the radius of the embedded sphere such that it is smaller than the object
object.body.setCcdSweptSphereRadius(0.2)
```
