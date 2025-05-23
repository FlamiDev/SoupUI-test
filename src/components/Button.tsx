import {Component} from "solid-js";
import "../SoupUI.css"
import {DefaultProps} from "./helpers.js";

interface ButtonProps extends DefaultProps {
    name: string;
    onClick?: () => void;
}

export const Button: Component<ButtonProps> = (props) => {
    const {name, onClick} = props;
    return (
        <button class="soup-element soup-button" onClick={onClick}>{name}</button>
    );
};
