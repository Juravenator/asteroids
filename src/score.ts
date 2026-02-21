import * as ship from "./ship";

export type Score = {
    score: number,
    lives: number,
    died: boolean,
    inputdisabled: boolean, // dead time just after game over
};
const newScore = (): Score => {
    return {
        score: 0,
        lives: 5,
        died: false,
        inputdisabled: false,
    }
}
export let data = newScore();
data.died = true; // pretend, so we see the new game text
export const reset = () => {
    data = newScore();
    ship.reset();
};

export const die = () => {
    if (data.lives) {
        data.lives -= 1;
        ship.shipData.destroyed = window.performance.now();
        if (!data.lives) {
            data.died = true;
            data.inputdisabled = true;
            setTimeout(() => data.inputdisabled = false, 5000);
        }
    }
}