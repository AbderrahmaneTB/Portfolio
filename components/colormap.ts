// Magma-style ramp (the colour map spectrograms use), as an RGBA lookup table.
// Alpha rises with intensity so quiet noise lets the page show through.
const STOPS: [number, [number, number, number]][] = [
  [0.0, [7, 6, 12]],
  [0.16, [38, 16, 88]],
  [0.34, [92, 30, 142]],
  [0.5, [158, 46, 134]],
  [0.64, [224, 69, 123]],
  [0.78, [252, 126, 92]],
  [0.9, [255, 186, 104]],
  [1.0, [255, 243, 206]],
]

export function buildMagmaLUT(alphaFrom = 0.03, alphaTo = 0.42): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256 * 4)
  for (let i = 0; i < 256; i++) {
    const t = i / 255
    let k = 0
    while (k < STOPS.length - 2 && t > STOPS[k + 1][0]) k++
    const [t0, c0] = STOPS[k]
    const [t1, c1] = STOPS[k + 1]
    const u = Math.min(1, Math.max(0, (t - t0) / (t1 - t0)))
    const a = Math.min(1, Math.max(0, (t - alphaFrom) / (alphaTo - alphaFrom)))
    lut[i * 4] = c0[0] + (c1[0] - c0[0]) * u
    lut[i * 4 + 1] = c0[1] + (c1[1] - c0[1]) * u
    lut[i * 4 + 2] = c0[2] + (c1[2] - c0[2]) * u
    lut[i * 4 + 3] = a * a * (3 - 2 * a) * 255
  }
  return lut
}
