type Canvas = {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
};

const getCanvas = (name: string): Canvas => {
    const canvas = document.querySelector(name)! as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    return {canvas, context}
}

export const base = getCanvas('#base');
export const game = getCanvas('#game');

export const clearCanvas = (c: Canvas) => {
    c.context.resetTransform();
    c.context.clearRect(0, 0, c.canvas.width, c.canvas.height);
}

export const canvasFullscreen = (c: Canvas) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    c.canvas.width = w;
    c.canvas.height = h;
}

export const canvasWhiteStroke = (c: Canvas) => {
    c.context.strokeStyle = 'white';
    c.context.fillStyle = 'white';
    c.context.lineWidth = 1;
    c.context.font = "48px 'Press Start 2P', system-ui";
}