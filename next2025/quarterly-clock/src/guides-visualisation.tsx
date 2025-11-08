import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import './guides-visualisation.css';

export const GuidesVisualisation = (props: { showGuides: boolean; }) => {
    const guides: Guides = useGuides()!;

    return (
        <g class={`guides ${props.showGuides ? 'enabled' : 'disabled'}`}>
            <circle cx={0} cy={0} r={guides.outerRadius} />
        </g>
    );
};
