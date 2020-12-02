import { useEffect } from 'react';
import { IKrpanoConfig, IKrpanoRendererObject } from '../types';

import React from 'react';

export const useKrpano = (config: IKrpanoConfig, onReady: (renderer: IKrpanoRendererObject) => void): void => {
    const embedpano = () => {
        if (typeof window.embedpano === 'function')
            window.embedpano({
                xml: config.xml,
                target: config.target,
                html5: 'prefer',
                onready: onReady,
            });
    };

    React.useEffect(() => {
        if (typeof window.embedpano === 'function') {
            embedpano();
        } else {
            // TODO: install krpano
            const script = document.createElement('script');
            script.onload = embedpano;
            script.src = 'https://raw.githubusercontent.com/0xLLLLH/krpano-examples/master/krpano-lib/krpano.js';
            document.append(script);
        }

        if (typeof config.target === 'string') {
            document.getElementById(config.target);
        } else {
        }
    }, [config.target, config.xml]);
};
