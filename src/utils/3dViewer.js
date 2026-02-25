import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import CircularProgress from "@mui/material/CircularProgress";
import { createRoot } from "react-dom/client";
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
export function modelViewer({modelLink}){
//console.log("beingcalled");
let productWindow = document.getElementById('threeDViewContainer');
let existingCanvas = productWindow.querySelector("canvas");
if (existingCanvas) {
  productWindow.removeChild(existingCanvas);
}
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, productWindow.clientWidth/productWindow.clientHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(productWindow.clientWidth, productWindow.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.4;
productWindow.appendChild(renderer.domElement);
renderer.setSize(productWindow.clientWidth, productWindow.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
let directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 10, 7.5); 
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xeeeeee); 
let canvas = renderer.domElement; 
camera.position.z = 5;  
let controls = new OrbitControls(camera, renderer.domElement);
controls.minPolarAngle = Math.PI / 4;    
controls.maxPolarAngle = Math.PI / 1.5;   
controls.minAzimuthAngle = -Math.PI / 1; 
controls.maxAzimuthAngle = Math.PI / 1;  
controls.enableZoom = false;
let objectToRender;
let loader = new GLTFLoader();
let rgbeLoader = new RGBELoader();
let pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
let neutralGrayMaterial = new THREE.MeshStandardMaterial({
  color: "#d8d8d8",   
  roughness: 0.5,
  metalness: 0.0
});
let overlay = document.createElement("div");
overlay.id = "overlay";
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.display = "flex";
overlay.style.alignItems = "center";
overlay.style.justifyContent = "center";
overlay.style.backgroundColor = "rgba(255,255,255,0.8)";
overlay.style.zIndex = "10";
productWindow.style.position = "relative";
productWindow.appendChild(overlay);
const root = createRoot(overlay);
root.render(<CircularProgress />);



window.load3DModel = function (modelUrl) {
  if (typeof modelUrl !== 'string') {
  return;
}

  loader.load(
    modelUrl,
    (gltf) => {
      if (objectToRender) {
        scene.remove(objectToRender);
      }
      objectToRender = gltf.scene;
      objectToRender.traverse((child) => {
        if (child.isMesh) {
          child.material = neutralGrayMaterial.clone();
          child.material.envMapIntensity = 0.1;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      objectToRender.scale.set(1, 1, 1);
      objectToRender.position.set(0, 0, 0);
      scene.add(objectToRender);
      const box = new THREE.Box3().setFromObject(objectToRender);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const baseDistance = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      camera.position.set(center.x, center.y, cameraZ * 1.5);
      camera.lookAt(center);
      controls.target.copy(center);
      controls.update();
      controls.minDistance = baseDistance * 0.5;
      controls.maxDistance = baseDistance * 3.0;
      root.render(<ThreeDRotationIcon sx={{ fontSize:150, color: "black" }} />);
        setTimeout(() => {
      overlay.style.transition = "opacity 0.5s ease";
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.style.display = "none";
      }, 500);
    }, 1000);

    
    },
    (xhr) => {
      const percent = (xhr.loaded / xhr.total) * 100;
      const maxHatTranslate = 470;
      const maxBedTranslate = 470;
      const currentHat = -((percent / 100) * maxHatTranslate);
      const currentBed = -((percent / 100) * maxBedTranslate);
  
    },
    (error) => {
      console.error('Model load error:', error);
    }
  );
};


 window.load3DModel(modelLink);
  

rgbeLoader.load('https://res.cloudinary.com/dxqj5g1ii/raw/upload/v1762045560/Studio-Automotive-Neutral_xglqyr.hdr', (texture) => {
  let envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  texture.dispose();
  pmremGenerator.dispose();
});
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
{/*function handleWheelZoom(event) {
  let zoomSpeed = 0.5;
  camera.position.z += event.deltaY * zoomSpeed * 0.01;
  camera.position.z = Math.max(minZoom, Math.min(maxZoom, camera.position.z));

}*/}
canvas.addEventListener('mouseenter', () => {
  controls.enableZoom = true;
});
canvas.addEventListener('mouseleave', () => {
  controls.enableZoom = false;
});
animate();
productWindow.addEventListener('wheel', (e) => {
  e.preventDefault();
}, { passive:false});
productWindow.addEventListener('mouseenter', () => {
  controls.enableZoom = true;
});
productWindow.addEventListener('mouseleave', () => {
  controls.enableZoom = false;
});

}
