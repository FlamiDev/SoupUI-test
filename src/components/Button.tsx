import {Component} from "solid-js";
import "./Button.css"
import {DefaultProps} from "./helpers.js";

interface ButtonProps extends DefaultProps {
    name: string;
    onClick?: () => void;
}

export const Button: Component<ButtonProps> = (props) => {
    const {name, onClick} = props;
    return (
        <button class={`soup-element soup-button ${props.class}`} onClick={onClick}>{name}</button>
    );
};
