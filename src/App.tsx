import {Component, createEffect, createSignal} from 'solid-js';
import {Input} from './components/Input.tsx';
import {Grid} from "./components/Grid.js";
import {Switch} from "./components/Switch.js";
import {Button} from "./components/Button.js";
import {Dropdown} from "./components/Dropdown.js";
import {Slider} from "./components/Slider.js";
import {Number} from "./components/Number.js";

const App: Component = () => {
    const [inputValue, setInputValue] = createSignal("");
    const [switchValue, setSwitchValue] = createSignal(false);
    const [selected, setSelected] = createSignal("Option A");
    const [sliderValue, setSliderValue] = createSignal(50);
    const [slider2Value, setSlider2Value] = createSignal(50);
    const [numberValue, setNumberValue] = createSignal(0);
    const [number2Value, setNumber2Value] = createSignal(0);

    createEffect(() => console.log(inputValue()));
    createEffect(() => console.log(switchValue()));
    createEffect(() => console.log(selected()));
    createEffect(() => console.log(sliderValue()));

    setInterval(() => setSlider2Value(prev => (prev + 5) % 105), 500);

    return (
        <div class="h-screen w-screen bg-blue-300 flex items-center justify-center">
            <Grid width={800} height={800} cols={2} rows={"auto"} compact>
                <Input placeholder="Type something..." value={inputValue} setValue={setInputValue}/>
                <Switch name="Toggle me!" value={switchValue} setValue={setSwitchValue}/>
                <Button name="Click me!" onClick={() => console.log("Button clicked!")}/>
                <Dropdown
                    options={["Option A", "Option B", "Option C"]}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Slider value={sliderValue} setValue={setSliderValue}/>
                <Slider value={slider2Value} interactive={false}/>
                <Number value={numberValue} setValue={setNumberValue}/>
                <Number value={number2Value} setValue={setNumber2Value} min={0} max={10}/>
            </Grid>
        </div>
    );
};

export default App;
