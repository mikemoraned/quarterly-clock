import './clock.css';
import { Hand } from './hand';
import { Remaining } from './remaining';
import type { Guides } from './guides';
import { createSignal, onMount, onCleanup } from 'solid-js';
import { DefsProvider } from './defs-provider';
import { DefsSection } from './defs-section';

export const Clock = () => {
    const viewBoxWidth = 1000;
    const viewBoxHeight = 1000;

    const guidesModel: Guides = {
        outerRadius: 480
    };

    const [seconds, setSeconds] = createSignal(new Date().getSeconds());
    onMount(() => {
        const interval = setInterval(() => {
            setSeconds(() => new Date().getSeconds());
        }, 1000);

        onCleanup(() => {
            clearInterval(interval);
        });
    });

    return (<svg class="clock" viewBox={`-${viewBoxWidth / 2} -${viewBoxHeight / 2} ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
        <DefsProvider>
            <DefsSection />
            <circle cx="0" cy="0" r={guidesModel.outerRadius} stroke="black" stroke-width="10" fill="white" />
            <Hand guides={guidesModel} elapsedFraction={seconds() / 60} />
            <Remaining guides={guidesModel} elapsedFraction={seconds() / 60} />
        </DefsProvider>
    </svg>);
};