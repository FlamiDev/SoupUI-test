import {Component} from "solid-js";
import "./Throbber.css"
import {DefaultProps} from "./helpers.tsx";

export const Throbber: Component<DefaultProps> = (props) => {
    return (
        <div class={`soup-throbber soup-element ${props.class ?? ""}`}/>
    );
};
