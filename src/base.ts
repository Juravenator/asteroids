import { canvas, context } from "./canvas";

export const draw = () => {
    const w = canvas.width;
    const h = canvas.height;

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