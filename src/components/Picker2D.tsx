import {Component, createEffect, createSignal, onMount} from "solid-js";
import {DefaultProps} from "./helpers.js";
import "./Picker2D.css";

export interface Picker2DValue {
    average: { x: number, y: number };
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    pointsCount: number;
}

interface SpecificPicker2DProps extends DefaultProps {
    setValue: (value: Picker2DValue | null) => void;
}

interface Picker2DProps extends SpecificPicker2DProps {
    color_tl: string;
    color_tr: string;
    color_bl: string;
    color_br: string;
    label_x: string;
    label_y: string;
}

export const GenderPicker: Component<SpecificPicker2DProps> = (props) => Picker2D({
    ...props,
    color_tl: "#3b82f6",
    color_tr: "#9b2aff",
    color_bl: "#decd22",
    color_br: "#ec4899",
    label_y: "masc",
    label_x: "fem"
})

export const Picker2D: Component<Picker2DProps> = (props) => {
    let canvasRef!: HTMLCanvasElement;

    const MIN_NEW_POINT_DIST_FRAC = 0.1;
    const DRAW_RADIUS = 50;
    let isDrawing = false;
    let [isErasing, setIsErasing] = createSignal(false);
    let lastPoint: { x: number, y: number } | null = null;

    const [drawnPoints, setDrawnPoints] = createSignal<({ x: number, y: number }[])>([]);

    createEffect(() => {
        const pointsCount = drawnPoints().length;
        if (pointsCount === 0) return null;
        const pointsSum = drawnPoints().reduce((sum, point) => {
            return {x: sum.x + point.x, y: sum.y + point.y};
        }, {x: 0, y: 0});
        const averagePoint = {
            x: pointsSum.x / pointsCount,
            y: pointsSum.y / pointsCount
        };
        const maxXPoint = Math.max(...drawnPoints().map(point => point.x), 0);
        const maxYPoint = Math.max(...drawnPoints().map(point => point.y), 0);
        const minXPoint = Math.min(...drawnPoints().map(point => point.x), 0);
        const minYPoint = Math.min(...drawnPoints().map(point => point.y), 0);
        props.setValue({
            average: averagePoint,
            maxX: maxXPoint,
            maxY: maxYPoint,
            minX: minXPoint,
            minY: minYPoint,
            pointsCount: pointsCount
        });
    })

    const drawAtFraction = (x: number, y: number, erase?: boolean) => {
        const ctx = canvasRef.getContext("2d")!;
        // yes, erasing actually draws because the color is underneath the canvas
        if (erase) {
            ctx.globalCompositeOperation = "source-over";
        } else {
            ctx.globalCompositeOperation = "destination-out";
        }
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x * canvasRef.width, y * canvasRef.height, DRAW_RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }

    const isTouchEvent = (e: PointerEvent | TouchEvent): e is TouchEvent => {
        return "touches" in e;
    }

    const getPos = (e: PointerEvent | TouchEvent) => {
        const rect = canvasRef.getBoundingClientRect();
        const x = (isTouchEvent(e) ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (isTouchEvent(e) ? e.touches[0].clientY : e.clientY) - rect.top;
        return {x: x / canvasRef.width, y: y / canvasRef.height};
    };

    const setCanvasSize = () => {
        const ctx = canvasRef.getContext("2d")!;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvasRef.getBoundingClientRect();

        canvasRef.width = rect.width * dpr;
        canvasRef.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvasRef.width, canvasRef.height);

        for (const {x, y} of drawnPoints()) {
            drawAtFraction(x, y);
        }
    }

    onMount(() => {
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);
    });

    const draw = (e: PointerEvent | TouchEvent) => {
        e.preventDefault();

        if (!isDrawing) return;
        if (isTouchEvent(e) ? e.touches.length <= 0 : e.buttons === 0) {
            endDraw(e);
            return;
        }

        let erasing = isErasing();
        if (!isTouchEvent(e) && e.buttons === 2) {
            erasing = true;
        }

        const {x, y} = getPos(e);
        drawAtFraction(x, y, erasing);

        if (lastPoint && Math.hypot(x - lastPoint.x, y - lastPoint.y) < MIN_NEW_POINT_DIST_FRAC) return;
        if (erasing) {
            const width = canvasRef.width;
            const height = canvasRef.height;
            setDrawnPoints(prev => prev.filter(
                p => Math.hypot((p.x - x) * width, (p.y - y) * height) > DRAW_RADIUS
            ));
        } else {
            setDrawnPoints(prev => [...prev, {x, y}]);
        }
        lastPoint = {x, y};
    };

    const startDraw = (e: PointerEvent | TouchEvent) => {
        e.preventDefault();
        isDrawing = true;
        draw(e);
    };

    const endDraw = (e: PointerEvent | TouchEvent) => {
        e.preventDefault();
        isDrawing = false;
        lastPoint = null;
    };

    // noinspection JSUnusedAssignment
    return (
        <div class="soup-element soup-picker2d">
            <div class="soup-picker2d-label-y">{props.label_y}</div>
            <div class="soup-picker2d-label-x">{props.label_x}</div>
            <button class="soup-picker2d-mode-button soup-button"
                    onClick={() => setIsErasing(v => !v)}>{isErasing() ? "-" : "+"}</button>
            <div class="soup-picker2d-picker">
                <canvas class="soup-picker2d-canvas"
                        onContextMenu={(e) => e.preventDefault()}
                        ref={canvasRef}
                        onPointerDown={startDraw}
                        onPointerUp={endDraw}
                        onPointerMove={draw}
                        onTouchStart={startDraw}
                        onTouchEnd={endDraw}
                        onTouchMove={draw}
                />
                <div class="soup-picker2d-gradient" style={{
                    "--pos-x": "-10%",
                    "--pos-y": "-10%",
                    "--color": props.color_tl,
                }}></div>
                <div class="soup-picker2d-gradient" style={{
                    "--pos-x": "110%",
                    "--pos-y": "-10%",
                    "--color": props.color_tr,
                }}></div>
                <div class="soup-picker2d-gradient" style={{
                    "--pos-x": "-10%",
                    "--pos-y": "110%",
                    "--color": props.color_bl,
                }}></div>
                <div class="soup-picker2d-gradient" style={{
                    "--pos-x": "110%",
                    "--pos-y": "110%",
                    "--color": props.color_br,
                }}></div>
            </div>
        </div>
    );
}
