export { Screen };

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FullscreenUI } from './UI.js';

// Loading Overlay Template
import loadingScreenHTML from './templates/loading.html?raw';

// Loading Overlay
class LoadingOverlay extends FullscreenUI {
    constructor() {
        super('Loading Overlay', loadingScreenHTML, {}, []);
    }
}

// Screen
/*
 * Requires: uiWrapper = an HTML DOM element object to serve
 * as the parent element for all UI elements to attach
 * themselves under.
 *           renderer = a THREE.js renderer object
 */
class Screen {
    constructor(uiWrapper, renderer) {
        this.uiWrapper = uiWrapper;
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        // sceneContents is a list of Entity objects.
        this.sceneContents = [];
        this.findSceneContentsByName = (name) => {
            for (const entity of this.sceneContents) {
                if (entity.name === name) {
                    return entity;
                }
            }
        };
        this.loadingStatus = 0;

        this.loadSceneContents = () => {

            // Create Loading Overlay
            const loadingOverlay = new LoadingOverlay();
            loadingOverlay.attachTo(this.uiWrapper);

            // Reset loading progress
            this.loadingStatus = 0;

            let countFiles = 0;
            const totalFiles = this.sceneContents.length;

            const scene = this.scene;

            for (const entity of this.sceneContents) {
                const loader = new GLTFLoader();
                loader.load(

                    // Resource URL
                    entity.file,

                    // onLoad : Function
                    (gltf) => {

                        // Define Entity Object
                        const model = gltf.scene.children[0];
                        model.name = entity.name;
                        entity.model = model;
                        // const map = generateCollisionMap(model);
                        // entity.collisionMap = map; 

                        // Add to scene
                        scene.add(model);
                        countFiles += 1;
                        this.loadingStatus = countFiles / totalFiles * 100;
                        //this.objectsLoaded = countFiles / this.totalFiles * 100;
                        console.log('Object Loading Progress: ' + this.loadingStatus + '%');
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
            if (this.loadingStatus === 100) {
                requestAnimationFrame(this.run);
        
                // Update entity positions
                this.updateEntityPositions();
        
                renderer.render(this.scene, this.camera);
            } else {
                setTimeout(this.run, 100);
            }
        };
        this.stop = () => {
            cancelAnimationFrame(this.frameId);
        };
        this.unloadSceneContents = () => {
            for (let entity of this.sceneContents) {
                this.scene.remove(entity.model);
            }
        };

        this.uis = [];
    }
}