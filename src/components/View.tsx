import React, { useContext } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';

interface ViewProps {
    hlookat?: number;
    vlookat?: number;
    fov?: number;
    fovmin?: number;
    fovmax?: number;
}

const View: React.FC<ViewProps> = ({ children, ...viewAttrs }) => {
    const renderer = useContext(KrpanoRendererContext);

    React.useEffect(() => {
        renderer?.setTag('view', null, { ...viewAttrs });
    }, [viewAttrs]);

    return <div className="view"></div>;
};

export default View;
