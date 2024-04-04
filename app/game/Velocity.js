export { Velocity };

// Velocity Vector
/* Angle Unit: degrees
 * decreasing z when angle = 0
 */
class Velocity {
    constructor(speed, angle) {
        this.speed = speed;
        this.angle = angle;
    }
    static UP = 0;
    static UPRIGHT = 45;
    static RIGHT = 90;
    static RIGHTDOWN = 135;
    static DOWN = 180;
    static DOWNLEFT = 225;
    static LEFT = 270;
    static LEFTUP = 315;
}