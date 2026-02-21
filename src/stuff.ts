import { game } from "./canvas";
import { pews } from "./pew";
import { die } from "./score";
import * as ship from "./ship";

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
            const timediff = window.performance.now() - asteroid.destroyed;
            if (timediff > 1000) {
                removeAstroid(i)
            }
            const evencycle = cycleNum(1000, 8, timediff) % 2;
            if (evencycle) {
                drawExplosion([5,2], [8,3], 3);
            } else {
                drawExplosion([7,4], [11, 6]);
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
            for (const [x, y] of ship.collision_points()) {
                if (game.context.isPointInPath(x, y)) {
                    die();
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

export const cycleNum = (period: number, cycles: number, t: number): number => {
    return Math.floor(t / (period / cycles));
}

export const drawExplosion = (diag: [number, number], horiz: [number, number], center = 0) => {
    const [diagfar, diagnear] = diag;
    const [horizfar, horiznear] = diag;
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
    if (center) {
        game.context.fillRect(-center/2, -center/2, center, center);
    }
}