const ship = document.getElementById('ship')! as HTMLCanvasElement;
const shipc = ship.getContext('2d')!;

type Pew = {
    x: number,
    y: number,
    vx: number,
    vy: number,
    rot: number,
};
const pews: Pew[] = [];

export const shipData = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    rot: 0,
    // a: 0,
    vx: 0,
    vy: 0,
    rotspeed: .05,
    vspeed: .1,
};

export const init = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    ship.width = w;
    ship.height = h;

    shipc.strokeStyle = 'white';
    shipc.fillStyle = 'white';
    shipc.lineWidth = 1;
}

const shipp = new Path2D();
shipp.moveTo(-10, 10);
shipp.lineTo(0, -10);
shipp.lineTo(10, 10);
shipp.moveTo(-10, 0);
shipp.lineTo(10, 0);
const pewp = new Path2D();
pewp.moveTo(0, 0);
pewp.lineTo(0, 5);
export const redraw = () => {
    shipc.resetTransform();
    shipc.clearRect(0, 0, ship.width, ship.height);
    shipc.translate(shipData.x, shipData.y);
    shipc.rotate(shipData.rot);
    shipc.stroke(shipp);

    for (let i = 0; i < pews.length; i++) {
        const pew = pews[i]!;
        if (pew.x < 0 || pew.x > window.innerWidth || pew.y < 0 || pew.y > window.innerHeight) {
            pews.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < pews.length; i++) {
        const pew = pews[i]!;
        shipc.resetTransform();
        shipc.translate(pew.x, pew.y);
        shipc.rotate(pew.rot);
        shipc.stroke(pewp);
    }
}

export const frame = (left: boolean, right: boolean, up: boolean) => {
    if (left) {
        shipData.rot -= shipData.rotspeed
    }
    if (right) {
        shipData.rot += shipData.rotspeed
    }
    if (up) {
        shipData.vx += Math.sin(shipData.rot) * shipData.vspeed;
        shipData.vy += Math.cos(shipData.rot) * shipData.vspeed;
    }

    shipData.x += shipData.vx;
    shipData.y -= shipData.vy; // y in canvas is 0 at the top

    if (shipData.x < -20) {
        shipData.x = window.innerWidth + 20
    }
    if (shipData.x > window.innerWidth + 20) {
        shipData.x = -20;
    }
    if (shipData.y < -20) {
        shipData.y = window.innerHeight + 20
    }
    if (shipData.y > window.innerHeight + 20) {
        shipData.y = -20;
    }

    for (const pew of pews) {
        pew.x += pew.vx;
        pew.y += pew.vy;
    }

    redraw()
};

export const pew = () => {
    const rot = shipData.rot;
    const x = shipData.x + (Math.sin(rot) * 20);
    const y = shipData.y - (Math.cos(rot) * 20);
    const vx = shipData.vx + (Math.sin(rot) * 3);
    const vy = -shipData.vy - (Math.cos(rot) * 3);
    pews.push({x, y, vx, vy, rot})
};