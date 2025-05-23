import {JSXElement} from "solid-js";
import "../SoupUI.css"

export interface DefaultProps {
    class?: string;
}

export interface ContainerProps extends DefaultProps {
    children: JSXElement;
    width?: number,
    height?: number,
    background?: string,
}
