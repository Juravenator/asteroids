export const canvas = document.querySelector("#game")! as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

const init = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    context.strokeStyle = 'white';
    context.fillStyle = 'white';
    context.lineWidth = 1;
    context.font = "48px 'Press Start 2P', system-ui";
}
init();
addEventListener('resize', () => init())

export const clearCanvas = () => {
    context.resetTransform();
    context.clearRect(0, 0, canvas.width, canvas.height);
}
