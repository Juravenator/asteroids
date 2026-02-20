import { game } from "./canvas";

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
        size, collision_radius, x, y, vx, vy, rot, vrot
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
        asteroid.rot += asteroid.vrot;
        if (asteroid.x > window.innerWidth || asteroid.x < 0 || asteroid.y < 0 || asteroid.y > window.innerHeight) {
            destroyAstroid(i)
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

export const destroyAstroid = (i: number, respawn = 10000) => {
    asteroids[i] = null;
    setTimeout(() => asteroids[i] = newAstroid(), getRandomInt(respawn));
}

export const checkCollision = (x: number, y: number, ctx: CanvasRenderingContext2D): number | null => {
    for (let i = 0; i < asteroids.length; i++) {
        const asteroid = asteroids[i];
        if (!asteroid) {
            continue
        }
        // quick check
        if (x < asteroid.x - asteroid.collision_radius || x > asteroid.x + asteroid.collision_radius) {
            continue
        }
        if (y < asteroid.y - asteroid.collision_radius || y > asteroid.y + asteroid.collision_radius) {
            continue
        }

        // slow check
        // https://swharden.com/blog/2022-02-01-point-in-rectangle/
        // https://stackoverflow.com/a/17146376
        const [x1, y1] = rotatePoint(-asteroid.size/2, -asteroid.size/2, asteroid.rot, asteroid.x, asteroid.y);
        const [x2, y2] = rotatePoint(asteroid.size/2, -asteroid.size/2, asteroid.rot, asteroid.x, asteroid.y);
        const [x3, y3] = rotatePoint(-asteroid.size/2, asteroid.size/2, asteroid.rot, asteroid.x, asteroid.y);
        const [x4, y4] = rotatePoint(asteroid.size/2, asteroid.size/2, asteroid.rot, asteroid.x, asteroid.y);        

        const a1 = areaTriangle(x1, y1, x2, y2, x, y);
        const a2 = areaTriangle(x2, y2, x3, y3, x, y);
        const a3 = areaTriangle(x3, y3, x4, y4, x, y);
        const a4 = areaTriangle(x4, y4, x1, y1, x, y);
        const a = a1+a2+a3+a4;
        const difference = a - Math.pow(asteroid.size, 2);
        if (difference < 1) {
            return i
        }
    }
    return null;
}

const rotatePoint = (x: number, y: number, rot: number, offsetx = 0, offsety = 0): [number, number] => {
    const xrot = offsetx + (x * Math.cos(rot)) - (y * Math.sin(rot));
    const yrot = offsety + (x * Math.sin(rot)) + (y * Math.cos(rot));
    return [xrot, yrot];
}

const areaTriangle = (x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) => {
    // https://math.stackexchange.com/a/516223
    return Math.abs((x1-x3)*(y2-y1)-(x1-x2)*(y3-y1)) / 2;
}
