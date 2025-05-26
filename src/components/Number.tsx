import {Component} from "solid-js";
import "./Number.css"
import {DefaultProps} from "./helpers.js";

interface NumberProps extends DefaultProps {
    value: () => number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
}

export const Number: Component<NumberProps> = (props) => {
    const {min, max, value, setValue} = props;
    const changeBy = (difference: number) => {
        const newValue = value() + difference;
        if (min !== undefined && newValue < min) {
            setValue(min);
        } else if (max !== undefined && newValue > max) {
            setValue(max);
        } else {
            setValue(newValue);
        }
    }
    const validateInput = (e: InputEvent) => {
        const input = e.currentTarget as HTMLInputElement;
        if (input.value === "") {
            input.value = "0";
            return;
        }
        if (input.value.includes(".")) {
            input.value = input.value.slice(0, -1);
            return;
        }
        const newValue = +input.value;
        if (isNaN(newValue)) {
            input.value = value().toString();
            return;
        }
        // Prevent scientific notation
        if (Math.abs(newValue) > 10e19) {
            input.value = value().toString();
            return;
        }
        if (min !== undefined && newValue < min) {
            input.value = min.toString();
            setValue(min);
        } else if (max !== undefined && newValue > max) {
            input.value = max.toString();
            setValue(max);
        } else {
            setValue(newValue);
        }
    }
    return (
        <div class={`soup-element soup-number-input ${props.class ?? ""}`}>
            {min !== undefined && <span class="soup-number-min">{min} &lt;</span>}
            <input type="text" inputmode="numeric" value={value()}
                   onInput={validateInput}/>
            {max !== undefined && <span class="soup-number-max">&lt; {max}</span>}
            <button tabIndex={-1} onClick={() => changeBy(-1)}>-</button>
            <button tabIndex={-1} onClick={() => changeBy(1)}>+</button>
        </div>
    );
};
