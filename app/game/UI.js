export { UI, FullscreenUI };

import { Template } from './Template.js';

// Rendered HTML in a wrapper div
class UI {
    constructor(id, templateFile, actions) {
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('ui-layer');
        this.rootElement.id = id;

        const template = new Template(templateFile);
        const renderedHTML = template.render();
        this.rootElement.innerHTML = renderedHTML;

        this.actions = actions;

        this.attachTo = (parent) => {
            parent.appendChild(this.rootElement);

            // Wire button actions
            this.actions.forEach(({id, action}) => {
                const elem = document.getElementById(id);
                elem.onclick = action;
            });
        };
        this.detach = () => {
            this.rootElement.remove();
        }
    }
}

class FullscreenUI extends UI {
    constructor(name, html, actions) {
        super(name, html, actions);
        this.rootElement.classList.add('fullscreen');
    }
}