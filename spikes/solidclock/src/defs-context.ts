import { createContext } from "solid-js";
import type { JSX } from "solid-js"

export type DefValue = JSX.Element;

export const DefsContext = createContext<{
    list: () => DefValue[];
    update: (id: string, value: DefValue) => void;
}>();
