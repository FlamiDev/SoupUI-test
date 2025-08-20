import {Component, onCleanup} from "solid-js";
import "./Slider.css"
import {DefaultProps} from "./helpers.tsx";

interface SliderPropsBase extends DefaultProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
}

interface InteractiveSliderProps extends SliderPropsBase {
    setValue: (v: number) => void;
    interactive?: true;
}

interface NonInteractiveSliderProps extends SliderPropsBase {
    interactive: false;
}

type SliderProps = InteractiveSliderProps | NonInteractiveSliderProps;

export const Slider: Component<SliderProps> = (props) => {
    if (props.interactive === undefined) {
        props.interactive = true; // Default to interactive if not specified
    }

    const min = () => props.min ?? 0;
    const max = () => props.max ?? 100;
    const step = () => props.step ?? 5;

    let trackRef!: HTMLDivElement;

    const clampStep = (v: number) => {
        const clamped = Math.min(max(), Math.max(min(), v));
        return Math.round((clamped - min()) / step()) * step() + min();
    }
    const fraction = () => ((props.value - min()) / (max() - min()));

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!props.interactive) return;
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            props.setValue(clampStep(props.value - step()));
        } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            props.setValue(clampStep(props.value + step()));
        } else if (e.key === "Home") {
            e.preventDefault();
            props.setValue(min());
        } else if (e.key === "End") {
            e.preventDefault();
            props.setValue(max());
        }
    }

    const updateFromDragging = (e: MouseEvent | TouchEvent) => {
        if (!props.interactive) return;
        const rect = trackRef.getBoundingClientRect();
        // noinspection JSSuspiciousNameCombination
        const zeroWidth = rect.height;
        const clientX = (e as TouchEvent).touches
            ? (e as TouchEvent).touches[0].clientX
            : (e as MouseEvent).clientX;
        const newValue = clampStep(
            ((clientX - rect.left - (zeroWidth / 2)) / (rect.width - zeroWidth)) * (max() - min()) + min()
        );
        props.setValue(newValue);
    };

    const startDrag = (e: MouseEvent | TouchEvent) => {
        if (!props.interactive) return;
        updateFromDragging(e);
        window.addEventListener("mousemove", updateFromDragging);
        window.addEventListener("touchmove", updateFromDragging);
        window.addEventListener("mouseup", endDrag);
        window.addEventListener("touchend", endDrag);
    };

    const endDrag = () => {
        if (!props.interactive) return;
        window.removeEventListener("mousemove", updateFromDragging);
        window.removeEventListener("touchmove", updateFromDragging);
        window.removeEventListener("mouseup", endDrag);
        window.removeEventListener("touchend", endDrag);
    };

    onCleanup(() => endDrag());

    // noinspection JSUnusedAssignment
    return (
        <div
            class={`soup-slider soup-element ${props.class ?? ""} ${props.interactive ? "interactive" : ""}`}
            onMouseDown={props.interactive ? startDrag : undefined}
            onTouchStart={props.interactive ? startDrag : undefined}
            onKeyDown={props.interactive ? handleKeyDown : undefined}
            tabIndex={props.interactive ? 0 : undefined}
            role={props.interactive ? "slider" : "progressbar"}
            ref={trackRef}
            aria-valuemin={min()}
            aria-valuemax={max()}
            aria-valuenow={props.value}
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
