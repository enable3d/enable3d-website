/**
 * @license
 * Copyright 2025 Yannick Deubel (https://github.com/yandeu)
 * SPDX-License-Identifier: MIT
 */
import * as Comlink from './lib/comlink.mjs'

/**
 * @typedef {Array<number>} Vertices
 */

/**
 * @typedef {Array<number>} Indices
 */

/**
 * @typedef {{vertices:Vertices, indices:Indices}} Response
 */

/**
 * @param {Worker} worker
 * @returns {{
 *  compute_vhacd(vertices: Vertices, indices: Indices, resolution?: number): Promise<Array<Response>;
 *  compute_convex_hull(vertices: Vertices): Promise<Response>
 * }}
 */
export const init = async worker => {
  const vhacd_wasm = Comlink.wrap(worker)
  await vhacd_wasm.init()
  return vhacd_wasm
}
