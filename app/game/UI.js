// HTML in a wrapper div
class UI {
    constructor(id, innerHTML, actions) {
        this.rootElement = document.createElement('div');
        this.rootElement.classList.add('ui-layer');
        this.rootElement.id = id;
        this.rootElement.innerHTML = innerHTML;

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

export default UI;