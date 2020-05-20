## Compound shapes

There are 3 ways to use compound shapes. Automatically generated (child or group) and manually generated. The automatically generated follow three.js objects structure. To manually generate a compound shape, simply add multiple shapes to the second parameter of `physics.add.existing()`

### Automatically

```js
// example: https://enable3d.io/examples/play-with-physics-bodies.html

// compound shape (child based)
// (the center of mass is the center of the box)
let box1 = this.add.box({ x: 0, y: 2 })
let sphere3 = this.add.sphere({ radius: 0.5, x: 0.25, y: 0.5 }) // relative position to box1
box1.add(sphere3)
this.physics.add.existing(box1)

// compound shape (group based)
// (the center of mass is 0,0,0)
let group = new THREE.Group()
const body = this.add.box({ height: 0.8, y: 1, width: 0.4, depth: 0.4 }, { lambert: { color: 0xffff00 } })
const head = this.add.sphere({ radius: 0.25, y: 1.7, z: 0.05 }, { lambert: { color: 0xffff00 } })
group.add(body, head)
group.position.setX(3)
this.add.existing(group)
this.physics.add.existing(group)
```

### Manually

```javascript
// example: https://enable3d.io/examples/play-with-physics-bodies.html

// custom compound shape
const box = this.add.box({ x: 9 })
const compound = [
  { shape: 'box', width: 0.5, height: 1, depth: 0.4, y: -0.5, z: 0.5 },
  { shape: 'box', width: 2.4, height: 0.6, depth: 0.4, z: -0.4, y: 0.2 },
  { shape: 'sphere', radius: 0.65, z: -0.25, y: 0.35 },
  { shape: 'box', width: 1.5, height: 0.8, depth: 1, y: 0.2, z: 0.2 }
]
this.physics.add.existing(box, { compound })
```
