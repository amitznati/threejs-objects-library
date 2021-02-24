import * as THREE from '../Three/Three';

export const createScene = () => {
  return new THREE.Scene();
};

export const initSchene = () => {
  /** Schene */

  /** Renderer */
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
  // document.getElementById('myCanvas').appendChild( renderer.domElement );

  // Create the scene to hold the object
  const scene = new THREE.Scene();

  // Create the camera
  const camera = new THREE.PerspectiveCamera(
    35, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane distance
    1000, // Far plane distance
  );

  // Position the camera
  camera.position.set(-15, 10, 20);

  // Add the lights

  const light = new THREE.PointLight(0xffffff, 0.4);
  light.position.set(10, 10, 10);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xbbbbbb);
  scene.add(ambientLight);

  return {
    scene,
    renderer,
    camera,
    light,
  };
};

export const createControls = ({ camera, renderer }) => {
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enablePan = false;
  controls.enableZoom = true;
  return controls;
};

export const createBoxTextureFromImages = ({
  right,
  left,
  front,
  back,
  top,
}) => {
  const textureLoader = new THREE.TextureLoader();
  const bookCoverTexture = textureLoader.load(front);
  const bookSpineTexture = textureLoader.load(left);
  const bookBackTexture = textureLoader.load(back);
  const bookPagesTexture = textureLoader.load(right);
  const bookPagesTopTexture = textureLoader.load(top);

  // Use the linear filter for the textures to avoid blurriness
  bookCoverTexture.minFilter = bookSpineTexture.minFilter = bookBackTexture.minFilter = bookPagesTexture.minFilter = bookPagesTopTexture.minFilter =
    THREE.LinearFilter;

  // Create the materials

  const bookCover = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: bookCoverTexture,
  });
  const bookSpine = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: bookSpineTexture,
  });
  const bookBack = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: bookBackTexture,
  });
  const bookPages = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: bookPagesTexture,
  });
  const bookPagesTop = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: bookPagesTopTexture,
  });
  const bookPagesBottom = new THREE.MeshLambertMaterial({ color: 0xffffff });

  const materials = [
    bookPages, // Right side
    bookSpine, // Left side
    bookPagesTop, // Top side
    bookPagesBottom, // Bottom side
    bookCover, // Front side
    bookBack, // Back side
  ];
  return {
    materials,
  };
};
