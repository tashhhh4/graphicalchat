export { Template };

class Template {
    constructor(templateFile) {
        this.templateFile = templateFile;
        this.render = () => {

            let output = this.templateFile;

            // Maybe I just want to use a template rendering engine.

            return output;
        };
    }
}