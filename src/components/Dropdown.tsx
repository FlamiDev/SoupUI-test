import {createSignal, For} from "solid-js";
import "./Dropdown.css"
import {DefaultProps} from "./helpers.tsx";

interface DropdownProps<T extends Readonly<string[]>> extends DefaultProps {
    options: Readonly<T>;
    selected: T[number];
    setSelected: (value: T[number]) => void;
}

export const Dropdown = <TOption extends Readonly<string[]>>(props: DropdownProps<TOption>) => {
    const [isOpen, setOpen] = createSignal(false);
    const [focusedIndex, setFocusedIndex] = createSignal(props.options.indexOf(props.selected));

    const open = () => {
        setOpen(true)
    };

    const close = () => {
        setOpen(false)
    };

    const select = (index: number) => {
        props.setSelected(props.options[index]);
        setOpen(false);
        setFocusedIndex(index);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isOpen()) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(true);
            }
            return;
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((prev) => (prev + 1) % props.options.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((prev) => (prev - 1) % props.options.length);
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            select(focusedIndex());
        }
    }

    return (
        <div class={`soup-dropdown soup-element ${isOpen() ? "open" : ""} ${props.class ?? ""}`} tabIndex={0} onFocus={open}
             onBlur={close} onKeyDown={handleKeyDown}>
            <div class="soup-dropdown-toggle" onClick={open}>
                {props.selected}
                <span class="soup-dropdown-arrow">▼</span>
            </div>
            <div class="soup-dropdown-wrapper">
                <div class="soup-dropdown-menu">
                    <For each={props.options}>
                        {(option, i) => (
                            <div
                                class={`soup-dropdown-option ${option === props.selected ? "selected" : ""} ${focusedIndex() === i() ? "focused" : ""}`}
                                onClick={() => select(i())}
                            >
                                {option}
                            </div>
                        )}
                    </For>
                </div>
            </div>
        </div>
    );
};
