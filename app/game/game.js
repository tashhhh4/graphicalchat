/* 3D "Game" World Script
 * for the Graphical Chat App
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { generateCollisionMap } from './generateCollisionMap.js';

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

// Entity Class
class Entity {
    constructor(name, file) {
        this.name = name;
        this.file = file;
        this.model = null;
        this.collisionMap = null;
        this.velocity = new Velocity(0, 0);
        this.move = function() {            
            const radians = this.velocity.angle * (Math.PI / 180);
            const speed = this.velocity.speed;

            const deltaX = Math.sin(radians) * speed;
            const deltaZ = Math.cos(radians) * speed * -1;

            this.model.position.x += deltaX;
            this.model.position.z += deltaZ;
        }
    }
}

class FloorEntity extends Entity {
    constructor(name, file) {
        super(name, file);
        this.collisionMap = null;
    }
}

// Velocity Vector
/* Angle Unit: degrees
 * decreasing z when angle = 0
 */
class Velocity {
    constructor(speed, angle) {
        this.speed = speed;
        this.angle = angle;
    }
    static UP = 0;
    static UPRIGHT = 45;
    static RIGHT = 90;
    static RIGHTDOWN = 135;
    static DOWN = 180;
    static DOWNLEFT = 225;
    static LEFT = 270;
    static LEFTUP = 315;
}

/** Define 3D Models to be loaded into the scene **/
// Scene Contents
let sceneContents = [
    new FloorEntity('Hub Floor', assets.models.IrregularFloor),
    new Entity('Stick Woman', assets.models.StickWoman),
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

// Keep track of held-down keys
const pressedKeys = {};

// Gameplay constants
const AVATAR_WALK_SPEED = .5;

// Keyboard key names
const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

// Content (Geometry, Material, Mesh, Loaders, Light)
function loadSceneContents() {
    const totalFiles = sceneContents.length;
    let countFiles = 0;

    for (const item of sceneContents) {
        const loader = new GLTFLoader();
        loader.load(

            // Resource URL
            item.file,

            // onLoad : Function
            function(gltf) {
                
                // Define Entity Object
                const model = gltf.scene.children[0];
                model.name = item.name;
                item.model = model;
                // const map = generateCollisionMap(model);
                item.collisionMap = map;

                // Track additions
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
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    // Pressed Keys
    pressedKeys[event.keyCode] = true;

    // Velocity
    const keys = Object.keys(pressedKeys);
    if (keys.length === 1) {

        const k = keys[0];
        if (k == ARROW_UP) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.UP;
        } else
        if (k == ARROW_RIGHT) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.RIGHT;
        } else
        if (k == ARROW_DOWN) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.DOWN;
        } else
        if (k == ARROW_LEFT) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.LEFT;
        }

    } else if (keys.length === 2) {
        const k1 = keys[0];
        const k2 = keys[1];

        // UP-RIGHT
        if ((k1 == ARROW_UP && k2 == ARROW_RIGHT) || (k1 == ARROW_RIGHT && k2 == ARROW_UP)) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.UPRIGHT;
        }
        // RIGHT-DOWN
        if ((k1 == ARROW_RIGHT && k2 == ARROW_DOWN) || (k1 == ARROW_DOWN && k2 == ARROW_RIGHT)) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.RIGHTDOWN;
        }
        // DOWN-LEFT
        if ((k1 == ARROW_DOWN && k2 == ARROW_LEFT) || (k1 == ARROW_LEFT && k2 == ARROW_DOWN)) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.DOWNLEFT;
        }
        // LEFT-UP
        if ((k1 == ARROW_LEFT && k2 == ARROW_UP) || (k1 == ARROW_UP && k2 == ARROW_LEFT)) {
            myAvatar.velocity.speed = AVATAR_WALK_SPEED;
            myAvatar.velocity.angle = Velocity.LEFTUP;
        }
    }
}

function handleKeyUp(event) {
    // Pressed Keys
    delete pressedKeys[event.keyCode];
    
    // Velocity
    myAvatar.velocity.speed = 0;
}


// Gameplay & animation logic functions
function updateEntityPositions() {
    // TODO: list of Entities, go through each entity and detect changes?
    const avatar = findSceneContentsByName("Stick Woman");

    avatar.move();
}


// Process logic and render the scene
function run() {
    if (objectsLoaded === 100) {
        requestAnimationFrame(run);

        // Manual adjustment of object position after loading
        if (sceneIsSet == false) {
            const avatar = findSceneContentsByName("Stick Woman");
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