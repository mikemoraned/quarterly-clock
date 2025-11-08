import type { JSX } from "solid-js"
import { DefsContext, DefValue } from "./defs-context";
import { createStore } from "solid-js/store";
import { useContext } from "solid-js";

type DefEntry = {
    id: string;
    value: DefValue;
};

export function DefsProvider(props: { children: JSX.Element }) {
    const [defs, setDefs] = createStore<DefEntry[]>([]);

    const update = (id: string, value: DefValue) => {
        setDefs((currentDefs) => {
            const updatedDefs = currentDefs.filter((def) => def.id !== id);
            updatedDefs.push({ id, value });
            return updatedDefs;
        });
    };
    const list = () => defs.map(def => def.value);

    return (
        <DefsContext.Provider value={{ list, update }}>
            {props.children}
        </DefsContext.Provider>
    );
};

export function useDefs() {
    return useContext(DefsContext);
}