/* material.js / material.html
 * Cube 1
 * Pink material baked into model using Blender
 * Loading model from cute_cube_2.glb
 *
 * Cube 2
 * Basic Mesh Material, Red, x2 rotation speed
 *
 * Cube 3
 * Material baked into model using Blender (?)
 *
 * Cube 4
 * Material defined using three.js added to imported model
 */


import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/** SETUP THE 3D ENVIRONMENT **/
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// HTML5 Canvas Element
const canvas = renderer.domElement;
document.body.appendChild(canvas);

// Object Holders
let cube_1;
let cube_2;

// Content (Geometry, Material, Mesh, Loaders, Light)
const loader_1 = new OBJLoader();
const loader_2 = new GLTFLoader();

// Call loader_1
loader_1.load(

    // Resource URL
    assets.models.RedCube,

    // onLoad
    function (object) {
        cube_1 = object.children[0];
        let red_material = new THREE.MeshStandardMaterial({color: 0xde1111});
        let black_material = new THREE.MeshStandardMaterial({color: 0x020202});
        let white_material = new THREE.MeshStandardMaterial({color: 0xfefefe});

        cube_1.material[0] = red_material;
        cube_1.material[1] = white_material;
        cube_1.material[2] = black_material;

        cube_1.name = "Red Cube";
        cube_1.position.x = 2.5;
        cube_1.position.y = 2.5;
        scene.add(cube_1);
        console.log("Cube 1");
        console.log(cube_1);
        console.log("Cube 1 material");
        console.log(cube_1.material);
        console.log("Cube 1 material[0]");
        console.log(cube_1.material[0]);


        // Call loader_2
        loader_2.load(

            // Resource URL
            assets.models.BlueCube,

            // onLoad
            function (gltf) {
                cube_2 = gltf.scene.children[0];
                cube_2.name = "Blue Cube";
                cube_2.position.x = -2.5;
                cube_2.position.y = 2.5;
                scene.add(cube_2);
                console.log("Cube 2");
                console.log(cube_2);

                // Start the animation
                animate();
            },

            // onProgress : Function
            undefined,

            // onError : Function
            function (error) {
                console.error(error);
            }
        );
    },

    // Called when loading is in progress
    function (xhr) {
        console.log('LOADING: ' + (xhr.loaded/xhr.total * 100) + '%');
    },

    // Called when loading has errors
    function(error) {
        console.error(error);
    }
);

const cube_geometry = new THREE.BoxGeometry(1,1,1);

const basic_material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const standard_material = new THREE.MeshStandardMaterial({color: 0x00ffff});

const cube_3 = new THREE.Mesh(cube_geometry, basic_material);
cube_3.name = "Green Cube";
cube_3.position.x = -2.5;
cube_3.position.y = -2.5;

console.log("Cube 3")
console.log(cube_3);

const cube_4 = new THREE.Mesh(cube_geometry, standard_material);
cube_4.name = "Shadowy Cube";
cube_4.position.x = 2.5;
cube_4.position.y = -2.5;

console.log("Cube 4");
console.log(cube_4);

// Lighting
const ambient_light = new THREE.AmbientLight(0xfefefe);
const directional_light = new THREE.DirectionalLight(0xffffee, .8);

// Set up the scene
scene.add(cube_3);
scene.add(cube_4);
scene.add(ambient_light);
scene.add(directional_light);
camera.position.z = 5;

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    cube_1.rotation.x += 0.01;
    cube_1.rotation.y += 0.01;
    cube_2.rotation.x += 0.02;
    cube_2.rotation.y += 0.02;
    cube_3.rotation.x += 0.01;
    cube_3.rotation.y += 0.01;
    cube_4.rotation.x += 0.01;
    cube_4.rotation.y += 0.01;
    renderer.render(scene, camera);
}

/** PAGE INIT **/
//animate();
