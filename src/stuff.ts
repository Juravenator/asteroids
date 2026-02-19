import { game } from "./canvas";

export const init = () => {
    for (let i = 0; i < 10; i++) {
        asteroids.push(newAstroid())
    }
}

type Asteroid = {
    size: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
    rot: number,
    vrot: number,
}
const asteroids: (Asteroid | null)[] = [];

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
        size, x, y, vx, vy, rot, vrot
    }
};

export const update = () => {
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        if (!asteroid) {
            continue
        }
        asteroid.x += asteroid.vx;
        asteroid.y += asteroid.vy;
        asteroid.rot += asteroid.vrot;
        if (asteroid.x > window.innerWidth || asteroid.x < 0 || asteroid.y < 0 || asteroid.y > window.innerHeight) {
            asteroids[i] = null;
            setTimeout(() => {
                asteroids[i] = newAstroid();
            }, getRandomInt(10000));
        }
    }
};

export const draw = () => {
    for (let asteroid of asteroids) {
        if (!asteroid) {
            continue
        }
        game.context.resetTransform();
        game.context.translate(asteroid.x, asteroid.y);
        game.context.rotate(asteroid.rot);
        const s = asteroid.size / 2;
        game.context.strokeRect(-s, -s, asteroid.size, asteroid.size);
    }
};
