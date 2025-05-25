import {Component, onCleanup} from "solid-js";
import "./Slider.css"
import {DefaultProps} from "./helpers.js";

interface SliderProps extends DefaultProps {
    value: () => number;
    setValue: (v: number) => void;
    min?: number;
    max?: number;
    step?: number;
}

export const Slider: Component<SliderProps> = (props) => {
    const min = props.min ?? 0;
    const max = props.max ?? 100;
    const step = props.step ?? 5;

    let trackRef!: HTMLDivElement;

    const clampStep = (v: number) => {
        const clamped = Math.min(max, Math.max(min, v));
        return Math.round((clamped - min) / step) * step + min;
    }
    const fraction = () => ((props.value() - min) / (max - min));

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            props.setValue(clampStep(props.value() - step));
        } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            props.setValue(clampStep(props.value() + step));
        } else if (e.key === "Home") {
            e.preventDefault();
            props.setValue(min);
        } else if (e.key === "End") {
            e.preventDefault();
            props.setValue(max);
        }
    }

    const updateFromDragging = (e: MouseEvent | TouchEvent) => {
        const rect = trackRef.getBoundingClientRect();
        // noinspection JSSuspiciousNameCombination
        const zeroWidth = rect.height;
        const clientX = (e as TouchEvent).touches
            ? (e as TouchEvent).touches[0].clientX
            : (e as MouseEvent).clientX;
        const newValue = clampStep(
            ((clientX - rect.left - (zeroWidth / 2)) / (rect.width - zeroWidth)) * (max - min) + min
        );
        props.setValue(newValue);
    };

    const startDrag = (e: MouseEvent | TouchEvent) => {
        updateFromDragging(e);
        window.addEventListener("mousemove", updateFromDragging);
        window.addEventListener("touchmove", updateFromDragging);
        window.addEventListener("mouseup", endDrag);
        window.addEventListener("touchend", endDrag);
    };

    const endDrag = () => {
        window.removeEventListener("mousemove", updateFromDragging);
        window.removeEventListener("touchmove", updateFromDragging);
        window.removeEventListener("mouseup", endDrag);
        window.removeEventListener("touchend", endDrag);
    };

    onCleanup(() => endDrag());

    // noinspection JSUnusedAssignment
    return (
        <div
            class="soup-slider soup-element"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={trackRef}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={props.value()}
        >
            <div
                class="soup-slider-fill"
                style={{
                    "--width": fraction()
                }}
            />
        </div>
    );
};
