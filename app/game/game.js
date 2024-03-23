/* 3D "Game" World Script
 * for the Graphical Chat App
 */

import * as THREE from 'three';
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


/** Define 3D Models to be loaded into the scene **/
// Scene Contents
let sceneContents = [
    {
        name: 'Hub Floor',
        file: assets.models.LargeFloor,
        model: null,
    },
    {
        name: 'Stick Woman',
        file: assets.models.StickWoman,
        model: null,
    }
];

// Define which avatar is controlled by the user
let myAvatar = findSceneContentsByName('Stick Woman');

// Get specific model helper function
function findSceneContentsByName(name) {
    for (const item of sceneContents) {
        if (item.name === name) {
            return item;
        }
    }
}

// Loaded State (0/100)
let objectsLoaded = 0;

// Moved objects around after loading them
let sceneIsSet = false;

// Gameplay constants
const AVATAR_WALK_SPEED = .5;

// Content (Geometry, Material, Mesh, Loaders, Light)
function loadSceneContents() {
    const totalFiles = sceneContents.length;
    let countFiles = 0;
    console.log('Total Files to load:', totalFiles);

    for (const item of sceneContents) {
        const loader = new GLTFLoader();
        loader.load(

            // Resource URL
            item.file,

            // onLoad : Function
            function(gltf) {
                const model = gltf.scene.children[0];
                model.name = item.name;
                item.model = model;
                scene.add(model);
                countFiles += 1;
                objectsLoaded = countFiles / totalFiles * 100;
                console.log('Object Loading Progress: ', objectsLoaded, '%');
            },
            
            // onProgress : Function
            undefined,

            // onError : Function
            undefined
        );
    }
}


// Lighting
const ambient_light = new THREE.AmbientLight(0xfefefe);
const directional_light = new THREE.DirectionalLight(0xffffee, .8);

// Set up the scene
//scene.add(cube_3);
scene.add(ambient_light);
scene.add(directional_light);

// That will do for now.
camera.position.z = 16;
camera.position.y = 6;
camera.position.x = 0;
camera.rotateX(-0.5);
const stickWomanPosZ = 10;

/** User Input Controls **/
// Keyboard Controls
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    switch(event.key) {
        case 'ArrowLeft':
            myAvatar.model.position.x -= AVATAR_WALK_SPEED;
            break;
        case 'ArrowRight':
            myAvatar.model.position.x += AVATAR_WALK_SPEED;
            break;
        case 'ArrowUp':
            myAvatar.model.position.z -= AVATAR_WALK_SPEED;
            break;
        case 'ArrowDown':
            myAvatar.model.position.z += AVATAR_WALK_SPEED;
            break;
    }
}


// Gameplay logic functions
function updateEntityPositions() {
    // later list of Entities, go through each entity and detect changes?
    const avatar = findSceneContentsByName("Stick Woman");
    //avatar.model.position.x += 1;
}

// Process logic and render the scene
function run() {
    if (objectsLoaded === 100) {
        requestAnimationFrame(run);

        // Manual adjustment of object position after loading
        if (sceneIsSet == false) {
            const avatar = findSceneContentsByName("Stick Woman");
            console.log('Found stick woman:');
            console.log(avatar);
            sceneIsSet = true;
        }

        // Update entity positions
        updateEntityPositions();

        renderer.render(scene, camera);
    } else {
        //console.log('The files are not loaded yet...');
        setTimeout(run, 100);
    }
}

/** PAGE INIT **/
loadSceneContents();
run();