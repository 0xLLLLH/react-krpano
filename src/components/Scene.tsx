import React, { useContext } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useSyncToKrpano } from '../hooks/useKrpano';
import { buildKrpanoAction, buildKrpanoTagSetterActions } from '../utils';

interface SceneProps {
    name: string;

    onStart: () => void;
}

const Scene: React.FC<SceneProps> = ({ name, children }) => {
    const renderer = useContext(KrpanoRendererContext);

    React.useEffect(() => {
        renderer?.call(buildKrpanoTagSetterActions('scene', name, {}));
        renderer?.call(buildKrpanoAction('loadscene', [name, 'null, MERGE, BLEND(0.5)']));
    });

    return <div className="scene">{children}</div>;
};

export default Scene;
