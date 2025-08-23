import {Component, JSX, JSXElement} from "solid-js";
import "./Container.css"
import {DefaultProps} from "./helpers.tsx";

export interface ContainerProps extends DefaultProps {
    children: JSXElement;
    width?: number,
    height?: number,
    background?: string,
}

export const Container: Component<ContainerProps> = (props) => {
    const style = () => {
        const style: JSX.CSSProperties ={
            background: props.background ?? "white",
        }
        if (props.width) {
            style["max-width"] = `${props.width}px`;
        }
        if (props.height) {
            style["max-height"] = `${props.height}px`;
        }
        return style;
    }
    return (
        <div class={`soup-container ${props.class ?? ""}`} style={style()}>
            {props.children}
        </div>
    );
};