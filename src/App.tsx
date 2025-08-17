import {Component, createEffect, createSignal} from 'solid-js';
import {Input} from './components/Input.tsx';
import {Grid} from "./components/Grid.js";
import {Switch} from "./components/Switch.js";
import {Button} from "./components/Button.js";
import {Dropdown} from "./components/Dropdown.js";
import {Slider} from "./components/Slider.js";
import {Number} from "./components/Number.js";
import {GenderPicker, Picker2DValue} from "./components/Picker2D.js";
import {Throbber} from "./components/Throbber.js";
import {Notifications, useNotifications} from "./components/Notifications.js";
import {Dialog} from "./components/Dialog.js";
import {Tabs} from "./components/Tabs.js";

const Thingymabobs: Component = () => {
    const notify = useNotifications()

    const [inputValue, setInputValue] = createSignal("");
    const [switchValue, setSwitchValue] = createSignal(false);
    const dropdownOptions = ["Option A", "Option B", "Option C"] as const;
    const [selected, setSelected] = createSignal<typeof dropdownOptions[number]>("Option A");
    const [sliderValue, setSliderValue] = createSignal(50);
    const [slider2Value, setSlider2Value] = createSignal(50);
    const [numberValue, setNumberValue] = createSignal(0);
    const [number2Value, setNumber2Value] = createSignal(0);
    const [genderPickerValue, setGenderPickerValue] = createSignal<null | Picker2DValue>()
    const [dialogOpen, setDialogOpen] = createSignal(false);

    createEffect(() => console.log(inputValue()));
    createEffect(() => console.log(switchValue()));
    createEffect(() => notify(selected()));
    createEffect(() => console.log(sliderValue()));
    createEffect(() => console.log(genderPickerValue()));

    setInterval(() => setSlider2Value(prev => (prev + 5) % 105), 500);

    return <>
        <Input placeholder="Type something..." value={inputValue()} setValue={setInputValue}/>
        <Switch name="Toggle me!" value={switchValue()} setValue={setSwitchValue}/>
        <Button name="Click me!" onClick={() => setDialogOpen(true)}/>
        <Dropdown
            options={dropdownOptions}
            selected={selected()}
            setSelected={setSelected}
        />
        <Slider value={sliderValue()} setValue={setSliderValue}/>
        <Slider value={slider2Value()} interactive={false}/>
        <Number value={numberValue()} setValue={setNumberValue}/>
        <Number value={number2Value()} setValue={setNumber2Value} min={0} max={10}/>
        <GenderPicker setValue={setGenderPickerValue}/>
        <Throbber/>
        <Dialog positiveText="Yeeee" negativeText="Nuuuu" open={dialogOpen()} setOpen={setDialogOpen}>
            <Throbber/>
            <Slider value={15} interactive={false}/>
        </Dialog>
    </>
}

const App: Component = () => {
    return (
        <div class="h-screen w-screen bg-blue-300 flex items-center justify-center">
            <Notifications>
                <Tabs tabNames={["Main", "Test"]} width={800} height={800}>
                    <Grid cols={2} rows={"auto"} compact>
                        <Thingymabobs/>
                    </Grid>
                    <h1>Test tab</h1>
                </Tabs>
            </Notifications>
        </div>
    );
};

export default App;
