## Physics Configuration

When we add Enable3d to the scene, there are a few choices we can make.

```js
new Project({ gravity: { x: 0, y: -9.81, z: 0 }, maxSubSteps: 4, fixedTimeStep: 1 / 60 })
```

- **gravity** `default { x: 0, y: -9.81, z: 0 }` _Sets the amount and direction of gravitational forces_

- **maxSubSteps** `default 2` _Set the max sub steps allowed._

- **fixedTimeStep** `default 1 / 60` _This number determines how much time one simulation step is to simulate. The smaller the number, the more accurate (and slower) the simulation._

You must always satisfy the equation **timeStep(fps) < maxSubSteps \* fixedTimeStep**
