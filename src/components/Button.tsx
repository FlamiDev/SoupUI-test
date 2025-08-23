import {Component} from "solid-js";
import "./Button.css"
import {DefaultProps} from "./helpers.tsx";

interface ButtonProps extends DefaultProps {
    name: string;
    onClick?: () => void;
}

export const Button: Component<ButtonProps> = (props) => {
    return (
        <button class={`soup-element soup-button ${props.class ?? ""}`} onClick={props.onClick}>{props.name}</button>
    );
};

interface LinkProps extends DefaultProps {
    name: string;
    href: string;
}

export const Link: Component<LinkProps> = (props) => {
    return (
        <a class={`soup-element soup-button ${props.class ?? ""}`} href={props.href}>{props.name}</a>
    );
}