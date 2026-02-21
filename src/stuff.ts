import { game } from "./canvas";
import { pews } from "./pew";

export const init = () => {
    for (let i = 0; i < 10; i++) {
        asteroids.push(newAstroid())
    }
}

type Asteroid = {
    size: number,
    collision_radius: number, // the diameter of the rough circle used for quick collision checking
    x: number,
    y: number,
    vx: number,
    vy: number,
    rot: number,
    vrot: number,
    destroyed: number | null,
}
export const asteroids: (Asteroid | null)[] = [];

enum StartPos {
  Top = 0,
  Bottom,
  Left,
  Right,
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const newAstroid = (): Asteroid => {
    let startpos = getRandomInt(3) as StartPos; // start at top, bottom, left, right
    let vx = getRandomInt(10) / 4;
    let vy = getRandomInt(10) / 4;
    let vrot = getRandomInt(5) / 10;
    let size = getRandomInt(30) / 2 + 10;
    let collision_radius = Math.sqrt(Math.pow(size, 2)*2) / 2
    let x = 0;
    let y = 0;
    let rot = 0;
    if (startpos == StartPos.Top) {
        x = getRandomInt(window.innerWidth)
    } else if (startpos == 1) {
        x = getRandomInt(window.innerWidth);
        y = window.innerHeight;
        vy = -vy;
    } else if (startpos == 2) {
        y = getRandomInt(window.innerHeight);
    } else if (startpos == 3) {
        x = window.innerWidth;
        y = getRandomInt(window.innerHeight);
        vx = -vx;
    }
    return {
        size, collision_radius, x, y, vx, vy, rot, vrot, destroyed: null
    }
};

export const move = () => {
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        if (!asteroid) {
            continue
        }
        asteroid.x += asteroid.vx;
        asteroid.y += asteroid.vy;
        if (!asteroid.destroyed) {
            asteroid.rot += asteroid.vrot;
        }
        if (asteroid.x > window.innerWidth || asteroid.x < 0 || asteroid.y < 0 || asteroid.y > window.innerHeight) {
            removeAstroid(i)
        }
    }
};

export const draw = () => {
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        if (!asteroid) {
            continue
        }
        game.context.resetTransform();
        game.context.translate(asteroid.x, asteroid.y);
        game.context.rotate(asteroid.rot);
        const s = asteroid.size / 2;
        game.context.beginPath();
        if (asteroid.destroyed) {
            const explodeTime = 1000;
            const cycles = 8;
            const timediff = window.performance.now() - asteroid.destroyed;
            if (timediff > explodeTime) {
                removeAstroid(i)
            }
            const evencycle = Math.floor(timediff / (explodeTime / cycles)) % 2;
            const diagfar = evencycle ? 5 : 7;
            const diagnear = diagfar - 3;
            const horizfar = evencycle ? 8 : 11;
            const horiznear = horizfar - 5;
            game.context.moveTo(-diagfar, -diagfar);
            game.context.lineTo(-diagnear, -diagnear);
            game.context.moveTo(diagfar, diagfar);
            game.context.lineTo(diagnear, diagnear);
            game.context.moveTo(diagfar, -diagfar);
            game.context.lineTo(diagnear, -diagnear);
            game.context.moveTo(-diagfar, diagfar);
            game.context.lineTo(-diagnear, diagnear);

            game.context.moveTo(-horizfar, 0);
            game.context.lineTo(-horiznear, 0);
            game.context.moveTo(horizfar, 0);
            game.context.lineTo(horiznear, 0);
            game.context.moveTo(0, -horizfar);
            game.context.lineTo(0, -horiznear);
            game.context.moveTo(0, horizfar);
            game.context.lineTo(0, horiznear);

            game.context.stroke();
            if (evencycle) {
                game.context.fillRect(-1.5, -1.5, 3, 3);
            }
        } else {
            game.context.moveTo(-s, -s);
            game.context.lineTo(s, -s);
            game.context.lineTo(s, s);
            game.context.lineTo(-s, s);
            game.context.closePath();
            for (const pew of pews) {
                if (game.context.isPointInPath(pew.x, pew.y)) {
                    asteroid.destroyed = window.performance.now();
                }
            }
            game.context.stroke();
        }
    }
};

export const removeAstroid = (i: number, respawn = 10000) => {
    asteroids[i] = null;
    setTimeout(() => asteroids[i] = newAstroid(), getRandomInt(respawn));
}
