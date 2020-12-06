import React from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useKrpano } from '../hooks/useKrpano';
import { IKrpanoRendererObject } from '../types';
import { buildKrpanoAction } from '../utils';

interface KrpanoProps {}

const Krpano: React.FC<KrpanoProps> = ({ children }) => {
    const [renderer, setRenderer] = React.useState<IKrpanoRendererObject | null>(null);
    const onReady = React.useCallback((obj) => {
        // TODO: load default xml while xml config not provided
        const xmlstring =
            '<krpano>' +
            '<preview type="grid(cube,64,64,512,0xCCCCCC,0xF6F6F6,0x999999);" />' +
            '<view hlookat="0" vlookat="0" fov="100" distortion="0.0" />' +
            '</krpano>';

        // obj.call('loadxml(' + escape(xmlstring) + ', null, MERGE, BLEND(0.5));');
        obj.call(buildKrpanoAction('loadxml', [escape(xmlstring), 'null, MERGE, BLEND(0.5)']));

        if (process.env.NODE_ENV === 'production') {
            console.log('load default xml');
        }

        setRenderer(obj);
    }, []);

    useKrpano(
        {
            target: 'krpano',
        },
        onReady,
    );

    return (
        <KrpanoRendererContext.Provider value={renderer}>
            <div id="krpano">{renderer ? children : null}</div>
        </KrpanoRendererContext.Provider>
    );
};

export default Krpano;
