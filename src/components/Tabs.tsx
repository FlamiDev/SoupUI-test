import {ChildlessContainerProps} from "./Container.tsx";
import {createMemo, For, JSX, JSXElement, Show} from "solid-js";
import "./Tabs.css";

interface TabsProps<K extends string, T extends { [N in K]: JSXElement }> extends ChildlessContainerProps {
    tabs: T;
    activeTab: K;
    setActiveTab: (tab: K) => void;
}

export const Tabs = <K extends string, T extends { [N in K]: JSXElement }>(props: TabsProps<K, T>) => {
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

    const tabsEntries = createMemo(() => Object.entries(props.tabs) as [K, JSXElement][]);
    const activeTabIndex = () => tabsEntries().findIndex(([key]) => key === props.activeTab);

    const headerStyle = () => ({
        "--tabs-count": tabsEntries().length,
        "--tab-active": activeTabIndex()
    } as JSX.CSSProperties)

    return <div class={`soup-tabs-container ${props.class ?? ""}`} style={style()}>
        <div class="soup-tabs-header" style={headerStyle()}>
            <For each={tabsEntries()}>
                {([tabName]) => {
                    return <button
                        class="soup-tabs-button"
                        onClick={() => props.setActiveTab(tabName)}
                    >
                        {tabName}
                    </button>
                }}
            </For>
        </div>
        <For each={tabsEntries()}>
            {([name, tab]) => {
                return <Show when={name === props.activeTab}>
                    <div class="soup-tabs-content">
                        {tab}
                    </div>
                </Show>
            }}
        </For>
    </div>
}
