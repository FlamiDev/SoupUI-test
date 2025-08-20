import {Component, JSX, JSXElement} from "solid-js";
import "./Soup.css"
import {DefaultProps} from "./helpers.tsx";

interface GridProps extends DefaultProps {
    children: JSXElement;
    cols?: number | "auto";
    rows?: number | "auto";
    compact?: boolean;
}

export const Grid: Component<GridProps> = (props) => {
    const style = () => {
        const style: JSX.CSSProperties = {
            display: "grid",
            gap: "8px",
        }
        if (props.cols) {
            if (props.cols === "auto") {
                style["grid-auto-columns"] = "max-content";
            } else {
                style["grid-template-columns"] = `repeat(${props.cols}, 1fr)`;
            }
        }
        if (props.rows) {
            if (props.rows === "auto") {
                style["grid-auto-rows"] = "max-content";
            } else {
                style["grid-template-rows"] = `repeat(${props.rows}, 1fr)`;
            }
        }
        if (props.compact) {
            style["grid-auto-flow"] = "dense";
        }
        return style;
    }
    return (
        <div class={props.class ?? ""} style={style()}>
            {props.children}
        </div>
    );
};