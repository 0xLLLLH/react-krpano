import React from 'react';
import { IKrpanoConfig, IKrpanoRendererObject } from '../types';

export const useSyncToKrpano = (
    renderer: IKrpanoRendererObject | null,
    syncAction: string,
    value: number | string,
): void => {
    React.useEffect(() => {
        if (!renderer) {
            console.error(`Krpano renderer not found, exec sync action "${syncAction}" fail.`);
        }
        renderer?.call(syncAction);
    }, [renderer, syncAction, value]);
};

export const useKrpano = (config: IKrpanoConfig, onReady: (renderer: IKrpanoRendererObject) => void): void => {
    React.useEffect(() => {
        const embedpano = () => {
            if (typeof window.embedpano === 'function')
                window.embedpano({
                    xml: config.xml,
                    target: config.target,
                    html5: 'prefer',
                    onready: onReady,
                });
        };

        if (typeof window.embedpano === 'function') {
            embedpano();
        } else {
            // TODO: install krpano
            throw new Error('Krpano required');
        }
    }, [config.target, config.xml, onReady]);
};
