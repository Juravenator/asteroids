import { canvas, context } from "./canvas";
import * as score from "./score";
import { shipData } from "./ship";
import { asteroids, cycleNum } from "./stuff";

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
        if (shipData.protected && score.data.firstinput) {
            const timediff = window.performance.now() - shipData.protected;
            const evencycle = cycleNum(1000, 8, timediff) % 2;
            if (evencycle) {
                return
            }
        }
        context.resetTransform();
        context.translate(w - 5 - (20 * i), 10);
        context.stroke(heart);
    }

    context.resetTransform();
    context.font = "12px 'Press Start 2P', system-ui";
    context.fillText(`score: ${score.data.score}`, 10, 22);
    context.fillText(`level: ${asteroids.length}`, 10, 36);
    const ms = ((score.data.lives == 0 && score.data.died) || window.performance.now()) - score.data.started;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(ms % 60000) / 1000;
    context.fillText(`time : ${minutes}:${seconds}`, 10, 50);
}
