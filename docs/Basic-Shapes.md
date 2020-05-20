## Basic Shapes

Enable3d supports these shapes:

- Plane
- Box
- Sphere
- Cylinder
- Cone
- Capsule
- Compound
- Hull
- HACD (Hierarchical Approximate Convex Decomposition)
- ConvexMesh
- ConcaveMesh
- Heightfield (not yet)

Enable3d does automatically recognize the shape of simple three.js object when adding it via `physics.add.existing(object)`. But you can also change the shape like so `physics.add.existing(object, { shape: 'hacd' })`

Take a look at the [compare-physics-body-shapes](https://enable3d.io/examples/compare-physics-body-shapes.html) and the [play-with-physics-bodies](https://enable3d.io/examples/play-with-physics-bodies.html) examples to see creating & adding shapes in action.
