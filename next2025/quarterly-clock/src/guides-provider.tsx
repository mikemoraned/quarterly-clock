import { JSX, useContext } from "solid-js";
import { GuidesContext } from "./guides-context";
import { ViewBox } from "./svg/view-box";
import { createGuides } from "./guides";

export function GuidesProvider(props: { viewBox: ViewBox; children: JSX.Element }) {
    return (
        <GuidesContext.Provider value={createGuides(props.viewBox)}>
            {props.children}
        </GuidesContext.Provider>
    );
};

export function useGuides() {
    return useContext(GuidesContext);
}