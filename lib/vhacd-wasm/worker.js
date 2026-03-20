/**
 * @license
 * Copyright 2025 Yannick Deubel (https://github.com/yandeu)
 * SPDX-License-Identifier: MIT
 */
importScripts('./vhacd-wasm_no-modules.js')
importScripts('./lib/comlink.js')

const { compute_vhacd, compute_convex_hull } = wasm_bindgen

const obj = {
  async init() {
    await wasm_bindgen('./vhacd-wasm_no-modules_bg.wasm')
  },
  async compute_vhacd(vertices, indices, resolution = 64) {
    return compute_vhacd(vertices, indices, resolution)
  },
  async compute_convex_hull(vertices) {
    return compute_convex_hull(vertices)
  }
}

Comlink.expose(obj)
