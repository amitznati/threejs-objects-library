import React from 'react';
import * as THREE from '../Three/Three';
import { initOrbitControls } from '../Three/OrbitControls';
import { initSceneUtils } from '../Three/SceneUtils';
import top from './znati-top.jpg';
import corner from './znati-corner.jpg';
import bg from './bg.png';

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  preserveDrawingBuffer: false,
});

export default class Box3D extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    initOrbitControls(THREE);
    initSceneUtils(THREE);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
    renderer.setClearColor(0xffffff, 0);
  }

  componentDidMount() {
    this.ref.current.appendChild(renderer.domElement);
    this.renderBox();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('update with props: ', this.props);
    console.log('update with prevProps: ', prevProps);
    this.renderBox();
  }

  renderBox = () => {
    if (!this.ref || !this.ref.current) return;
    const { lightColor } = this.props;

    // Create the scene to hold the object
    const scene = new THREE.Scene();

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      35, // Field of view
      (window.innerWidth * 0.7) / (window.innerHeight * 0.7), // Aspect ratio
      0.1, // Near plane distance
      1000, // Far plane distance
    );

    // Position the camera
    camera.position.set(-15, 10, 20);

    // Add the lights

    const light = new THREE.PointLight(lightColor);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xbbbbbb);
    scene.add(ambientLight);

    // Load the textures (book images)
    const textureLoader = new THREE.TextureLoader();
    const bookCoverTexture = textureLoader.load(top);
    const bookSpineTexture = textureLoader.load(corner);
    const bookBackTexture = textureLoader.load(top);
    const bookPagesTexture = textureLoader.load(corner);
    const bookPagesTopTexture = textureLoader.load(bg);

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

    // Create the book and add it to the scene
    const book = new THREE.Mesh(
      new THREE.BoxGeometry(9, 4, 10, 10, 10, 10),
      materials,
    );
    scene.add(book);

    // Create the orbit controls for the camera
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = false;
    controls.enableZoom = true;
    // Begin the animation
    animate();

    /*
      Animate a frame
    */

    function animate() {
      // Update the orbit controls
      controls.update();
      // Render the frame
      renderer.render(scene, camera);
      // Keep the animation going
      // eslint-disable-next-line no-undef
      requestAnimationFrame(animate);
    }
  };

  render() {
    return <div ref={this.ref} />;
  }
}
