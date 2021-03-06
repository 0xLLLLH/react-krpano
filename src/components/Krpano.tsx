import React from 'react';
import { CurrentSceneContext } from '../contexts/CurrentSceneContext';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import useEventCallback from '../hooks/useEventCallback';
import { useKrpano } from '../hooks/useKrpano';
import KrpanoActionProxy from '../KrpanoActionProxy';
import { NativeKrpanoRendererObject } from '../types';
import { Logger } from '../utils';

export interface KrpanoProps {
    className?: string;
    currentScene?: string;
    /** Krpano XML地址 */
    xml?: string;
    target?: string;
    id?: string;
    onReady?: (renderer: KrpanoActionProxy) => void;
    enableLogger?: boolean;
}

export const Krpano: React.FC<KrpanoProps> = ({
    className,
    currentScene,
    target = 'krpano',
    id,
    xml,
    onReady,
    children,
    enableLogger = false,
}) => {
    const [renderer, setRenderer] = React.useState<KrpanoActionProxy | null>(null);
    const onReadyRef = useEventCallback(onReady);
    const onReadyCallback = React.useCallback(
        (obj: NativeKrpanoRendererObject) => {
            const renderer = new KrpanoActionProxy(obj);
            (window as any)[renderer.name] = renderer;
            setRenderer(renderer);
            Logger.enabled = enableLogger;
            Logger.log('Renderer ready.');

            if (onReadyRef.current) {
                onReadyRef.current(renderer);
            }
        },
        [enableLogger, onReadyRef]
    );
    const krpanoConfig = React.useMemo(
        () => ({
            target,
            id,
            xml: xml || null,
            onready: onReadyCallback,
        }),
        [target, id, xml, onReadyCallback]
    );

    useKrpano(krpanoConfig);

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
