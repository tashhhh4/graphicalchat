export { UI, FullscreenUI };

import Mustache from 'mustache';

// Rendered HTML in a wrapper div
class UI {
    constructor(id, templateFile, data, actions) {
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('ui-layer');
        this.rootElement.id = id;

        const template = templateFile;
        const renderedHTML = Mustache.render(template, data);
        this.rootElement.innerHTML = renderedHTML;

        this.actions = actions;

        this.attachTo = (parent) => {
            parent.appendChild(this.rootElement);    

            const clickables = this.rootElement.querySelectorAll('.clickable');
            clickables.forEach(elem => {
                const action = elem.dataset.action;
                if(action) {
                    elem.onclick = () => this.actions[action]();
                }
            });
        };
        this.detach = () => {
            this.rootElement.remove();
        }
    }
}

class FullscreenUI extends UI {
    constructor(name, html, data, actions) {
        super(name, html, data, actions);
        this.rootElement.classList.add('fullscreen');
    }
}