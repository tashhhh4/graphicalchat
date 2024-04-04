/* 3D "Game" World Script
 * for the Graphical Chat App
 */

/** Game Engine**/
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { UI, FullscreenUI } from './UI.js';
import { Entity, FloorEntity, CharacterEntity } from './Entity.js';
import { Velocity } from './Velocity.js';

// Base Stylesheets
// Makes wrapper elements fill page
import './base.css';

// Defines appearance of the loading screen
import './loading.css';

// Loading Overlay Template
import loadingScreenHTML from './templates/loading.html?raw';

// Define Loading Overlay
class LoadingOverlay extends FullscreenUI {
    constructor() {
        super('Loading Overlay', loadingScreenHTML, []);
    }
}

// import { generateCollisionMap } from './generateCollisionMap.js';

/** GLOBAL **/
// Page Hook for UI
const uiWrapper = document.getElementById('ui_wrapper');

// Wrapper for Canvas
const canvasWrapper = document.getElementById('canvas_wrapper');

// 3D Rendering Pieces
let screen;
let scene;
let camera;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;

// Current loading status & expected number of objects
let loadingStatus = 0;


// User Data classes
// class Hub {
//     constructor(userID) {
//         this.userID = userID;
//     }
// }

// class User {
//     constructor(id, location) {
//         this.id = id;
//         this.username = username;
//         this.location = location;
//     }
// }


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

            // Create Loading Overlay
            const loadingOverlay = new LoadingOverlay();
            loadingOverlay.attachTo(uiWrapper);

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
            loadingOverlay.detach();
        };
        this.updateEntityPositions = () => {};

        this.frameId = null;
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
        this.stop = () => {
            cancelAnimationFrame(this.frameId);
        }
        this.unloadSceneContents = () => {
            for (let entity of this.sceneContents) {
                this.scene.remove(entity.model);
            }
        };
        this.ui = null;
    }
}

// Change Screen function
function changeScreen(type) {
    if(screen) {
        screen.stop();
        screen.unloadSceneContents();
        if(screen.uis) {
            for(let ui of screen.uis) {
                ui.detach();
            }
        }
    }

    switch(type) {
        case 'GAME':
            screen = new GameScreen();
            break;
        case 'AVATAR':
            screen = new AvatarEditScreen();
            break;
        case 'HUB':
            screen = new HubEditScreen();
            break;
    }

    camera = screen.camera;
    scene = screen.scene;
    screen.loadSceneContents();
    screen.run();
    if(screen.uis) {
        for (let ui of screen.uis) {
            ui.attachTo(uiWrapper);
        }
    }
    resetWindowController();
}

/** Game Definition **/
// List of all the objects in the game
import assets from './Assets.js';

// Hub Base models
import HUB_BASES from './hub_base_list.js';

// Logged-in User
import getUserData from './UserFixture.js';

// Defines style for each UI piece
import './ui.css';

// HTML Templates
import f_hubEditButtonHTML from './templates/hub-edit-screen-button.js';
import f_hubEditDoneButtonHTML from './templates/hub-edit-done-button.js';

import f_hubBottomHTML from './templates/hub-bottom.js';


// Main app mode, Game & Chatroom
class GameScreen extends Screen {
    constructor() {
        super();

        // Represent the user from whose
        // account environment settings are loaded
        // this.hub_owner = new User(1);

        // List of Entity objects to load
        this.sceneContents = [
            new FloorEntity('Large_Floor', assets.get('Large_Floor')),
            new CharacterEntity('Stick_Woman', assets.get('Stick_Woman')),
        ];


        // Player character
        this.myAvatar = this.findSceneContentsByName('Stick_Woman');

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

        // Behavior upon catching events
        this.handleKeyDown = (event) => {
        
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
        };

        this.handleKeyUp = (event) => {    
            this.myAvatar.velocity.speed = 0;
        };

        const hubEditButtonHTML = f_hubEditButtonHTML();

        const editHubActions = [
            {
                id: 'edit_hub_button',
                action: () => changeScreen('HUB')
            }
        ];

        this.uis = [
            new UI('main_edit_hub_button', hubEditButtonHTML, editHubActions)
        ];

    }    
}

// Sets the user up for customizing their avatar
class AvatarEditScreen extends Screen {
    constructor() {
        super();

        // List of Entity objects to load
        this.sceneContents = [
            new Entity('Stick_Woman', assets.get('Stick_Woman'))
        ];

        // Lighting
        this.scene.add(new THREE.AmbientLight(0xfefefe));
        this.scene.add(new THREE.DirectionalLight(0xffffee, .8));

        // Camera
        this.camera.position.z = 16;
        this.camera.position.y = 6;
        this.camera.position.x = 0;
        this.camera.rotateX(-0.5);
    }    
}


// Sets the user up for customizing their hub
class HubEditScreen extends Screen {
    constructor() {
        super();

        // User
        this.user = getUserData();

        // List of Entity objects to load
        this.sceneContents = [
            new FloorEntity('Large_Floor', assets.get('Large_Floor'))
        ];

        // Lighting
        this.scene.add(new THREE.AmbientLight(0xfefefe));
        this.scene.add(new THREE.DirectionalLight(0xffffee, .8));

        this.data = {
            hub_bases: HUB_BASES
        };

        const hubBottomHTML = f_hubBottomHTML({'HUB_BASES': HUB_BASES});
        const hubEditDoneButtonHTML = f_hubEditDoneButtonHTML();
        
        const doneButtonActions = [
            {
                id: 'done_button',
                action: () => changeScreen('GAME')
            }
        ];

        this.uis = [
            new UI('hub_bottom_bar', hubBottomHTML, []),
            new UI('hub_edit_done_button', hubEditDoneButtonHTML, doneButtonActions),
        ];
    }
}


/** UNIVERSAL WINDOW & KEYBOARD SETTINGS **/
// Keyboard key names
const ARROW_UP = 38;
const ARROW_DOWN = 40;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;

const pressedKeys = {};

function handleKeyDown(event) {
    pressedKeys[event.keyCode] = true;
    if (screen && screen.handleKeyDown) {
        screen.handleKeyDown(event);
    }
}
function handleKeyUp(event) {
    delete pressedKeys[event.keyCode];
    if (screen && screen.handleKeyUp) {
        screen.handleKeyUp(event);
    }
}

function resetWindowController() {
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});



/** PAGE INIT **/
// HTML5 Canvas Element
canvasWrapper.appendChild(canvas);

// Pick screen
changeScreen('GAME');