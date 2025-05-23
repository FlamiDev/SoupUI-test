import {Component} from "solid-js";
import "../SoupUI.css"
import {DefaultProps} from "./helpers.js";

interface InputProps extends DefaultProps {
    placeholder?: string;
    type?: "url" | "email" | "password" | "text";
    value?: () => string;
    setValue?: (value: string) => void;
}

export const Input: Component<InputProps> = (props) => {
    const {placeholder, type, value, setValue} = props;
    return (
        <input class="soup-element" type={type ?? "text"} placeholder={placeholder} value={value?.()}
               onInput={(e) => setValue?.(e.target.value)}/>
    );
};
