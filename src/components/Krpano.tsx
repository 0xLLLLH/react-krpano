import React from 'react';
import { CurrentSceneContext } from '../contexts/CurrentSceneContext';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useKrpano } from '../hooks/useKrpano';
import { IKrpanoRendererObject } from '../types';
import { buildKrpanoAction, Logger } from '../utils';

interface KrpanoProps {
    currentScene?: string;
    /** Krpano XML内容 */
    xml?: string;
}

const Krpano: React.FC<KrpanoProps> = ({ currentScene, xml, children }) => {
    const [renderer, setRenderer] = React.useState<IKrpanoRendererObject | null>(null);
    const onReady = React.useCallback(
        (obj) => {
            // TODO: load default xml while xml config not provided
            const xmlstring =
                xml || '<krpano>' + '<view hlookat="0" vlookat="0" fov="100" distortion="0.0" />' + '</krpano>';

            obj.call(buildKrpanoAction('loadxml', [escape(xmlstring), 'null, MERGE, BLEND(0.5)']));

            if (process.env.NODE_ENV === 'production') {
                console.log('load default xml');
            }

            setRenderer(obj);
            Logger.log('Renderer ready.');
        },
        [xml],
    );

    useKrpano({
        target: 'krpano',
        onready: onReady,
    });

    return (
        <KrpanoRendererContext.Provider value={renderer}>
            <CurrentSceneContext.Provider value={currentScene || null}>
                <div id="krpano">{renderer ? children : null}</div>
            </CurrentSceneContext.Provider>
        </KrpanoRendererContext.Provider>
    );
};

export default Krpano;
