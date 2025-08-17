import {Component, createContext, createSignal, For, JSXElement, useContext} from "solid-js";
import {DefaultProps} from "./helpers.js";
import {Portal} from "solid-js/web";
import "./Notifications.css"

const NotificationsContext = createContext<(message: JSXElement) => void>();

interface NotificationsProps extends DefaultProps {
    children: JSXElement;
}

export const Notifications: Component<NotificationsProps> = (props) => {
    const [notifications, setNotifications] = createSignal<{ [n in string]: JSXElement }>({});
    const notify = (message: JSXElement) => {
        const uniqueId = `${Date.now()}::${Math.random().toString(36).substring(2, 15)}`;
        setNotifications((prev) => ({...prev, [uniqueId]: message}));
        setTimeout(() => {
            setNotifications((prev) => {
                const {[uniqueId]: _, ...rest} = prev; // Remove the notification after timeout
                return rest;
            });
        }, 5000); // Remove after 5 seconds
    }
    return <>
        <NotificationsContext.Provider value={notify}>{props.children}</NotificationsContext.Provider>
        <Portal>
            <div class="soup-notifications-container">
                <For each={Object.values(notifications())}>{
                    (message) => <div class={`soup-element soup-notifications-message ${props.class ?? ""}`}>
                        {message}
                    </div>
                }</For>
            </div>
        </Portal>
    </>
}

export const useNotifications = () => {
    const notify = useContext(NotificationsContext);
    if (!notify) {
        throw new Error("useNotifications must be used within a NotificationsProvider");
    }
    return notify;
}