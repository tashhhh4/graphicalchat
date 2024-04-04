export { Template };

class Template {
    constructor(templateFile) {
        this.templateFile = templateFile;
        this.render = () => {


            const output = this.html;
            return output;
        };
    }
}