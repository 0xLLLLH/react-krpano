import React, { useContext, useEffect } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useSyncToKrpano } from '../hooks/useKrpano';
import { buildKrpanoAction } from '../utils';

interface ViewProps {
    hlookat?: number;
    vlookat?: number;
    fov?: number;
    fovmin?: number;
    fovmax?: number;
}

const View: React.FC<ViewProps> = ({ hlookat = 0, vlookat = 0, fov = 180, fovmin = 1.0, fovmax = 179.0 }) => {
    const renderer = useContext(KrpanoRendererContext);

    useSyncToKrpano(renderer, buildKrpanoAction('set', ['view.hlookat', hlookat]), hlookat);
    useSyncToKrpano(renderer, buildKrpanoAction('set', ['view.vlookat', vlookat]), vlookat);
    useSyncToKrpano(renderer, buildKrpanoAction('set', ['view.fov', fov]), fov);
    useSyncToKrpano(renderer, buildKrpanoAction('set', ['view.fovmin', fovmin]), fovmin);
    useSyncToKrpano(renderer, buildKrpanoAction('set', ['view.fovmax', fovmax]), fovmax);

    return <div className="view"></div>;
};

export default View;
