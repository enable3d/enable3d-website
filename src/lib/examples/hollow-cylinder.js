// copied from https://discourse.threejs.org/t/problem-to-add-physic-in-a-hollow-cylinder-threejs-ammojs/22063
// ported to JavaScript using babeljs.io (https://babeljs.io/en/repl)

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var CaveCylinder = /*#__PURE__*/ (function () {
  "use strict";

  function CaveCylinder(params) {
    _classCallCheck(this, CaveCylinder);

    this.params = params;
    this.params.segments =
      this.params.segments < 4
        ? 4
        : this.params.segments > 256
          ? 256
          : this.params.segments;
  }

  _createClass(CaveCylinder, [
    {
      key: "getSideBySaS",
      // Side Angle Side triangle
      value: function getSideBySaS(sideA, angle, sideB) {
        return Math.sqrt(
          Math.pow(sideA, 2) +
          Math.pow(sideB, 2) -
          2 * sideA * sideB * Math.cos(angle)
        );
      }
    },
    {
      key: "degreeToRad",
      value: function degreeToRad(degree) {
        if (!degree) {
          return 0;
        }

        return (degree * Math.PI) / 180;
      }
    },
    {
      key: "createvertices",
      value: function createvertices(
        originLatoMaggiore,
        originLatoMinore,
        radiant,
        externalSide,
        internalSide,
        deltaLato,
        depth
      ) {
        var myvertices = [];
        var b = {
          x: externalSide * Math.cos(radiant) + originLatoMaggiore.x,
          y: externalSide * Math.sin(radiant) + originLatoMaggiore.y
        };
        var c = {
          x: internalSide * Math.cos(radiant) + originLatoMinore.x,
          y: internalSide * Math.sin(radiant) + originLatoMinore.y
        };
        myvertices.push(
          new THREE.Vector3(originLatoMaggiore.x, 0, originLatoMaggiore.y)
        );
        myvertices.push(new THREE.Vector3(b.x, 0, b.y));
        myvertices.push(new THREE.Vector3(c.x, 0, c.y));
        myvertices.push(
          new THREE.Vector3(originLatoMinore.x, 0, originLatoMinore.y)
        );
        myvertices.push(
          new THREE.Vector3(
            originLatoMaggiore.x,
            this.params.height,
            originLatoMaggiore.y
          )
        );
        myvertices.push(new THREE.Vector3(b.x, this.params.height, b.y));
        myvertices.push(new THREE.Vector3(c.x, this.params.height, c.y));
        myvertices.push(
          new THREE.Vector3(
            originLatoMinore.x,
            this.params.height,
            originLatoMinore.y
          )
        );
        return {
          vertici: myvertices,
          origineLatoMaggiore: b,
          origineLatoMinore: c
        };
      }
    },
    {
      key: "createModel",
      value: function createModel(pos, quat) {
        //Array<{model: Mesh, body: any}> {
        var geometry = new THREE.Geometry();
        var angle = this.degreeToRad(360 / this.segments); // In pratica divido il mio poligono regolare in n triangoli che hanno due lati che misurano il raggio della circonferenza

        var externalSide = this.getSideBySaS(
          this.params.externalRadius,
          angle,
          this.params.externalRadius
        );
        var internalSide = this.getSideBySaS(
          this.params.internalRadius,
          angle,
          this.params.internalRadius
        );
        var deltaLato = (externalSide - internalSide) / 2;
        angle = (this.degreeToRad(180) - angle) / 2;
        var depth = this.params.externalRadius - this.params.internalRadius;
        var radiant = this.degreeToRad(180) - 2 * angle;
        var variazioneRadiant = 0;
        geometry.vertices = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(externalSide, 0, 0),
          new THREE.Vector3(externalSide - deltaLato, 0, depth),
          new THREE.Vector3(deltaLato, 0, depth),
          new THREE.Vector3(0, this.params.height, 0),
          new THREE.Vector3(externalSide, this.params.height, 0),
          new THREE.Vector3(
            externalSide - deltaLato,
            this.params.height,
            depth
          ),
          new THREE.Vector3(deltaLato, this.params.height, depth)
        ];
        geometry.faces = [
          new THREE.Face3(0, 1, 2),
          new THREE.Face3(0, 2, 3),
          new THREE.Face3(6, 5, 4),
          new THREE.Face3(7, 6, 4),
          new THREE.Face3(6, 7, 3),
          new THREE.Face3(2, 6, 3),
          new THREE.Face3(5, 1, 0),
          new THREE.Face3(4, 5, 0)
        ];
        var verticesResults;
        var originLatoMaggiore;
        var originLatoMinore;
        originLatoMaggiore = {
          x: externalSide,
          y: 0
        };
        originLatoMinore = {
          x: externalSide - deltaLato,
          y: depth
        };
        var value;

        for (var i = 0; i < this.segments; i++) {
          var _geometry$vertices;

          variazioneRadiant += radiant;
          verticesResults = this.createvertices(
            originLatoMaggiore,
            originLatoMinore,
            variazioneRadiant,
            externalSide,
            internalSide,
            deltaLato,
            depth
          );

          (_geometry$vertices = geometry.vertices).push.apply(
            _geometry$vertices,
            _toConsumableArray(verticesResults.vertici)
          );

          originLatoMaggiore = verticesResults.origineLatoMaggiore;
          originLatoMinore = verticesResults.origineLatoMinore;
          value = 8 * (i + 1);
          geometry.faces.push(
            new THREE.Face3(
              geometry.faces[0].a + value,
              geometry.faces[0].b + value,
              geometry.faces[0].c + value
            ),
            new THREE.Face3(
              geometry.faces[1].a + value,
              geometry.faces[1].b + value,
              geometry.faces[1].c + value
            ),
            new THREE.Face3(
              geometry.faces[2].a + value,
              geometry.faces[2].b + value,
              geometry.faces[2].c + value
            ),
            new THREE.Face3(
              geometry.faces[3].a + value,
              geometry.faces[3].b + value,
              geometry.faces[3].c + value
            ),
            new THREE.Face3(
              geometry.faces[4].a + value,
              geometry.faces[4].b + value,
              geometry.faces[4].c + value
            ),
            new THREE.Face3(
              geometry.faces[5].a + value,
              geometry.faces[5].b + value,
              geometry.faces[5].c + value
            ),
            new THREE.Face3(
              geometry.faces[6].a + value,
              geometry.faces[6].b + value,
              geometry.faces[6].c + value
            ),
            new THREE.Face3(
              geometry.faces[7].a + value,
              geometry.faces[7].b + value,
              geometry.faces[7].c + value
            )
          );
        }

        geometry.verticesNeedUpdate = true;
        geometry.normalsNeedUpdate = true;
        geometry.computeBoundingSphere();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        var scale = new THREE.Vector3(1, 1, 1);
        var obj = new THREE.Mesh(
          geometry,
          new THREE.MeshPhongMaterial({
            color: this.params.color
          })
        );
        obj.position.set(pos.x, pos.y, pos.z);
        obj.scale.set(scale.x, scale.y, scale.z);

        if (quat) {
          obj.quaternion.set(quat.x, quat.y, quat.z, quat.w);
        }

        obj.castShadow = true;
        obj.receiveShadow = true; // move the cylinder 'cause the position that I passed in params would be the cylinder's center

        obj.position.x -= externalSide / 2;
        obj.position.z -=
          (this.params.externalRadius * Math.sin(angle)) /
          Math.sin(this.degreeToRad(90));
        return obj;
      }
    },
    {
      key: "color",
      set: function set(color) {
        this.params.color = color;
      },
      get: function get() {
        return this.params.color;
      }
    },
    {
      key: "externalRadius",
      set: function set(r) {
        this.params.externalRadius = r;
      },
      get: function get() {
        return this.params.externalRadius;
      }
    },
    {
      key: "height",
      set: function set(h) {
        this.params.height = h;
      },
      get: function get() {
        return this.params.height;
      }
    },
    {
      key: "internalRadius",
      set: function set(r) {
        this.params.internalRadius = r;
      },
      get: function get() {
        return this.params.internalRadius;
      }
    },
    {
      key: "segments",
      set: function set(s) {
        this.params.segments = s < 4 ? 4 : s > 256 ? 256 : s;
      },
      get: function get() {
        return this.params.segments;
      }
    },
    {
      key: "mass",
      set: function set(m) {
        this.params.mass = m;
      },
      get: function get() {
        return this.params.mass;
      }
    }
  ]);

  return CaveCylinder;
})();
