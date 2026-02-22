import { play, playExplosion } from "./audio";
import * as ship from "./ship";
import * as stuff from "./stuff";

export type Score = {
    score: number,
    lives: number,
    died: number | null,
    firstinput: boolean,
    inputdisabled: boolean, // dead time just after game over
};
const newScore = (): Score => {
    return {
        score: 0,
        lives: 5,
        died: null,
        firstinput: false,
        inputdisabled: false,
    }
}
export let data = newScore();
data.died = 1; // pretend, so we see the new game text
export const reset = () => {
    data = newScore();
};

export const die = () => {
    if (ship.shipData.protected) {
        return
    }
    if (data.lives) {
        data.lives -= 1;
        data.died = ship.shipData.destroyed = ship.shipData.protected = window.performance.now();
        data.inputdisabled = true;
        playExplosion();
        if (data.lives) {
            setTimeout(() => {
                data.inputdisabled = false;
                ship.reset();
                setTimeout(() => {
                    ship.shipData.protected = null;
                }, 2000);
            }, 2000);
        } else {
            setTimeout(() => {
                play('game_over');
            }, 1000);
            setTimeout(() => {
                ship.reset();
                stuff.reset();
                data.inputdisabled = false;
                data.firstinput = false;
            }, 5000);
        }
    }
}