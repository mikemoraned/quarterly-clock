import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import './guides-visualisation.css';

export const GuidesVisualisation = (props: { showGuides: boolean; }) => {
    const guides: Guides = useGuides()!;

    return (
        <g class={`guides ${props.showGuides ? 'enabled' : 'disabled'}`}>
            <circle cx={0} cy={0} r={guides.outerRadius} />
            <circle cx={0} cy={0} r={guides.gutterRadius} />
            <circle cx={0} cy={0} r={guides.innerRadius} />
            <line
                x1={-1 * guides.outerRadius}
                y1={0}
                x2={guides.outerRadius}
                y2={0}
            />
            <line
                x1={0}
                y1={-1 * guides.outerRadius}
                x2={0}
                y2={guides.outerRadius}
            />
        </g>
    );
};
