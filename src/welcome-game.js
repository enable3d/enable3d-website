const {
  Project,
  PhysicsLoader,
  Scene3D,
  ExtendedObject3D,
  THREE,
  JoyStick,
  ThirdPersonControls,
  PointerLock,
  PointerDrag
} = ENABLE3D

/**
 * Is touch device?
 */
const isTouchDevice = 'ontouchstart' in window

class MainScene extends Scene3D {
  constructor() {
    super('MainScene')
  }

  init() {
    this.renderer.setPixelRatio(Math.max(1, window.devicePixelRatio / 2))

    this.canJump = true
    this.move = false

    this.moveTop = 0
    this.moveRight = 0
  }

  async preload() {
    /**
     * Medieval Fantasy Book by Pixel (https://sketchfab.com/stefan.lengyel1)
     * https://sketchfab.com/3d-models/medieval-fantasy-book-06d5a80a04fc4c5ab552759e9a97d91a
     * Attribution 4.0 International (CC BY 4.0)
     */
    const book = this.load.preload('book', '/assets/glb/book.glb')

    /**
     * box_man.glb by Jan Bláha
     * https://github.com/swift502/Sketchbook
     * CC-0 license 2018
     */
    const man = this.load.preload('man', '/assets/glb/box_man.glb')

    await Promise.all([book, man])
  }

  async create() {
    const { lights } = await this.warpSpeed('-ground', '-orbitControls')

    const { hemisphereLight, ambientLight, directionalLight } = lights
    const intensity = 0.65
    hemisphereLight.intensity = intensity
    ambientLight.intensity = intensity
    directionalLight.intensity = intensity

    // this.physics.debug.enable()

    const addBook = async () => {
      const object = await this.load.gltf('book')
      const scene = object.scenes[0]

      const book = new ExtendedObject3D()
      book.name = 'scene'
      book.add(scene)
      this.add.existing(book)

      // add animations
      // sadly only the flags animations works
      object.animations.forEach((anim, i) => {
        book.mixer = this.animationMixers.create(book)
        // overwrite the action to be an array of actions
        book.action = []
        book.action[i] = book.mixer.clipAction(anim)
        book.action[i].play()
      })

      book.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = false
          child.material.metalness = 0
          child.material.roughness = 1

          if (/mesh/i.test(child.name)) {
            this.physics.add.existing(child, {
              shape: 'concave',
              mass: 0,
              collisionFlags: 1,
              autoCenter: false
            })
            child.body.setAngularFactor(0, 0, 0)
            child.body.setLinearFactor(0, 0, 0)
          }
        }
      })
    }
    const addMan = async () => {
      const object = await this.load.gltf('man')
      const man = object.scene.children[0]

      this.man = new ExtendedObject3D()
      this.man.name = 'man'
      this.man.rotateY(Math.PI + 0.1) // a hack
      this.man.add(man)
      this.man.rotation.set(0, Math.PI * 1.5, 0)
      this.man.position.set(35, 0, 0)
      // add shadow
      this.man.traverse(child => {
        if (child.isMesh) {
          child.castShadow = child.receiveShadow = false
          // https://discourse.threejs.org/t/cant-export-material-from-blender-gltf/12258
          child.material.roughness = 1
          child.material.metalness = 0
        }
      })

      /**
       * Animations
       */
      // ad the box man's animation mixer to the animationMixers array (for auto updates)
      this.animationMixers.add(this.man.animation.mixer)

      object.animations.forEach(animation => {
        if (animation.name) {
          this.man.animation.add(animation.name, animation)
        }
      })
      this.man.animation.play('idle')

      /**
       * Add the player to the scene with a body
       */
      this.add.existing(this.man)
      this.physics.add.existing(this.man, {
        shape: 'sphere',
        radius: 0.25,
        width: 0.5,
        offset: { y: -0.25 }
      })
      this.man.body.setFriction(0.8)
      this.man.body.setAngularFactor(0, 0, 0)

      // https://docs.panda3d.org/1.10/python/programming/physics/bullet/ccd
      this.man.body.setCcdMotionThreshold(1e-7)
      this.man.body.setCcdSweptSphereRadius(0.25)

      /**
       * Add 3rd Person Controls
       */
      this.controls = new ThirdPersonControls(this.camera, this.man, {
        offset: new THREE.Vector3(0, 1, 0),
        targetRadius: 3
      })
      // set initial view to 90 deg theta
      this.controls.theta = 90

      /**
       * Add Pointer Lock and Pointer Drag
       */
      if (!isTouchDevice) {
        let pl = new PointerLock(this.canvas)
        let pd = new PointerDrag(this.canvas)
        pd.onMove(delta => {
          if (pl.isLocked()) {
            this.moveTop = -delta.y
            this.moveRight = delta.x
          }
        })
      }
    }

    addBook()
    addMan()

    /**
     * Add Keys
     */
    this.keys = {
      w: { isDown: false },
      a: { isDown: false },
      s: { isDown: false },
      d: { isDown: false },
      space: { isDown: false }
    }

    const press = (e, isDown) => {
      e.preventDefault()
      const { keyCode } = e
      switch (keyCode) {
        case 87: // w
          this.keys.w.isDown = isDown
          break
        case 38: // arrow up
          this.keys.w.isDown = isDown
          break
        case 32: // space
          this.keys.space.isDown = isDown
          break
      }
    }

    document.addEventListener('keydown', e => press(e, true))
    document.addEventListener('keyup', e => press(e, false))

    /**
     * Add joystick
     */
    if (isTouchDevice) {
      const joystick = new JoyStick()
      const axis = joystick.add.axis({
        styles: { left: 20, bottom: 175, size: 100 }
      })
      axis.onMove(event => {
        /**
         * Update Camera
         */
        const { top, right } = event
        this.moveTop = top * 3
        this.moveRight = right * 3
      })
      const buttonA = joystick.add.button({
        letter: 'A',
        styles: { right: 20, bottom: 250, size: 80 }
      })
      buttonA.onClick(() => this.jump())
      const buttonB = joystick.add.button({
        letter: 'B',
        styles: { right: 95, bottom: 175, size: 80 }
      })
      buttonB.onClick(() => (this.move = true))
      buttonB.onRelease(() => (this.move = false))
    }

    setTimeout(() => {
      const placeholder = document.getElementById('welcome-game-placeholder')
      if (placeholder) placeholder.remove()
    }, 500)
  }

  jump() {
    if (!this.man || !this.canJump) return
    this.canJump = false
    this.man.animation.play('jump_running', 500, false)
    setTimeout(() => {
      this.canJump = true
      this.man.animation.play('idle', 500)
    }, 500)
    this.man.body.applyForceY(6)
  }

  update(time, delta) {
    if (this.man && this.man.body) {
      /**
       * Update Controls
       */
      this.controls.update(this.moveRight * 3, -this.moveTop * 3)
      if (!isTouchDevice) this.moveRight = this.moveTop = 0
      /**
       * Player Turn
       */
      const speed = 4
      const v3 = new THREE.Vector3()

      const rotation = this.camera.getWorldDirection(v3)
      const theta = Math.atan2(rotation.x, rotation.z)
      const rotationMan = this.man.getWorldDirection(v3)
      const thetaMan = Math.atan2(rotationMan.x, rotationMan.z)
      this.man.body.setAngularVelocityY(0)

      const l = Math.abs(theta - thetaMan)
      let rotationSpeed = isTouchDevice ? 2 : 4
      let d = Math.PI / 24

      if (l > d) {
        if (l > Math.PI - d) rotationSpeed *= -1
        if (theta < thetaMan) rotationSpeed *= -1
        this.man.body.setAngularVelocityY(rotationSpeed)
      }

      /**
       * Player Move
       */
      if (this.keys.w.isDown || this.move) {
        if (this.man.animation.current === 'idle' && this.canJump) this.man.animation.play('run')

        const x = Math.sin(theta) * speed,
          y = this.man.body.velocity.y,
          z = Math.cos(theta) * speed

        this.man.body.setVelocity(x, y, z)
      } else {
        if (this.man.animation.current === 'run' && this.canJump) this.man.animation.play('idle')
      }

      /**
       * Player Jump
       */
      if (this.keys.space.isDown && this.canJump) {
        this.jump()
      }
    }
  }
}

window.addEventListener('load', () => {
  PhysicsLoader('/lib/ammo/moz', () => {
    const project = new Project({ antialias: true, maxSubSteps: 10, fixedTimeStep: 1 / 120, scenes: [MainScene] })

    const destination = document.getElementById('welcome-game')
    destination.appendChild(project.canvas)

    project.canvas.style.marginTop = '0px !important'

    const resize = () => {
      const newWidth = window.innerWidth
      const newHeight = (HEIGHT / WIDTH) * newWidth

      destination.style.width = `${newWidth}px`
      destination.style.height = `${newHeight}px`

      project.renderer.setSize(newWidth, newHeight)
      project.camera.aspect = newWidth / newHeight
      project.camera.updateProjectionMatrix()
    }

    window.onresize = resize
    resize()
  })
})
