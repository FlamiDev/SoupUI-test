import {Component, createEffect, createSignal, For, JSXElement} from 'solid-js';
import {Input} from './components/Input.tsx';
import "./SoupUI.css"
import {Grid} from "./components/Grid.js";

const [inputValue, setInputValue] = createSignal("");
createEffect(() => console.log(inputValue()));

const elements: JSXElement[] = [
    <Input placeholder="Type something..." value={inputValue} setValue={setInputValue}/>,
]

const App: Component = () => {
    return (
        <div class="h-screen w-screen bg-blue-300 flex items-center justify-center">
            <Grid width={800} height={800} cols={2} rows={"auto"} compact>
                <For each={elements}>{e => e}</For>
            </Grid>
        </div>
    );
};

export default App;
