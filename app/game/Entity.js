export { Entity, FloorEntity, CharacterEntity };

import { Velocity } from './Velocity.js';

// Entity Class
// Make a new subclass for every thing
// that has a different behavior
class Entity {
    constructor(name, asset) {
        this.name = name;
        this.file = asset;
        this.model = null;
        // this.collisionMap = null;
        this.velocity = new Velocity(0, 0);
        this.move = function() {            
            const radians = this.velocity.angle * (Math.PI / 180);
            const speed = this.velocity.speed;

            const deltaX = Math.sin(radians) * speed;
            const deltaZ = Math.cos(radians) * speed * -1;

            this.model.position.x += deltaX;
            this.model.position.z += deltaZ;
        }
    }
}

class FloorEntity extends Entity {
    constructor(name, asset) {
        super(name, asset);
        // this.collisionMap = null;
    }
}

class CharacterEntity extends Entity {
    constructor(name, asset) {
        super(name, asset);
    }
}