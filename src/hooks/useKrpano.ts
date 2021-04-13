import React from 'react';
import { IKrpanoConfig } from '../types';

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
    }, [config]);
};
