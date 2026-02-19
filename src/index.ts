import * as base from "./base";
import * as canvas from "./canvas";
import * as ship from "./ship";
import * as stuff from "./stuff";

const init = () => {
    canvas.canvasFullscreen(canvas.base);
    canvas.canvasWhiteStroke(canvas.base);
    canvas.canvasFullscreen(canvas.game);
    canvas.canvasWhiteStroke(canvas.game);
}

addEventListener('resize', () => init())
init();

base.draw();
ship.init();
stuff.init();

let left = false;
let right = false;
let up = false;
let spacepressed: number | null = null;
addEventListener('keydown', e => {
    toggleKey(e.key, true);
    if (e.key == " ") {
        if (!spacepressed) {
            spacepressed = setInterval(() => ship.pew(), 200);
            ship.pew();
        }
    }
})
addEventListener('keyup', e => {
    toggleKey(e.key, false);
    if (e.key == " ") {
        if (spacepressed) {
            clearInterval(spacepressed);
            spacepressed = null;
        }
    }
})
const toggleKey = (key: string, state: boolean) => {
    if (key == "ArrowLeft") {
        left = state
    } else if (key == "ArrowRight") {
        right = state
    } else if (key == "ArrowUp") {
        up = state
    }
}

const frame = () => {
    requestAnimationFrame(frame);
    ship.update(left, right, up);
    stuff.update();
    canvas.clearCanvas(canvas.game);
    ship.draw();
    stuff.draw();
};
requestAnimationFrame(frame);