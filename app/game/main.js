/* 3D "Game" World Script
 * for the Graphical Chat App
 */

/** Game Engine**/
import * as THREE from 'three';

import { UI } from './UI.js';
import { Entity, FloorEntity, CharacterEntity } from './Entity.js';
import { Velocity } from './Velocity.js';
import { Screen } from './Screen.js';

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
        screen.unloadSceneContents();
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
    screen.loadSceneContents();
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


/** GAMEPLAY CONSTANTS **/
const AVATAR_WALK_SPEED = .5;


/** Game Definition **/
// Globally available data

// HTML Templates
import hubEditButtonTemplate from './templates/hub-edit-button.html?raw';
import hubEditDoneButtonTemplate from './templates/hub-edit-done-button.html?raw';
import hubBottomTemplate from './templates/hub-bottom.html?raw';

// List of all the objects in the game
import assets from './Assets.js';

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
    constructor(uiWrapper, renderer) {
        super(uiWrapper, renderer);

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

        const hubBottomData = {
            floors: [
                {name: 'Green Floor'},
                {name: 'Irregular Floor'},
                {name: 'Yellow Desert'},
            ]
        };
        
        const hubBottomActions = {
            floorItemClicked: () => console.log('Floor Item Clicked!')
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