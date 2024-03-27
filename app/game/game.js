/* 3D "Game" World Script
 * for the Graphical Chat App
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

/** Handwritten (later generated) list of all the objects in the game **/
import assets from './Assets.js';

// import { generateCollisionMap } from './generateCollisionMap.js';

/** GLOBAL **/
// 3D Rendering Pieces
let screen;
let scene;
let camera;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;

// Current loading status & expected number of objects
let loadingStatus = 0;

// Entity Class
class Entity {
    constructor(name, file) {
        this.name = name;
        this.file = file;
        this.model = null;
        // this.collisionMap = null;
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
        // this.collisionMap = null;
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

/** GAMEPLAY CONSTANTS **/
const AVATAR_WALK_SPEED = .5;

// Screen
class Screen {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        this.sceneIsSet = false;

        // sceneContents is a list of Entity objects.
        this.sceneContents = [];
        this.findSceneContentsByName = (name) => {
            for (const entity of this.sceneContents) {
                if (entity.name === name) {
                    return entity;
                }
            }
        };
        this.loadSceneContents = () => {

            // Reset global loading progress
            loadingStatus = 0;

            let countFiles = 0;
            const totalFiles = this.sceneContents.length;

            const scene = this.scene;

            for (const entity of this.sceneContents) {
                const loader = new GLTFLoader();
                loader.load(

                    // Resource URL
                    entity.file,

                    // onLoad : Function
                    function(gltf) {

                        // Define Entity Object
                        const model = gltf.scene.children[0];
                        model.name = entity.name;
                        entity.model = model;
                        // const map = generateCollisionMap(model);
                        // entity.collisionMap = map; 

                        // Add to scene
                        scene.add(model);
                        countFiles += 1;
                        loadingStatus = countFiles / totalFiles * 100;
                        //this.objectsLoaded = countFiles / this.totalFiles * 100;
                        console.log('Object Loading Progress: ' + loadingStatus + '%');
                    },
                
                    // onProgress : Function
                    undefined,

                    // onError : Function
                    undefined
                );
            }
        };
        this.updateEntityPositions = () => {};
        this.run = () => {
            if (loadingStatus === 100) {
                requestAnimationFrame(this.run);
        
                // Manual adjustment of object position after loading
                // unnecessary - use data to update entity pos when loading
                if (this.sceneIsSet == false) {
                    this.sceneIsSet = true;
                }
        
                // Update entity positions
                this.updateEntityPositions();
        
                renderer.render(scene, camera);
            } else {
                setTimeout(this.run, 100);
            }
        };
    }
}

function changeScreen(newScreen) {
    screen = newScreen;
    camera = newScreen.camera;
    scene = newScreen.scene;
    screen.loadSceneContents();
    screen.initControls();
    screen.run();
}


// Main app mode, Game & Chatroom
class GameScreen extends Screen {
    constructor() {
        super();

        // List of Entity objects to load
        this.sceneContents = [
            new FloorEntity('Hub Floor', assets.models.IrregularFloor),
            new Entity('Stick Woman', assets.models.StickWoman),
        ];

        // Player character
        this.myAvatar = this.findSceneContentsByName('Stick Woman');

        // Lighting
        this.scene.add(new THREE.AmbientLight(0xfefefe));
        this.scene.add(new THREE.DirectionalLight(0xffffee, .8));

        // Camera
        this.camera.position.z = 16;
        this.camera.position.y = 6;
        this.camera.position.x = 0;
        this.camera.rotateX(-0.5);

        // Define animation behavior
        this.updateEntityPositions = () => {
            this.myAvatar.move();
        }

        // Runs when active 'screen' is changed to update window controls
        this.initControls = () => {
            const handleKeyDown = (event) => {

                // Pressed Keys
                pressedKeys[event.keyCode] = true;
            
                // Velocity
                const keys = Object.keys(pressedKeys);
                if (keys.length === 1) {
            
                    const k = keys[0];
                    if (k == ARROW_UP) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.UP;
                    } else
                    if (k == ARROW_RIGHT) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.RIGHT;
                    } else
                    if (k == ARROW_DOWN) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.DOWN;
                    } else
                    if (k == ARROW_LEFT) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.LEFT;
                    }
            
                } else if (keys.length === 2) {
                    const k1 = keys[0];
                    const k2 = keys[1];
            
                    // UP-RIGHT
                    if ((k1 == ARROW_UP && k2 == ARROW_RIGHT) || (k1 == ARROW_RIGHT && k2 == ARROW_UP)) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.UPRIGHT;
                    }
                    // RIGHT-DOWN
                    if ((k1 == ARROW_RIGHT && k2 == ARROW_DOWN) || (k1 == ARROW_DOWN && k2 == ARROW_RIGHT)) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.RIGHTDOWN;
                    }
                    // DOWN-LEFT
                    if ((k1 == ARROW_DOWN && k2 == ARROW_LEFT) || (k1 == ARROW_LEFT && k2 == ARROW_DOWN)) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.DOWNLEFT;
                    }
                    // LEFT-UP
                    if ((k1 == ARROW_LEFT && k2 == ARROW_UP) || (k1 == ARROW_UP && k2 == ARROW_LEFT)) {
                        this.myAvatar.velocity.speed = AVATAR_WALK_SPEED;
                        this.myAvatar.velocity.angle = Velocity.LEFTUP;
                    }
                }
            }
        
            const handleKeyUp = (event) => {
                // Pressed Keys
                delete pressedKeys[event.keyCode];
                
                // Velocity
                this.myAvatar.velocity.speed = 0;
            }
            document.addEventListener('keydown', handleKeyDown);
            document.addEventListener('keyup', handleKeyUp);
        };
    }    
}

// Sets the user up for customizing their avatar
class AvatarEditScreen extends Screen {
    constructor() {
        super();
    }
}

// Sets the user up for customizing their hub
class HubEditScreen extends Screen {
    constructor() {
        super();
    }
}

const gameScreen = new GameScreen();
const avatarEditScreen = new AvatarEditScreen();
const hubEditScreen = new HubEditScreen();


/** UNIVERSAL WINDOW & KEYBOARD SETTINGS **/
// Keyboard key names
const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const pressedKeys = {};


/** PAGE INIT **/

// HTML5 Canvas Element
document.body.appendChild(canvas);

// Pick screen
changeScreen(gameScreen);