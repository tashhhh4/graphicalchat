/* main.js / index.html
 * This exercise displays a spinning green cube and a red textbox,
 * made with regular css floating over the 3D display.
 */

import * as THREE from 'three';
//import WebGL from 'three/addons/capabilities/WebGL.js';


/** SETUP THE 3D ENVIRONMENT **/
// Scene
const scene = new THREE.Scene();
console.log(scene);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
console.log(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer);

// HTML5 Canvas Element
const canvas = renderer.domElement;
document.body.appendChild(canvas);
console.log(canvas);

// Content (Geometry, Material, Mesh)
const geometry = new THREE.BoxGeometry(1,1,1);
geometry.name = "My Box Geometry";
console.log(geometry);

const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
material.name = "My Box Material";
console.log(material);

const mesh = new THREE.Mesh(geometry, material);
mesh.name = "My Box Mesh";
console.log(mesh);

// Set up the scene
scene.add(mesh);
camera.position.z = 5;

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

/** PAGE INIT **/

// Check Compatibility
//      This doesn't seem to work, at least the error is not triggered by
//      launching the browser with 3D disabled. The error is not triggered
//      in all circumstances where the 3D app does not load/display, so we'll
//      ignore this feature and move on with the tutorial for now...
/*if (WebGL.isWebGLAvailable()) {
 animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('error_message_wrapper').appendChild(warning);
}*/

animate();
