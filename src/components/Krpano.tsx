import React from 'react';
import { CurrentSceneContext } from '../contexts/CurrentSceneContext';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useKrpano } from '../hooks/useKrpano';
import KrpanoActionProxy from '../KrpanoActionProxy';
import { NativeKrpanoRendererObject } from '../types';
import { Logger } from '../utils';

interface KrpanoProps {
    className?: string;
    currentScene?: string;
    /** Krpano XML地址 */
    xml?: string;
    target?: string;
    id?: string;
    onReady?: (renderer: KrpanoActionProxy) => void;
}

const Krpano: React.FC<KrpanoProps> = ({ className, currentScene, target = 'krpano', id, xml, onReady, children }) => {
    const [renderer, setRenderer] = React.useState<KrpanoActionProxy | null>(null);
    const onReadyCallback = React.useCallback(
        (obj: NativeKrpanoRendererObject) => {
            const renderer = new KrpanoActionProxy(obj);
            (window as any)[renderer.name] = renderer;
            setRenderer(renderer);
            Logger.log('Renderer ready.');

            if (onReady) {
                onReady(renderer);
            }
        },
        [xml]
    );

    useKrpano({
        target,
        id,
        xml: xml || null,
        onready: onReadyCallback,
    });

    return (
        <KrpanoRendererContext.Provider value={renderer}>
            <CurrentSceneContext.Provider value={currentScene || null}>
                <div id={target} className={className} style={className ? {} : { width: '100vw', height: '100vh' }}>
                    {renderer ? children : null}
                </div>
            </CurrentSceneContext.Provider>
        </KrpanoRendererContext.Provider>
    );
};

export default Krpano;
