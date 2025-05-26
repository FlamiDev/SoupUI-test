import {Component, JSX} from "solid-js";
import "./Soup.css"
import {ContainerProps} from "./helpers.js";

interface GridProps extends ContainerProps {
    "cols"?: number | "auto";
    "rows"?: number | "auto";
    compact?: boolean;
}

export const Grid: Component<GridProps> = (props) => {
    const style: JSX.CSSProperties = {
        display: "grid",
        gap: "8px",
        background: props.background ?? "white",
    }
    if (props.width) {
        style.width = `${props.width}px`;
    }
    if (props.height) {
        style.height = `${props.height}px`;
    }
    if (props["cols"]) {
        if (props["cols"] === "auto") {
            style["grid-auto-columns"] = "max-content";
        } else {
            style["grid-template-columns"] = `repeat(${props["cols"]}, 1fr)`;
        }
    }
    if (props["rows"]) {
        if (props["rows"] === "auto") {
            style["grid-auto-rows"] = "max-content";
        } else {
            style["grid-template-rows"] = `repeat(${props["rows"]}, 1fr)`;
        }
    }
    if (props.compact) {
        style["grid-auto-flow"] = "dense";
    }
    return (
        <div class={`soup-container ${props.class ?? ""}`} style={style}>
            {props.children}
        </div>
    );
};