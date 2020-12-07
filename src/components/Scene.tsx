import React, { useContext } from 'react';
import { CurrentSceneContext } from '../contexts/CurrentSceneContext';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useSyncToKrpano } from '../hooks/useKrpano';
import { buildKrpanoAction, buildKrpanoTagSetterActions, Logger } from '../utils';

interface SceneProps {
    name: string;
    previewUrl?: string;
    onStart?: () => void;
    /** 是否自动加载 */
    autoLoad?: boolean;
    /** 直接指定scene的xml内容 */
    content?: string;
}

const Scene: React.FC<SceneProps> = ({ name, previewUrl, autoLoad = false, children }) => {
    const renderer = useContext(KrpanoRendererContext);
    const currentScene = useContext(CurrentSceneContext);

    React.useEffect(() => {
        renderer?.call(
            buildKrpanoTagSetterActions('scene', name, {
                content: `
        ${previewUrl ? `<preview url="${previewUrl}" />` : ''}
        <image>
            <cube url="https://qhyxpicoss.kujiale.com/r/2017/09/01/L3D221IS3QKUQUQBOGAPEK3P3XU888_7500x1250.jpg_%s" />
        </image>`,
            }),
        );

        if (autoLoad) {
            renderer?.call(buildKrpanoAction('loadscene', [name, 'null, MERGE, BLEND(0.5)']));
            Logger.log(`Scene ${name} auto loaded.`);
        }

        return () => {
            renderer?.get('scene').removeItem(name);
        };
    }, [renderer, name]);

    React.useEffect(() => {
        if (currentScene === name) {
            renderer?.call(buildKrpanoAction('loadscene', [name, 'null, MERGE, BLEND(0.5)']));
            Logger.log(`Scene ${name} loaded due to currentScene change.`);
        }
    }, [name, renderer, currentScene]);

    return <div className="scene">{currentScene === name || autoLoad ? children : null}</div>;
};

export default Scene;
