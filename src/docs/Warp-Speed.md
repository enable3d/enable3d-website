## Warp Speed

When building your projects, you need to set up the _third-dimension_ most of the time. For instance, you need a basic setup with at least one camera, lights, orbit controls, and so on. To design all these things takes a long time.

You can shorten that time by using Enable3d `warpSpeed()` function. The function supports the following features:

- light
- camera
- lookAtCenter
- ground
- grid
- orbitControls
- sky
- fog

By default, the function enables all the features.

```js
class MainScene extends Scene3D {

  async create() {
    // set up scene (light, ground, grid, sky, orbitControls)
    await this.warpSpeed()

    // additionally warpSpeed() returns the camera, ground, lights, orbitControls.
    const { camera, ground, lights, orbitControls } = await this.warpSpeed()

    // now modify the features (if needed)
    // example:
    camera.position.set(10, 10, 10)
    camera.lookAt(0, 5, 0)

    const { hemisphereLight, ambientLight, directionalLight } = lights
    hemisphereLight.intensity = 0.65

    orbitControls.target.set(0, 5, 0)
  }
```

If you only want to set up particular features, you can call the function passing the feature name.

```js
this.warpSpeed('light', 'ground', 'sky')
```

Also, if you want to enable all the features but some, you can specify the feature name with the minus sign.

```js
// enable all the features but the orbit controls
this.warpSpeed('-orbitControls')
```

The following sections provide some details on all features.

### Light

Including 'light' among the features in `warpSpeed()`, Enable3D will place three lights in the scene:

- a hemisphere light
- an ambient light
- a directional light

The directional light is positioned at `(100, 200, 50)`.

### Camera

Including 'camera' among the features in `warpSpeed()`, Enable3D will place a camera in position `(0, 6, 12)`

### Look at Center

Including 'lookAtCenter' among the features in `warpSpeed()`, Enable3D will make the camera looking at the scene's initial position.

### Ground

Including 'ground' among the features in `warpSpeed()`, Enable3D will create a ground platform in the scene.
The ground platform measures 21x21x1, and it is positioned 0.5 under the origin. By default, the ground platform is not texturized.

### Grid

The 'grid' feature of `warpSpeed()` is available only when the 'ground' feature is included in the feature list.
When included, Enable3D will texturize the ground platform with a grid composed of white 1x1 squares with a black border.

### Orbit Controls

Including 'orbitControls' among the features in `warpSpeed()`, Enable3D will include a set of controllers to allow the camera to orbit around a target.

The Orbit Controller is documented in [this example from ThreeJS](https://threejs.org/docs/#examples/en/controls/OrbitControls)

### Sky

Including 'orbitControls' among the features in `warpSpeed()`, Enable3D will include a Mesh and a set of shaders to simulate the effect of an azure sky. Shaders derive from the example documented in [this example from ThreeJS](https://threejs.org/examples/webgl_lights_hemisphere)

### Fog

Not available in the current release.
