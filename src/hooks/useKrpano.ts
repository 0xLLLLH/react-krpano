import React from 'react';
import KrpanoActionProxy from '../KrpanoActionProxy';
import { IKrpanoConfig, IKrpanoRendererObject } from '../types';

/**
 *
 * @param renderer KrpanoJS对象
 * @param syncAction 具体的同步命令,可以是固定的也可以是由observeValue组成的
 * @param observeValue observeValue变化时执行
 */
export const useSyncToKrpano = (renderer: KrpanoActionProxy | null, syncAction: string, observeValue: any): void => {
    React.useEffect(() => {
        if (!renderer) {
            console.error(`Krpano renderer not found, exec sync action "${syncAction}" fail.`);
        }
        renderer?.call(syncAction);
    }, [renderer, syncAction, observeValue]);
};

export const useKrpano = (config: IKrpanoConfig): void => {
    React.useEffect(() => {
        const defaultConfig: Partial<IKrpanoConfig> = {
            html5: 'prefer',
            xml: null,
            consolelog: process.env.NODE_ENV === 'development',
        };
        const embedpano = () => {
            if (typeof window.embedpano === 'function') window.embedpano(Object.assign({}, defaultConfig, config));
        };

        if (typeof window.embedpano === 'function') {
            embedpano();
        } else {
            // TODO: install krpano
            throw new Error('Krpano required');
        }
    }, [config.target, config.xml]);
};
