import { render } from 'solid-js/web';
import 'solid-devtools';
import { Clock } from './clock';
import './index.css';
import { parseParameters } from './model/quarterSpecification';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const year = new Date().getFullYear();
const quarterSpecification = parseParameters(new URLSearchParams(document.location.search));

render(() => <Clock year={year} quarterSpecification={quarterSpecification} />, root!);
