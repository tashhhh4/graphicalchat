/* 3D "Game" World Script
 * for the Graphical Chat App
 */

/** Game Engine**/
import * as THREE from 'three';

import { Velocity } from './Velocity.js';
import { Entity, FloorEntity, CharacterEntity } from './Entity.js';
import { Control } from './Control.js';
import { UI } from './UI.js';
import { Screen } from './Screen.js';

// Environment Variables
const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;
const ASSETS_URL = ASSETS_BASE_URL + 'assets/';

// Base Stylesheets
// Makes wrapper elements fill page
import './base.css';

// Defines appearance of the loading screen
import './loading.css';

// import { generateCollisionMap } from './generateCollisionMap.js';

/** GLOBAL **/
// Page attachment point for UI
const uiWrapper = document.getElementById('ui_wrapper');

// Page attachment point for HTML5 Canvas
const canvasWrapper = document.getElementById('canvas_wrapper');

// 3D Rendering Pieces
let screen;
let camera;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;


// Functions
function changeScreen(type) {
    if(screen) {
        screen.stop();
        screen.controls.forEach(control => {
            window.removeEventListener(control.type, control.callback);
        });
        screen.unloadEntities();
        if(screen.uis) {
            for(let ui of screen.uis) {
                ui.detach();
            }
        }
    }

    switch(type) {
        case 'GAME':
            screen = new GameScreen(uiWrapper, renderer);
            break;
        case 'AVATAR':
            screen = new AvatarEditScreen(uiWrapper, renderer);
            break;
        case 'HUB':
            screen = new HubEditScreen(uiWrapper, renderer);
            break;
    }

    camera = screen.camera;
    screen.loadEntities();
    screen.controls.forEach(control => {
        window.addEventListener(control.type, control.callback);
    });
    screen.run();
    if(screen.uis) {
        for (let ui of screen.uis) {
            ui.attachTo(uiWrapper);
        }
    }
    resetWindowController();
}

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

/** Game Definition **/

/** GAMEPLAY CONSTANTS **/
const AVATAR_WALK_SPEED = .5;

// Globally available data
// HTML Templates
import hubEditButtonTemplate from './templates/hub-edit-button.html?raw';
import hubEditDoneButtonTemplate from './templates/hub-edit-done-button.html?raw';
import hubBottomTemplate from './templates/hub-bottom.html?raw';

// List of all the objects in the game
import assets from './Assets.js';
import ASSETS from './assets.json';
import ITEMS from './items.json';

// const Assets = {
//     _assets: new_assets,
//     get: (itemName) => {
//         for (let item of items)
//     }
// }

// Hub Base models
import HUB_BASES from './hub_base_list.js';

// Logged-in User
import getUserData from './UserFixture.js';

// Defines style for each UI piece
import './ui.css';

// Main app mode, Game & Chatroom
class GameScreen extends Screen {
    constructor(uiWrapper, renderer) {
        super(uiWrapper, renderer);

        // Represent the user from whose
        // account environment settings are loaded
        // this.hub_owner = new User(1);


        // Lighting
        this.scene.add(new THREE.AmbientLight(0xfefefe));
        this.scene.add(new THREE.DirectionalLight(0xffffee, .8));

        // Camera
        this.camera.position.z = 16;
        this.camera.position.y = 6;
        this.camera.position.x = 0;
        this.camera.rotateX(-0.5);


        // Controller functions
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

        this.controls = [
            new Control('keydown', this.handleKeyDown),
            new Control('keyup', this.handleKeyUp)
        ];

        // Player character
        this.myAvatar = new CharacterEntity('Stick_Woman', assets.get('Stick_Woman'));
        
        // List of Entity objects to load
        // Floor model
        this.entities = [
            new FloorEntity('Large_Floor', assets.get('Large_Floor')),
            this.myAvatar,
        ];

        const hubEditButtonActions = {
            toHubEdit: () => changeScreen('HUB')
        };

        this.uis.push(new UI('main_edit_hub_button', hubEditButtonTemplate, {}, hubEditButtonActions));

    }    
}

// Sets the user up for customizing their avatar
class AvatarEditScreen extends Screen {
    constructor(uiWrapper, renderer) {
        super(uiWrapper, renderer);

        // List of Entity objects to load
        this.entities = [
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
    constructor(uiWrapper, renderer) {
        super(uiWrapper, renderer);

        // User
        this.user = getUserData();

        // The floor object to display
        this.floor = new FloorEntity('Large_Floor', assets.get('Large_Floor'));

        // List of Entity objects to load
        this.entities = [
            this.floor
        ];

        // Lighting
        this.scene.add(new THREE.AmbientLight(0xfefefe));
        this.scene.add(new THREE.DirectionalLight(0xffffee, .8));

        this.data = {
            hub_bases: HUB_BASES
        };

        const hubBottomData = {
            floors: ITEMS.floors
        };
        
        const hubBottomActions = {
            floorItemClicked: (itemName) => {

                // [TODO: Add error checking here]
                // Find item
                for (const item of ITEMS.floors) {
                    if (item.name === itemName) {

                        // Find associated model
                        for (const model of ASSETS.models) {
                            if (model.name === item.model) {
                                const file = ASSETS_URL + model.file;

                                this.floor.unload(this.scene);
                                this.floor = new FloorEntity('Irregular_Floor', file);
                                this.floor.load(this.scene);
                            }
                        }
                    }
                }
            }
        };

        const hubDoneActions = {
            returnToMain: () => changeScreen('GAME')
        };

        this.uis.push(new UI('hub_bottom_bar', hubBottomTemplate, hubBottomData, hubBottomActions));
        this.uis.push(new UI('hub_edit_done_button', hubEditDoneButtonTemplate, {}, hubDoneActions));
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
changeScreen('HUB');