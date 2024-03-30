const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL;
const ASSETS_URL = ASSETS_BASE_URL + 'assets/';
console.log('ASSETS_URL=' + ASSETS_URL);

const assets = {
    models: {
        BlueCube:       ASSETS_URL + 'sad_cube.glb',
        RedCube:        ASSETS_URL + 'cute_cube_1.obj',
        LargeFloor:     ASSETS_URL + 'large_square.glb',
        StickWoman:     ASSETS_URL + 'stick_woman.glb',
        IrregularFloor: ASSETS_URL + 'irregular_floor.glb',
    }
}

export default assets;