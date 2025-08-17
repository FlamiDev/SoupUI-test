import {ContainerProps} from "./Container.tsx";
import {createSignal, For, JSX, JSXElement, Show} from "solid-js";
import "./Tabs.css";

interface TabsProps<N extends Readonly<string[]>> extends ContainerProps {
    tabNames: Readonly<N>;
    children: JSXElement[] & { length: N["length"] };
}

export const Tabs = <N extends Readonly<string[]>>(props: TabsProps<N>) => {
    const style = () => {
        const style: JSX.CSSProperties = {
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

    const [activeTab, setActiveTab] = createSignal<number>(0);

    const headerStyle = () => ({
        "--tabs-count": props.tabNames.length,
        "--tab-active": activeTab()
    } as JSX.CSSProperties)

    return <div class={`soup-tabs-container ${props.class ?? ""}`} style={style()}>
        <div class="soup-tabs-header" style={headerStyle()}>
            <For each={props.tabNames}>
                {(tabName, index) => {
                    return <button
                        class="soup-tabs-button"
                        onClick={() => setActiveTab(index())}
                    >
                        {tabName}
                    </button>
                }}
            </For>
        </div>
        <For each={props.children}>
            {(child, index) => {
                return <Show when={index() === activeTab()}>
                    <div class="soup-tabs-content">
                        {child}
                    </div>
                </Show>
            }}
        </For>
    </div>
}
