/**
 * @license
 * Copyright 2025 Yannick Deubel (https://github.com/yandeu)
 * SPDX-License-Identifier: MIT
 */
let wasm_bindgen
;(function () {
  const __exports = {}
  let script_src
  if (typeof document !== 'undefined' && document.currentScript !== null) {
    script_src = new URL(document.currentScript.src, location.href).toString()
  }
  let wasm = undefined

  const cachedTextDecoder =
    typeof TextDecoder !== 'undefined'
      ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true })
      : {
          decode: () => {
            throw Error('TextDecoder not available')
          }
        }

  if (typeof TextDecoder !== 'undefined') {
    cachedTextDecoder.decode()
  }

  let cachedUint8ArrayMemory0 = null

  function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer)
    }
    return cachedUint8ArrayMemory0
  }

  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len))
  }

  function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_0.get(idx)
    wasm.__externref_table_dealloc(idx)
    return value
  }
  /**
   * @param {any} vertices
   * @returns {any}
   */
  __exports.compute_convex_hull = function (vertices) {
    const ret = wasm.compute_convex_hull(vertices)
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1])
    }
    return takeFromExternrefTable0(ret[0])
  }

  /**
   * @param {any} vertices
   * @param {any} indices
   * @param {number} resolution
   * @returns {any}
   */
  __exports.compute_vhacd = function (vertices, indices, resolution) {
    const ret = wasm.compute_vhacd(vertices, indices, resolution)
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1])
    }
    return takeFromExternrefTable0(ret[0])
  }

  async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming === 'function') {
        try {
          return await WebAssembly.instantiateStreaming(module, imports)
        } catch (e) {
          if (module.headers.get('Content-Type') != 'application/wasm') {
            console.warn(
              '`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
              e
            )
          } else {
            throw e
          }
        }
      }

      const bytes = await module.arrayBuffer()
      return await WebAssembly.instantiate(bytes, imports)
    } else {
      const instance = await WebAssembly.instantiate(module, imports)

      if (instance instanceof WebAssembly.Instance) {
        return { instance, module }
      } else {
        return instance
      }
    }
  }

  function __wbg_get_imports() {
    const imports = {}
    imports.wbg = {}
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function (arg0) {
      const ret = arg0.buffer
      return ret
    }
    imports.wbg.__wbg_length_6ca527665d89694d = function (arg0) {
      const ret = arg0.length
      return ret
    }
    imports.wbg.__wbg_length_c67d5e5c3b83737f = function (arg0) {
      const ret = arg0.length
      return ret
    }
    imports.wbg.__wbg_new_405e22f390576ce2 = function () {
      const ret = new Object()
      return ret
    }
    imports.wbg.__wbg_new_78c8a92080461d08 = function (arg0) {
      const ret = new Float64Array(arg0)
      return ret
    }
    imports.wbg.__wbg_new_78feb108b6472713 = function () {
      const ret = new Array()
      return ret
    }
    imports.wbg.__wbg_new_e3b321dcfef89fc7 = function (arg0) {
      const ret = new Uint32Array(arg0)
      return ret
    }
    imports.wbg.__wbg_set_29b6f95e6adb667e = function (arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0)
    }
    imports.wbg.__wbg_set_37837023f3d740e8 = function (arg0, arg1, arg2) {
      arg0[arg1 >>> 0] = arg2
    }
    imports.wbg.__wbg_set_3fda3bac07393de4 = function (arg0, arg1, arg2) {
      arg0[arg1] = arg2
    }
    imports.wbg.__wbg_set_d23661d19148b229 = function (arg0, arg1, arg2) {
      arg0.set(arg1, arg2 >>> 0)
    }
    imports.wbg.__wbindgen_init_externref_table = function () {
      const table = wasm.__wbindgen_export_0
      const offset = table.grow(4)
      table.set(0, undefined)
      table.set(offset + 0, undefined)
      table.set(offset + 1, null)
      table.set(offset + 2, true)
      table.set(offset + 3, false)
    }
    imports.wbg.__wbindgen_memory = function () {
      const ret = wasm.memory
      return ret
    }
    imports.wbg.__wbindgen_number_new = function (arg0) {
      const ret = arg0
      return ret
    }
    imports.wbg.__wbindgen_string_new = function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1)
      return ret
    }
    imports.wbg.__wbindgen_throw = function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1))
    }

    return imports
  }

  function __wbg_init_memory(imports, memory) {}

  function __wbg_finalize_init(instance, module) {
    wasm = instance.exports
    __wbg_init.__wbindgen_wasm_module = module
    cachedUint8ArrayMemory0 = null

    wasm.__wbindgen_start()
    return wasm
  }

  function initSync(module) {
    if (wasm !== undefined) return wasm

    if (typeof module !== 'undefined') {
      if (Object.getPrototypeOf(module) === Object.prototype) {
        ;({ module } = module)
      } else {
        console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
      }
    }

    const imports = __wbg_get_imports()

    __wbg_init_memory(imports)

    if (!(module instanceof WebAssembly.Module)) {
      module = new WebAssembly.Module(module)
    }

    const instance = new WebAssembly.Instance(module, imports)

    return __wbg_finalize_init(instance, module)
  }

  async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm

    if (typeof module_or_path !== 'undefined') {
      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
        ;({ module_or_path } = module_or_path)
      } else {
        console.warn('using deprecated parameters for the initialization function; pass a single object instead')
      }
    }

    if (typeof module_or_path === 'undefined' && typeof script_src !== 'undefined') {
      module_or_path = script_src.replace(/\.js$/, '_bg.wasm')
    }
    const imports = __wbg_get_imports()

    if (
      typeof module_or_path === 'string' ||
      (typeof Request === 'function' && module_or_path instanceof Request) ||
      (typeof URL === 'function' && module_or_path instanceof URL)
    ) {
      module_or_path = fetch(module_or_path)
    }

    __wbg_init_memory(imports)

    const { instance, module } = await __wbg_load(await module_or_path, imports)

    return __wbg_finalize_init(instance, module)
  }

  wasm_bindgen = Object.assign(__wbg_init, { initSync }, __exports)
})()
