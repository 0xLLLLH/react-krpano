import React, { useContext, useEffect } from 'react';
import { KrpanoRendererContext } from '../contexts/KrpanoRendererContext';
import { useSyncToKrpano } from '../hooks/useKrpano';
import { buildKrpanoAction } from '../utils';

interface PreviewProps {
    url: string;
}

// TODO: not working now
const Preview: React.FC<PreviewProps> = ({ url }) => {
    const renderer = useContext(KrpanoRendererContext);

    // useEffect(() => {
    //     renderer?.call(buildKrpanoAction('loadxml', [escape(`<preview url="${url}" />`), 'null, MERGE, BLEND(0.5)']));
    // }, [url]);

    useSyncToKrpano(renderer, buildKrpanoAction('set', ['preview', escape(`<preview url="${url}" />`)]), url);

    return <div className="preview"></div>;
};

export default Preview;
