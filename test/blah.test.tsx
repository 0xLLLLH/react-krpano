import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Krpano } from '../src';

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Krpano />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
