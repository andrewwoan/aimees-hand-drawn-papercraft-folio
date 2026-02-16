// Three.js Curve Data from Blender
// Exported 3 curves
import * as THREE from "three";

export const exportedCurves = [
  {
    name: "cameraPathCurve",
    closed: true,
    points: [
      new THREE.Vector3(4.775683, 1.671652, -8.477468),
      new THREE.Vector3(7.458879, 1.671652, -8.623516),
      new THREE.Vector3(8.548644, 1.671652, -6.064692),
      new THREE.Vector3(9.244803, 1.671652, -3.427146),
      new THREE.Vector3(10.143335, 1.671652, -0.993421),
      new THREE.Vector3(11.041865, 1.671652, 1.440304),
      new THREE.Vector3(9.938103, 2.147269, 5.471571),
      new THREE.Vector3(7.41201, 2.622885, 7.877319),
      new THREE.Vector3(4.331401, 4.76316, 10.934382),
      new THREE.Vector3(1.313227, 3.811927, 11.062279),
      new THREE.Vector3(-4.131282, 1.671652, 10.315402),
      new THREE.Vector3(-2.237507, 1.671652, 5.945935),
      new THREE.Vector3(-4.701258, 1.671652, 4.905354),
      new THREE.Vector3(-6.048293, 1.671652, 2.781216),
      new THREE.Vector3(-6.479918, 1.671652, 0.30328),
      new THREE.Vector3(-4.11864, 3.230194, -0.895722),
      new THREE.Vector3(-1.757364, 4.788736, -2.094723),
      new THREE.Vector3(-1.309868, 5.31046, -4.552934),
      new THREE.Vector3(-0.862373, 5.832184, -7.011143),
      new THREE.Vector3(0.755144, 3.550312, -8.32757),
      new THREE.Vector3(3.068932, 1.671652, -8.149183),
    ],
  },
  {
    name: "movingCharactersCurve",
    closed: true,
    points: [
      new THREE.Vector3(-0.035392, 0.279338, -10.894051),
      new THREE.Vector3(4.308577, 0.279338, -10.029983),
      new THREE.Vector3(7.991215, 0.279338, -7.569322),
      new THREE.Vector3(10.451875, 0.279338, -3.886684),
      new THREE.Vector3(11.315945, 0.279338, 0.457284),
      new THREE.Vector3(10.451875, 0.279338, 4.801253),
      new THREE.Vector3(7.991215, 0.279338, 8.483891),
      new THREE.Vector3(4.308577, 0.279338, 10.944551),
      new THREE.Vector3(-0.035392, 0.279338, 11.80862),
      new THREE.Vector3(-4.379361, 0.279338, 10.944551),
      new THREE.Vector3(-8.061998, 0.279338, 8.483891),
      new THREE.Vector3(-10.522658, 0.279338, 4.801253),
      new THREE.Vector3(-11.386728, 0.279338, 0.457284),
      new THREE.Vector3(-10.522658, 0.279338, -3.886684),
      new THREE.Vector3(-8.061998, 0.279338, -7.569322),
      new THREE.Vector3(-4.379361, 0.279338, -10.029983),
    ],
  },
  {
    name: "cameraLookAtCurve",
    closed: true,
    points: [
      new THREE.Vector3(2.750525, 1.97667, -9.114526),
      new THREE.Vector3(6.201433, 1.97667, -7.31979),
      new THREE.Vector3(8.702841, 1.97667, -4.341067),
      new THREE.Vector3(9.873931, 1.97667, -0.631838),
      new THREE.Vector3(9.536418, 2.527152, 3.243201),
      new THREE.Vector3(7.741683, 1.97667, 6.694109),
      new THREE.Vector3(2.434122, 1.97667, 5.849863),
      new THREE.Vector3(1.053731, 1.97667, 10.366607),
      new THREE.Vector3(-2.821309, 1.97667, 10.029094),
      new THREE.Vector3(-6.272216, 2.869043, 8.234359),
      new THREE.Vector3(-8.773624, 1.97667, 5.255636),
      new THREE.Vector3(-9.944715, 1.97667, 1.546407),
      new THREE.Vector3(-9.607202, 1.97667, -2.328633),
      new THREE.Vector3(-7.812466, 1.97667, -5.77954),
      new THREE.Vector3(-4.833743, 1.17737, -8.280949),
      new THREE.Vector3(-1.124514, 1.97667, -9.452038),
    ],
  },
];

// Helper to convert data to Three.js Curve objects
export const createCurves = () => {
  const curves = {};
  exportedCurves.forEach((data) => {
    const curve = new THREE.CatmullRomCurve3(data.points);
    curve.closed = data.closed;
    curves[data.name] = curve;
  });
  return curves;
};
