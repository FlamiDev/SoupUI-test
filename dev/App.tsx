import {Component, createEffect, createSignal} from 'solid-js';
import {
    Button,
    Dialog,
    Dropdown,
    GenderPicker,
    Grid,
    Input,
    Link,
    Notifications,
    Number,
    Picker2DValue,
    Slider,
    Switch,
    Tabs,
    Throbber,
    useNotifications
} from 'src';

const MainTab: Component = () => {
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

    return <Grid cols={2} rows={"auto"} compact>
        <Input placeholder="Type something..." value={inputValue()} setValue={setInputValue}/>
        <Switch name="Toggle me!" value={switchValue()} setValue={setSwitchValue}/>
        <Button name="Click me!" onClick={() => setDialogOpen(true)}/>
        <Link name="Google" href="https://google.com"/>
        <Dropdown
            options={dropdownOptions}
            selected={selected()}
            setSelected={setSelected}
        />
        <Slider value={sliderValue()} setValue={setSliderValue}/>
        <Slider value={slider2Value()} interactive={false}/>
        <Number value={numberValue()} setValue={setNumberValue}/>
        <Number value={number2Value()} setValue={setNumber2Value} min={0} max={10}/>
        <Throbber/>
        <GenderPicker setValue={setGenderPickerValue}/>
        <Dialog positiveText="Yeeee" negativeText="Nuuuu" open={dialogOpen()} setOpen={setDialogOpen}>
            <Throbber/>
            <Slider value={15} interactive={false}/>
        </Dialog>
    </Grid>
}

const App: Component = () => {
    const style = `
    height: 100vh;
    width: 100vw;
    background-color: #5ad;
    display: flex;
    align-items: center;
    justify-content: center;
    `

    const [activeTab, setActiveTab] = createSignal<"Main" | "Test">("Main");

    return (
        <div style={style}>
            <Notifications>
                <Tabs activeTab={activeTab()} setActiveTab={setActiveTab} tabs={{
                    Main: <MainTab/>,
                    Test: <h1>Test tab</h1>
                }} width={800} height={800}/>
            </Notifications>
        </div>
    );
};

export default App;
