export const drawBase = (el: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    el.width = w;
    el.height = h;

    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.lineWidth = 1;

    ctx.clearRect(0, 0, w, h);

    ctx.beginPath();

    ctx.moveTo(5.5, 10.5);
    ctx.lineTo(5.5, 5.5);
    ctx.lineTo(10.5, 5.5);

    ctx.moveTo(w - 10.5, 5.5);
    ctx.lineTo(w - 5.5, 5.5);
    ctx.lineTo(w - 5.5, 10.5);

    ctx.moveTo(5.5, h - 10.5);
    ctx.lineTo(5.5, h - 5.5);
    ctx.lineTo(10.5, h - 5.5);

    ctx.moveTo(w - 5.5, h - 10.5);
    ctx.lineTo(w - 5.5, h - 5.5);
    ctx.lineTo(w - 10.5, h - 5.5);

    ctx.stroke();

    ctx.translate(w / 2, h / 2);
}