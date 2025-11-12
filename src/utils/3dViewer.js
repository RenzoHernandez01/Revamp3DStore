import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
export function modelViewer(){
console.log("beingcalled");
let productWindow = document.getElementById('threeDViewContainer');
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
let materialVertexColor = new THREE.MeshStandardMaterial({
  vertexColors: true,
  roughness: 0.5,
  metalness: 0 
  });
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

window.load3DModel = function (modelUrl) {
  /*const overlay = document.querySelector('.loadingOverlay');
  const loadingWrapper = document.querySelector('.loadingWrapper');
  const printerBed = document.querySelector('.printerBed');
  overlay.style.display = 'flex';
  overlay.style.opacity = '1';*/
  /*loadingWrapper.style.transform = 'translateY(0px)';
  printerBed.style.transform = 'translate(-50%, -50%) translateY(100px)';
  const initialRect = printerBed.getBoundingClientRect();
  console.log('Initial printerBed position:', initialRect);*/

  loader.load(
    modelUrl,
    (gltf) => {
      if (objectToRender) {
        scene.remove(objectToRender);
      }
      objectToRender = gltf.scene;
      objectToRender.traverse((child) => {
        if (child.isMesh) {
          child.material = materialVertexColor.clone();
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
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      camera.position.set(center.x, center.y, cameraZ * 1.5);
      camera.lookAt(center);
      controls.target.copy(center);
      controls.update();
      /*loadingWrapper.style.transform = 'translateY(-470px)';
      printerBed.style.transform = 'translate(-50%, -50%) translateY(-470px)';*/
      /*const finalRect = printerBed.getBoundingClientRect();*/
      console.log('Final printerBed position:', finalRect);
      requestAnimationFrame(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
        }, 500);
      });
    },
    (xhr) => {
      const percent = (xhr.loaded / xhr.total) * 100;
      const maxHatTranslate = 470;
      const maxBedTranslate = 470;
      const currentHat = -((percent / 100) * maxHatTranslate);
      const currentBed = -((percent / 100) * maxBedTranslate);
      /*loadingWrapper.style.transform = `translateY(${currentHat}px)`;
      printerBed.style.transform = `translate(-50%, -50%) translateY(${currentBed}px)`;
      const liveRect = printerBed.getBoundingClientRect();
      console.log(`Progress: ${percent.toFixed(1)}%`, 'Bed Y:', currentBed, 'Rect:', liveRect);*/
    },
    (error) => {
      console.error('Model load error:', error);
     /* overlay.style.display = 'none';*/
    }
  );
};
/*window.addEventListener('DOMContentLoaded', () => {
  if (product.modelPath) {
  window.load3DModel(product.modelPath);
}
  console.log("rendering");
  window.load3DModel('https://storage.googleapis.com/3dwebstoreassets/pyramidHead.glb');
});*/


 window.load3DModel('https://storage.googleapis.com/3dwebstoreassets/pyramidHead.glb');
  

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
function handleWheelZoom(event) {
  let zoomSpeed = 0.5;
  camera.position.z += event.deltaY * zoomSpeed * 0.01;
  camera.position.z = Math.max(2, Math.min(20, camera.position.z));
}
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
