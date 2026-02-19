import { base } from "./canvas";

export const draw = () => {
    const w = base.canvas.width;
    const h = base.canvas.height;
    const context = base.context;

    context.clearRect(0, 0, w, h);

    context.beginPath();

    context.moveTo(5.5, 10.5);
    context.lineTo(5.5, 5.5);
    context.lineTo(10.5, 5.5);

    context.moveTo(w - 10.5, 5.5);
    context.lineTo(w - 5.5, 5.5);
    context.lineTo(w - 5.5, 10.5);

    context.moveTo(5.5, h - 10.5);
    context.lineTo(5.5, h - 5.5);
    context.lineTo(10.5, h - 5.5);

    context.moveTo(w - 5.5, h - 10.5);
    context.lineTo(w - 5.5, h - 5.5);
    context.lineTo(w - 10.5, h - 5.5);

    context.stroke();
}