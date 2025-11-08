import { useDefs } from "./defs-provider";
import { For } from "solid-js";

export function DefsSection() {
    const defs = useDefs();

    return (
        <defs>
            <For each={defs?.list() ?? []} >
                {(item) => item}
            </For>
        </defs>
    );
}