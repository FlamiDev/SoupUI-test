import {ContainerProps} from "./Container.tsx";
import {Component, JSX, Show} from "solid-js";
import {Portal} from "solid-js/web";
import {Button} from "./Button.tsx";
import "./Dialog.css"

interface DialogProps extends ContainerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    positiveText: string;
    negativeText?: string;
    onClose?: (positive: boolean) => void;
}

export const Dialog: Component<DialogProps> = (props) => {
    const style = () => {
        const style: JSX.CSSProperties = {
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
    return <Portal>
        <Show when={props.open}>
            <div class="soup-dialog-wrapper">
                <div class={`soup-dialog ${props.class ?? ""}`} style={style()}>
                    {props.children}
                    <div class="soup-dialog-buttons">
                        <Show when={props.negativeText}>
                            {text =>
                                <Button
                                    name={text()}
                                    onClick={() => {
                                        props.onClose?.(false)
                                        props.setOpen(false)
                                    }}
                                    class="soup-dialog-button-negative"
                                />
                            }
                        </Show>
                        <Button name={props.positiveText} onClick={() => {
                            props.onClose?.(true)
                            props.setOpen(false)
                        }} class="soup-dialog-button-positive"/>
                    </div>
                </div>
            </div>
        </Show>
    </Portal>
}