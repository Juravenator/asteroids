import * as score from "./score";
import * as base from "./base";
import * as canvas from "./canvas";
import * as ship from "./ship";
import * as stuff from "./stuff";
import * as pew from "./pew";

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
    if (score.data.inputdisabled) {
        return
    }
    if (score.data.died) {
        score.reset()
    }
    toggleKey(e.key, true);
    if (e.key == " ") {
        if (!spacepressed) {
            spacepressed = setInterval(() => pew.pew(), 200);
            pew.pew();
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

const maintext = (t: string) => {
    const w = canvas.game.context.measureText(t).width;
    canvas.game.context.resetTransform();
    canvas.game.context.fillText(t, (window.innerWidth -w)/2, window.innerHeight / 4);
}

const frame = () => {
    requestAnimationFrame(frame);
    ship.move(left, right, up);
    stuff.move();
    pew.move();
    canvas.clearCanvas(canvas.game);
    stuff.draw();
    ship.draw();
    pew.draw();

    if (score.data.died) {
        maintext(score.data.inputdisabled ? "game over" : "press to play")
    }
};
requestAnimationFrame(frame);