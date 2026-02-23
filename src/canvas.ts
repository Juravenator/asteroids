export const canvas = document.querySelector("#game")! as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

const amber = '#FFB000';
const white = '#FFFFFF';
const green = '#33FF00';
const colours = [amber, white, green];

let screenColor = 0;

const init = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    context.strokeStyle = colours[screenColor]!;
    context.fillStyle = colours[screenColor]!;
    context.lineWidth = 1;
}
init();
addEventListener('resize', () => init())

export const clearCanvas = () => {
    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
}

addEventListener('keydown', e => {
    if (e.key == 'c') {
        screenColor = (screenColor + 1) % colours.length;
        init();
    }
})