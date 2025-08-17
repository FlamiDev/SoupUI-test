import {Component} from "solid-js";
import "./Switch.css"
import {DefaultProps} from "./helpers.js";

interface SwitchProps extends DefaultProps {
    name: string;
    value: boolean;
    setValue?: (value: boolean) => void;
}

export const Switch: Component<SwitchProps> = (props) => {
    const {name, value, setValue} = props;
    return (
        <label class={`soup-switch-label ${props.class ?? ""}`}>
            <input class="soup-element soup-switch" type="checkbox" role="switch" checked={value}
                   onInput={(e) => setValue?.(e.target.checked)}/>
            <span>{name}</span>
        </label>
    );
};
