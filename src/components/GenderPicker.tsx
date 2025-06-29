import {Component, createEffect, createSignal, onMount} from "solid-js";
import {DefaultProps} from "./helpers.js";

export interface GenderPickerValue {
    average: { x: number, y: number };
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    pointsCount: number;
}

interface GenderPickerProps extends DefaultProps {
    setValue: (value: GenderPickerValue | null) => void;
}

export const GenderPicker: Component<GenderPickerProps> = (props) => {
    let canvasRef!: HTMLCanvasElement;
    let isDrawing = false;
    const [drawnPoints, setDrawnPoints] = createSignal<({ x: number, y: number }[])>([]);

    createEffect(() => {
        const pointsCount = drawnPoints().length;
        if (pointsCount === 0) return null;
        const pointsSum = drawnPoints().reduce((sum, point) => {
            return {x: sum.x + point.x, y: sum.y + point.y};
        }, {x: 0, y: 0});
        const averagePoint = {
            x: pointsSum.x / pointsCount / canvasRef.width,
            y: pointsSum.y / pointsCount / canvasRef.height
        };
        const maxXPoint = Math.max(...drawnPoints().map(point => point.x), 0) / canvasRef.width;
        const maxYPoint = Math.max(...drawnPoints().map(point => point.y), 0) / canvasRef.height;
        const minXPoint = Math.min(...drawnPoints().map(point => point.x), 0) / canvasRef.width;
        const minYPoint = Math.min(...drawnPoints().map(point => point.y), 0) / canvasRef.height;
        props.setValue({
            average: averagePoint,
            maxX: maxXPoint,
            maxY: maxYPoint,
            minX: minXPoint,
            minY: minYPoint,
            pointsCount: pointsCount
        });
    })

    onMount(() => {
        const canvas = canvasRef;
        const ctx = canvas.getContext("2d")!;

        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.fillStyle = "#fff8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    const isTouchEvent = (e: PointerEvent | TouchEvent): e is TouchEvent => {
        return "touches" in e;
    }

    const getPos = (e: PointerEvent | TouchEvent) => {
        const rect = canvasRef.getBoundingClientRect();
        const x = (isTouchEvent(e) ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = (isTouchEvent(e) ? e.touches[0].clientY : e.clientY) - rect.top;
        return {x, y};
    };

    const startDraw = (e: PointerEvent | TouchEvent) => {
        isDrawing = true;
        draw(e);
    };

    const endDraw = () => {
        isDrawing = false;
        lastPoint = null;
    };

    let lastPoint: { x: number, y: number } | null = null;
    const MIN_DIST = 20;

    const draw = (e: PointerEvent | TouchEvent) => {
        if (!isDrawing) return;

        const { x, y } = getPos(e);
        if (!lastPoint || Math.hypot(x - lastPoint.x, y - lastPoint.y) > MIN_DIST) {
            setDrawnPoints(prev => [...prev, { x, y }]);
            lastPoint = { x, y };
        }

        const ctx = canvasRef.getContext("2d")!;
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "#0ff";
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    };

    // noinspection JSUnusedAssignment
    return (
        <div style={{
            height: "300px",
            position: "relative",
        }}>
            <canvas
                style={{
                    width: "100%",
                    height: "100%",
                    "z-index": 10,
                    "position": "absolute",
                    top: 0,
                    left: 0,
                }}
                ref={canvasRef}
                onPointerDown={startDraw}
                onPointerUp={endDraw}
                onPointerMove={draw}
                onTouchStart={startDraw}
                onTouchEnd={endDraw}
                onTouchMove={draw}
            />
            <div style={{
                "width": "100%",
                "height": "100%",
                "background": "radial-gradient(at -10% 110%, yellow, transparent 60%)",
                "position": "absolute",
                "top": 0,
                "left": 0,
                "z-index": 5,
            }}></div>
            <div style={{
                "width": "100%",
                "height": "100%",
                "background": "linear-gradient(to bottom right, #3B82F6, #9b2aff, #EC4899)",
            }}></div>
        </div>
    );
}
