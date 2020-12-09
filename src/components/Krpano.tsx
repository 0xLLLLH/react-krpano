import React from 'react';
import { CurrentSceneContext } from '../contexts/CurrentSceneContext';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useKrpano } from '../hooks/useKrpano';
import KrpanoActionProxy from '../KrpanoActionProxy';
import { IKrpanoRendererObject } from '../types';
import { Logger } from '../utils';

interface KrpanoProps {
    currentScene?: string;
    /** Krpano XML内容 */
    xml?: string;
}

const Krpano: React.FC<KrpanoProps> = ({ currentScene, xml, children }) => {
    const [renderer, setRenderer] = React.useState<KrpanoActionProxy | null>(null);
    const onReady = React.useCallback(
        (obj: IKrpanoRendererObject) => {
            setRenderer(new KrpanoActionProxy(obj));
            Logger.log('Renderer ready.');
        },
        [xml],
    );

    useKrpano({
        target: 'krpano',
        xml: xml || null,
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
