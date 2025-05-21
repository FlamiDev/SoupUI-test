import {Accessor, Component, JSX, Setter} from "solid-js";
import "../SoupUI.css"
import {DefaultProps} from "./helpers.js";

interface InputProps extends DefaultProps {
    placeholder?: string;
    type?: JSX.InputHTMLAttributes<HTMLInputElement>["type"];
    value?: Accessor<string>
    setValue?: Setter<string>
}

export const Input: Component<InputProps> = (props) => {
    const {placeholder, type, value, setValue} = props;
    return (
        <input class="element" type={type} placeholder={placeholder} value={value?.()}
               onInput={(e) => setValue?.(e.target.value)}/>
    );
};
