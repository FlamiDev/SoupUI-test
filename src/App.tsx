import {Component, createEffect, createSignal, For, JSXElement} from 'solid-js';
import {Input} from './components/Input.tsx';
import {Grid} from "./components/Grid.js";
import {Switch} from "./components/Switch.js";
import {Button} from "./components/Button.js";
import {Dropdown} from "./components/Dropdown.js";
import {Slider} from "./components/Slider.js";

const [inputValue, setInputValue] = createSignal("");
const [switchValue, setSwitchValue] = createSignal(false);
const [selected, setSelected] = createSignal("Option A");
const [sliderValue, setSliderValue] = createSignal(50);

createEffect(() => console.log(inputValue()));
createEffect(() => console.log(switchValue()));

const elements: JSXElement[] = [
    <Input placeholder="Type something..." value={inputValue} setValue={setInputValue}/>,
    <Switch name="Toggle me!" value={switchValue} setValue={setSwitchValue}/>,
    <Button name="Click me!" onClick={() => console.log("Button clicked!")}/>,
    <Dropdown
        options={["Option A", "Option B", "Option C"]}
        selected={selected}
        setSelected={setSelected}
    />,
    <Slider value={sliderValue} setValue={setSliderValue}/>,
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
