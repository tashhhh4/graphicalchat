export { Screen };

import * as THREE from 'three';
import { Control } from './Control.js';
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
        this.scene = new THREE.Scene();
        this.entities = [];
        this.controls = [];
        this.uis = [];

        this.uiWrapper = uiWrapper;
        this.renderer = renderer;
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        this.loadingStatus = 0;

        this.loadEntities = () => {

            // Create Loading Overlay
            const loadingOverlay = new LoadingOverlay();
            loadingOverlay.attachTo(this.uiWrapper);

            // Reset loading progress
            this.loadingStatus = 0;

            let countFiles = 0;
            const totalFiles = this.entities.length;

            const scene = this.scene;

            for (const entity of this.entities) {
                entity.load(

                    // Pass in the Scene
                    this.scene,

                    // Called after object loads
                    () => {
                        countFiles += 1;
                        this.loadingStatus = countFiles / totalFiles * 100;
                        console.log('Object Loading Progress: ' + this.loadingStatus + '%');
                    }
                );
            }
            loadingOverlay.detach();
        };
        this._updateEntityPositions = () => {
            for (let entity of this.entities) {
                entity.move();
            }
        };

        this.frameId = null;
        this.run = () => {
            if (this.loadingStatus === 100) {
                requestAnimationFrame(this.run);
        
                // Update entity positions
                this._updateEntityPositions();
        
                renderer.render(this.scene, this.camera);
            } else {
                setTimeout(this.run, 100);
            }
        };
        this.stop = () => {
            cancelAnimationFrame(this.frameId);
        };
        this.unloadEntities = () => {
            for (let entity of this.entities) {
                entity.unload(this.scene);
            }
        };
    }
}