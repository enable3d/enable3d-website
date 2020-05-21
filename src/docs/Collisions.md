## Collisions

You can check all collisions on a single body or check for collision between 2 specific bodies. The event will be `start`, `colliding` or `end`.

```javascript
// all collision for blueBox
blueBox.body.on.collision((otherObject, event) => {
  if (otherObject.name !== 'ground') {
    console.log('blueBox collided with another object than the ground')
  }
})
```

```javascript
// collision between blueBox and redBox
physics.add.collider(blueBox, redBox, event => {
  console.log(`blueBox and redBox: ${event}`)
})
```

See the [collisions example](http://127.0.0.1:8080/examples/collision-detection.html) for details on implementing and using this event.

### Motion Clamping

When an object has a high velocity, collisions can be missed if it moves through and past other objects between simulation steps. To fix this, enable CCD motion clamping. For a cube of size 1 try:

```javascript
// Enable CCD if the object moves more than 1 meter in one simulation frame
object.body.setCcdMotionThreshold(1)

// Set the radius of the embedded sphere such that it is smaller than the object
object.body.setCcdSweptSphereRadius(0.2)
```
