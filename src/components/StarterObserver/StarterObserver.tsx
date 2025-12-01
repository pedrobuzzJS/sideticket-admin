import { useHotkeys } from "react-hotkeys-hook";

export function StarterObserver() {
    useHotkeys("ctrl+shift+f", () => console.log("Pesquisar"));
    return <></>;
}
