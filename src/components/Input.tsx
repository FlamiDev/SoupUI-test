import {Component} from "solid-js";
import "./Soup.css"
import {DefaultProps} from "./helpers.tsx";

interface InputProps extends DefaultProps {
    placeholder?: string;
    type?: "url" | "email" | "password" | "text";
    value?: string;
    setValue?: (value: string) => void;
}

export const Input: Component<InputProps> = (props) => {
    return (
        <input class={`soup-element ${props.class ?? ""}`} type={props.type ?? "text"} placeholder={props.placeholder}
               value={props.value} onInput={(e) => props.setValue?.(e.target.value)}/>
    );
};
