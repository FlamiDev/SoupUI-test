import {Component, JSX, JSXElement} from "solid-js";
import "./Container.css"
import {DefaultProps} from "./helpers.tsx";

export interface ChildlessContainerProps extends DefaultProps {
    width?: number,
    height?: number,
    background?: string,
}

export interface ContainerProps extends ChildlessContainerProps {
    children: JSXElement;
}

export const Container: Component<ContainerProps> = (props) => {
    const style = () => {
        const style: JSX.CSSProperties ={
            background: props.background ?? "white",
        }
        if (props.width) {
            style.width = `${props.width}px`;
        }
        if (props.height) {
            style.height = `${props.height}px`;
        }
        return style;
    }
    return (
        <div class={`soup-container ${props.class ?? ""}`} style={style()}>
            {props.children}
        </div>
    );
};