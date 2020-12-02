import React from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useKrpano } from '../hooks/useKrpano';
import { IKrpanoRendererObject } from '../types';

interface KrpanoProps {}

const Krpano: React.FC<KrpanoProps> = () => {
    const [renderer, setRenderer] = React.useState<IKrpanoRendererObject | null>(null);

    useKrpano(
        {
            target: '',
        },
        (obj) => {
            setRenderer(obj);
        },
    );

    return (
        <KrpanoRendererContext.Provider value={renderer}>
            <div id="krpano"></div>
        </KrpanoRendererContext.Provider>
    );
};

export default Krpano;
