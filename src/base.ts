import { canvas, context } from "./canvas";
import * as score from "./score";

const heart = new Path2D();
heart.moveTo(7.5, 12.5);
heart.lineTo(14.5, 5.5);
heart.lineTo(14.5, 2.5);
heart.lineTo(12.5, 0.5);
heart.lineTo(9.5, 0.5);
heart.lineTo(7.5, 2.5);
heart.lineTo(5.5, 0.5);
heart.lineTo(2.5, 0.5);
heart.lineTo(0.5, 2.5);
heart.lineTo(0.5, 5.5);
heart.closePath();

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
    for (let i = 1; i <= score.data.lives; i++) {
        context.resetTransform();
        context.translate(w - 5 - (20 * i), 10);
        context.stroke(heart);
    }
}
