import {Component} from "solid-js";
import "./Number.css"
import {DefaultProps} from "./helpers.js";

interface NumberProps extends DefaultProps {
    value: number;
    setValue: (value: number) => void;
    min?: number;
    max?: number;
}

export const Number: Component<NumberProps> = (props) => {
    const changeBy = (difference: number) => {
        const newValue = props.value + difference;
        if (props.min !== undefined && newValue < props.min) {
            props.setValue(props.min);
        } else if (props.max !== undefined && newValue > props.max) {
            props.setValue(props.max);
        } else {
            props.setValue(newValue);
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
            input.value = props.value.toString();
            return;
        }
        // Prevent scientific notation
        if (Math.abs(newValue) > 10e19) {
            input.value = props.value.toString();
            return;
        }
        if (props.min !== undefined && newValue < props.min) {
            input.value = props.min.toString();
            props.setValue(props.min);
        } else if (props.max !== undefined && newValue > props.max) {
            input.value = props.max.toString();
            props.setValue(props.max);
        } else {
            props.setValue(newValue);
        }
    }
    return (
        <div class={`soup-element soup-number-input ${props.class ?? ""}`}>
            {props.min !== undefined && <span class="soup-number-min">{props.min} &le;</span>}
            <input type="text" inputmode="numeric" value={props.value}
                   onInput={validateInput}/>
            {props.max !== undefined && <span class="soup-number-max">&le; {props.max}</span>}
            <button tabIndex={-1} onClick={() => changeBy(-1)}>-</button>
            <button tabIndex={-1} onClick={() => changeBy(1)}>+</button>
        </div>
    );
};
