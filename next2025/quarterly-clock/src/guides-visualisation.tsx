import { Guides } from "./guides";
import { useGuides } from "./guides-provider";
import './guides-visualisation.css';

export const GuidesVisualisation = () => {
    const guides: Guides = useGuides()!;

    return (
        <g class="guides">
            <circle cx={0} cy={0} r={guides.outerRadius} />
        </g>
    );
};
