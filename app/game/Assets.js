const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;
const ASSETS_URL = ASSETS_BASE_URL + 'assets/';

class Assets {
    constructor() {
        this.models = {
            Blue_Cube: ASSETS_URL + 'sad_cube.glb',
            Red_Cube: ASSETS_URL + 'cute_cube_1.obj',
            Large_Floor: ASSETS_URL + 'large_square.glb',
            Stick_Woman: ASSETS_URL + 'stick_woman.glb',
            Irregular_Floor: ASSETS_URL + 'irregular_floor.glb',
        };
        this.get = (name) => {
            return this.models[name];
        };
    }
}

const assets = new Assets();
export default assets;