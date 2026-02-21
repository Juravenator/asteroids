import * as ship from "./ship";
import * as stuff from "./stuff";

export type Score = {
    score: number,
    lives: number,
    died: boolean,
    firstinput: boolean,
    inputdisabled: boolean, // dead time just after game over
};
const newScore = (): Score => {
    return {
        score: 0,
        lives: 5,
        died: false,
        firstinput: false,
        inputdisabled: false,
    }
}
export let data = newScore();
data.died = true; // pretend, so we see the new game text
export const reset = () => {
    data = newScore();
};

export const die = () => {
    if (ship.shipData.protected) {
        return
    }
    if (data.lives) {
        data.lives -= 1;
        ship.shipData.destroyed = ship.shipData.protected = window.performance.now();
        data.inputdisabled = true;
        if (data.lives) {
            setTimeout(() => {
                data.inputdisabled = false;
                ship.reset();
                setTimeout(() => {
                    ship.shipData.protected = null;
                }, 2000);
            }, 2000);
        } else {
            data.died = true;
            data.inputdisabled = true;
            setTimeout(() => {
                ship.reset();
                stuff.reset();
                data.inputdisabled = false
            }, 5000);
        }
    }
}